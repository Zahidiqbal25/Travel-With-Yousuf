require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const multer = require('multer');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'trips-data.json');
const PUBLIC_DIR = path.join(__dirname, 'Public');

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'yousuf').trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'Travel786').trim();
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret-change-in-production';

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PUBLIC_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const base = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-z0-9-_]/gi, '-')
      .replace(/-+/g, '-')
      .toLowerCase() || 'image';
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|jpg|png|gif|webp)$/i.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpg, png, gif, webp)'));
    }
  }
});

app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

function safeEqual(a, b) {
  const aStr = String(a);
  const bStr = String(b);
  const maxLen = Math.max(aStr.length, bStr.length);
  const bufA = Buffer.alloc(maxLen);
  const bufB = Buffer.alloc(maxLen);
  bufA.write(aStr);
  bufB.write(bStr);
  return aStr.length === bStr.length && crypto.timingSafeEqual(bufA, bufB);
}

function requireAuth(req, res, next) {
  if (req.session?.authenticated) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

function readTrips() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeTrips(trips) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(trips, null, 2), 'utf8');
}

app.post('/api/auth/login', (req, res) => {
  const username = (req.body?.username || '').trim();
  const password = (req.body?.password || '').trim();
  if (safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD)) {
    req.session.authenticated = true;
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid username or password' });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/api/auth/status', (req, res) => {
  res.json({ authenticated: !!req.session?.authenticated });
});

app.post('/api/upload', requireAuth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    res.json({ path: `Public/${req.file.filename}` });
  });
});

app.get('/api/trips', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(readTrips());
});

app.get('/api/trips/:id', (req, res) => {
  const trip = readTrips().find(t => t.id === req.params.id);
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.json(trip);
});

app.post('/api/trips', requireAuth, (req, res) => {
  const trips = readTrips();
  const trip = req.body;
  if (!trip.id || trips.find(t => t.id === trip.id)) {
    return res.status(400).json({ error: 'Missing or duplicate trip id' });
  }
  trips.push(trip);
  writeTrips(trips);
  res.status(201).json(trip);
});

app.put('/api/trips/:id', requireAuth, (req, res) => {
  const trips = readTrips();
  const idx = trips.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Trip not found' });
  trips[idx] = { ...trips[idx], ...req.body, id: req.params.id };
  writeTrips(trips);
  res.json(trips[idx]);
});

app.delete('/api/trips/:id', requireAuth, (req, res) => {
  const trips = readTrips();
  const idx = trips.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Trip not found' });
  trips.splice(idx, 1);
  writeTrips(trips);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin login: http://localhost:${PORT}/login.html`);
});
