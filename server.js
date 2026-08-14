require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'trips-data.json');
const PUBLIC_DIR = path.join(__dirname, 'Public');

// In-memory store for reset tokens. In a real-world scenario, use a persistent store like Redis.
const resetTokens = {};

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'yousuf').trim();
let ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'Travel786').trim();
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || '').trim();
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret-change-in-production';

// Warn if email is not configured
if (!ADMIN_EMAIL) console.warn('WARNING: ADMIN_EMAIL is not set in .env file. Forgot password feature will not work.');

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
  // On Vercel, sessions will be stored in /tmp, which is temporary.
  // For persistent sessions, a database store (like Redis or Postgres) is recommended for production.
  store: new FileStore({ path: '/tmp/sessions', logFn: function() {} }),
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

app.post('/api/auth/forgot-password', async (req, res) => {
  const email = (req.body?.email || '').trim();

  if (!ADMIN_EMAIL || !process.env.SMTP_HOST) {
    return res.status(500).json({ error: 'Email service is not configured on the server.' });
  }

  if (!safeEqual(email, ADMIN_EMAIL)) {
    // Still return a success message to prevent user enumeration
    return res.json({ success: true, message: 'If a user with that email exists, a reset link has been sent.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 3600000; // 1 hour
  resetTokens[token] = { email, expires };

  const resetLink = `${req.protocol}://${req.get('host')}/reset-password.html?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: (parseInt(process.env.SMTP_PORT || '587', 10) === 465), // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Admin" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click this link to reset your password: ${resetLink}`,
      html: `<p>You requested a password reset. Click this link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });
    res.json({ success: true, message: 'If a user with that email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Failed to send reset email.' });
  }
});

app.post('/api/auth/reset-password', (req, res) => {
  const { token, password } = req.body;
  const record = resetTokens[token];

  if (!record || record.expires < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired password reset token.' });
  }

  // Update password in memory
  ADMIN_PASSWORD = String(password).trim();
  console.log('Admin password has been updated in memory. This change will be lost on server restart.');

  delete resetTokens[token]; // Invalidate the token
  res.json({ success: true, message: 'Password has been reset successfully.' });
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
