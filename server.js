
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

dotenv.config();

const {
  FIREBASE_SERVICE_ACCOUNT_PATH,
  JWT_SECRET,
  PORT = 3001
} = process.env;

if (!FIREBASE_SERVICE_ACCOUNT_PATH || !JWT_SECRET) {
  throw new Error(
    'Missing FIREBASE_SERVICE_ACCOUNT_PATH or JWT_SECRET in .env'
  );
}

const app = express();

app.use(cors());
app.use(express.json({ limit: '20kb' }));

// Initialize Firebase Admin SDK
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = path.resolve(
  __dirname,
  FIREBASE_SERVICE_ACCOUNT_PATH
);

initializeApp({
  credential: cert(serviceAccountPath)
});

const db = getFirestore();
const wishesCollection = db.collection('wishes');

// Replace example passwords before deployment.
const PASSWORD_TO_ROLE = {
  [process.env.CREATOR_PASSWORD]: 'CREATOR',
  [process.env.FRIEND_PASSWORD]: 'FRIEND'
};

// Login
app.post('/api/login', (req, res) => {
  const password = req.body?.password;
  const role = PASSWORD_TO_ROLE[password];

  if (!role) {
    return res.status(401).json({
      error: 'Invalid access code'
    });
  }

  const token = jwt.sign({ role }, JWT_SECRET, {
    expiresIn: '24h'
  });

  return res.json({ token, role });
});

// Verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No valid token provided'
    });
  }

  try {
    req.user = jwt.verify(authHeader.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};

// Read wishes
app.get('/api/wishes', verifyToken, async (req, res) => {
  try {
    const snapshot = await wishesCollection
      .orderBy('createdAt', 'desc')
      .get();

    const wishes = snapshot.docs.map((doc) => {
      const wish = doc.data();

      return {
        id: Number(doc.id),
        author: wish.author,
        message: wish.message,
        created_at: wish.createdAt.toDate().toISOString()
      };
    });

    return res.json(wishes);
  } catch (error) {
    console.error('Fetch wishes failed:', error.message);
    return res.status(500).json({
      error: 'Could not fetch wishes'
    });
  }
});

// Save a wish permanently
app.post('/api/wishes', verifyToken, async (req, res) => {
  try {
    const author =
      typeof req.body?.author === 'string'
        ? req.body.author.trim()
        : '';

    const message =
      typeof req.body?.message === 'string'
        ? req.body.message.trim()
        : '';

    if (
      !author ||
      !message ||
      author.length > 60 ||
      message.length > 1000
    ) {
      return res.status(400).json({
        error: 'Author (1–60 chars) and message (1–1000 chars) are required'
      });
    }

    // Preserve numeric IDs for compatibility with your existing frontend.
    const id = Date.now();

    const wish = {
      author,
      message,
      createdAt: Timestamp.now()
    };

    await wishesCollection.doc(String(id)).create(wish);

    return res.status(201).json({
      id,
      author,
      message,
      created_at: wish.createdAt.toDate().toISOString()
    });
  } catch (error) {
    console.error('Save wish failed:', error.message);
    return res.status(500).json({
      error: 'Could not save wish'
    });
  }
});

// Only creator can delete wishes
app.delete('/api/wishes/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'CREATOR') {
    return res.status(403).json({
      error: 'Only the creator can delete wishes'
    });
  }

  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid wish ID'
    });
  }

  try {
    const ref = wishesCollection.doc(String(id));
    const snapshot = await ref.get();

    if (!snapshot.exists) {
      return res.status(404).json({
        error: 'Wish not found'
      });
    }

    await ref.delete();

    return res.json({ success: true });
  } catch (error) {
    console.error('Delete wish failed:', error.message);
    return res.status(500).json({
      error: 'Could not delete wish'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`);
});
