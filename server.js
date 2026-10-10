import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'super_secret_birthday_key_dont_tell_anyone';

// In-memory data store for wishes
let wishes = [
  {
    id: 1,
    author: "Sophia M.",
    message: '"Happy Birthday gorgeous! Stay happy and keep smiling always. You bring so much radiant energy wherever you go!"',
    time: "Today at 10:14 AM",
  },
  {
    id: 2,
    author: "Ethan & Chloe",
    message: '"Wishing the happiest of birthdays to the sweetest soul! May this new chapter bring endless laughs and dream trips!"',
    time: "Yesterday",
  },
  {
    id: 3,
    author: "Jessica K.",
    message: '"Happy Birthday my dearest friend! So lucky to have you in my corner. Drink lots of champagne today!"',
    time: "2 days ago",
  },
];
let nextId = 4;

// Map passwords to roles
const PASSWORD_TO_ROLE = {
  'pattu2710': 'CREATOR', // Handles both girlfriend and creator access identically
  'friend123': 'FRIEND'
};

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  
  const role = PASSWORD_TO_ROLE[password];
  
  if (role) {
    const token = jwt.sign({ role }, SECRET_KEY, { expiresIn: '24h' });
    return res.json({ token, role });
  }
  
  return res.status(401).json({ error: 'Invalid access code' });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/api/wishes', verifyToken, (req, res) => {
  res.json(wishes);
});

app.post('/api/wishes', verifyToken, (req, res) => {
  // Allow all authenticated users (including FRIEND) to post wishes
  const { author, message } = req.body;
  if (!author || !message) {
    return res.status(400).json({ error: 'Author and message are required' });
  }
  
  const newWish = {
    id: nextId++,
    author,
    message,
    time: 'Just Now'
  };
  
  wishes = [newWish, ...wishes]; // Add to top
  res.status(201).json(newWish);
});

app.delete('/api/wishes/:id', verifyToken, (req, res) => {
  // Only allow CREATOR and GIRLFRIEND to delete
  if (req.user.role !== 'CREATOR' && req.user.role !== 'GIRLFRIEND') {
    return res.status(403).json({ error: 'Forbidden: Insufficient privileges to delete wishes.' });
  }
  
  const id = parseInt(req.params.id, 10);
  const initialLength = wishes.length;
  wishes = wishes.filter(w => w.id !== id);
  
  if (wishes.length === initialLength) {
    return res.status(404).json({ error: 'Wish not found' });
  }
  
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
