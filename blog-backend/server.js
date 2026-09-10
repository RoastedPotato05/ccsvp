const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Serve static frontend files from the parent directory at the root level
app.use(express.static(path.join(__dirname, '../')));

// Fallback to send index.html when accessing root URL /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});

// Get all stats
app.get('/api/posts/stats', (req, res) => {
  db.all(`SELECT * FROM post_stats`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const statsMap = {};
    rows.forEach(row => {
      statsMap[row.slug] = { views: row.views, likes: row.likes };
    });
    res.json(statsMap);
  });
});

// Get stats for a single post
app.get('/api/posts/:slug/stats', (req, res) => {
  const { slug } = req.params;
  db.get(`SELECT * FROM post_stats WHERE slug = ?`, [slug], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      return res.json({ views: 0, likes: 0 });
    }
    res.json(row);
  });
});

// Increment view count
app.post('/api/posts/:slug/view', (req, res) => {
  const { slug } = req.params;
  db.run(
    `INSERT INTO post_stats (slug, views, likes) VALUES (?, 1, 0)
     ON CONFLICT(slug) DO UPDATE SET views = views + 1`,
    [slug],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get(`SELECT * FROM post_stats WHERE slug = ?`, [slug], (err, row) => {
        res.json(row);
      });
    }
  );
});

// Increment like count
app.post('/api/posts/:slug/like', (req, res) => {
  const { slug } = req.params;
  db.run(
    `INSERT INTO post_stats (slug, views, likes) VALUES (?, 0, 1)
     ON CONFLICT(slug) DO UPDATE SET likes = likes + 1`,
    [slug],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get(`SELECT * FROM post_stats WHERE slug = ?`, [slug], (err, row) => {
        res.json(row);
      });
    }
  );
});

// Decrement like count (unlike)
app.post('/api/posts/:slug/unlike', (req, res) => {
  const { slug } = req.params;
  db.run(
    `UPDATE post_stats SET likes = MAX(0, likes - 1) WHERE slug = ?`,
    [slug],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get(`SELECT * FROM post_stats WHERE slug = ?`, [slug], (err, row) => {
        res.json(row || { views: 0, likes: 0 });
      });
    }
  );
});

// 2. Dynamic Port Assignment for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});