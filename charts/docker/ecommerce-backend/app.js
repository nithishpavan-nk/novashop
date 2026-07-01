require('dotenv').config();
const express = require('express');
const mysql   = require('mysql2/promise');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ── DB pool ────────────────────────────────────────────────────────────────────
const pool = mysql.createPool({
  host     : process.env.DB_HOST     || 'mysql',
  user     : process.env.DB_USER     || 'root',
  password : process.env.DB_PASSWORD || 'root',
  database : process.env.DB_NAME     || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
});

// ── Bootstrap: create tables + seed data on startup ───────────────────────────
async function bootstrap() {
  const retries = 10;
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await pool.getConnection();

      await conn.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id             INT AUTO_INCREMENT PRIMARY KEY,
          name           VARCHAR(200)   NOT NULL,
          description    TEXT,
          price          DECIMAL(10,2)  NOT NULL,
          original_price DECIMAL(10,2)  DEFAULT NULL,
          category       VARCHAR(80)    NOT NULL,
          brand          VARCHAR(80)    DEFAULT NULL,
          sku            VARCHAR(80)    DEFAULT NULL,
          stock          INT            NOT NULL DEFAULT 100,
          is_new         TINYINT(1)     NOT NULL DEFAULT 0,
          created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const [[{ count }]] = await conn.execute('SELECT COUNT(*) as count FROM products');
      if (Number(count) === 0) {
        await conn.execute(`
          INSERT INTO products
            (name, description, price, original_price, category, brand, sku, stock, is_new) VALUES
          -- Electronics
          ('MacBook Pro 14"',         'M3 chip, 18GB RAM, 512GB SSD. The most powerful Mac laptop ever.',         129999, 149999, 'Electronics', 'Apple',    'MBP-14-M3',  25, 1),
          ('iPhone 15 Pro',           'Titanium design, A17 Pro chip, 48MP camera system.',                       129999, NULL,   'Electronics', 'Apple',    'IP15P-128',  40, 1),
          ('Samsung 4K Smart TV 55"', 'QLED display, 120Hz refresh, built-in Alexa.',                              54999, 64999,  'Electronics', 'Samsung',  'SMTV-55Q',   15, 0),
          ('Sony WH-1000XM5',         'Industry-leading noise cancellation, 30hr battery, foldable design.',       29999, 34999,  'Electronics', 'Sony',     'SWHXM5',     60, 0),
          ('iPad Air 5th Gen',        '10.9-inch Liquid Retina, M1 chip, USB-C connectivity.',                     54999, NULL,   'Electronics', 'Apple',    'IPAD-AIR5',  30, 0),
          ('Logitech MX Master 3S',   'Ergonomic wireless mouse, MagSpeed scroll, 8K DPI.',                         8999, 10999,  'Electronics', 'Logitech', 'LGMXM3S',   120, 0),
          ('Dell 27" 4K Monitor',     'IPS panel, 99% sRGB, USB-C 90W charging, height adjustable.',               34999, 39999,  'Electronics', 'Dell',     'DLMON27-4K', 20, 1),
          ('DJI Mini 4 Pro',          'Under 249g, 4K/60fps video, 34-min flight time, omnidirectional sensing.',  74999, NULL,   'Electronics', 'DJI',      'DJIM4P',     10, 1),

          -- Fashion
          ('Classic White Sneakers',  'Premium leather upper, cushioned sole, timeless silhouette.',                5999, 7999,   'Fashion',     'Nova',     'NS-SNK-W01',  80, 0),
          ('Slim Fit Chinos',         '97% cotton, stretch blend, tailored tapered fit.',                           2499, 2999,   'Fashion',     'Nova',     'NS-CHN-KH1', 200, 0),
          ('Premium Denim Jacket',    'Washed selvedge denim, distressed details, relaxed fit.',                    4999, NULL,   'Fashion',     'Nova',     'NS-JKT-DN1',  50, 1),
          ('Silk Blend Dress',        'Lightweight, flowy silhouette, hand-finished hem.',                           6999, 8499,   'Fashion',     'Luxe',     'LX-DRS-SL1',  35, 1),
          ('Leather Crossbody Bag',   'Full-grain leather, adjustable strap, 3 interior pockets.',                  8999, NULL,   'Fashion',     'Nova',     'NS-BAG-CB1',  45, 0),
          ('Merino Wool Sweater',     '100% Merino wool, ribbed cuffs, machine washable.',                          5499, 6499,   'Fashion',     'Nova',     'NS-SWT-MW1',  90, 0),

          -- Home
          ('Ergonomic Office Chair',  'Lumbar support, mesh back, armrests adjustable, 5-year warranty.',          18999, 22999,  'Home',        'ErgoDesk', 'ED-CHR-001',  18, 0),
          ('Standing Desk 160cm',     'Electric height adjustment, memory presets, solid bamboo top.',             32999, NULL,   'Home',        'ErgoDesk', 'ED-DSK-160',   8, 1),
          ('Smart LED Lamp',          'Color temperature control, app-enabled, USB-C charging port.',               2999, 3499,   'Home',        'Lumio',    'LM-LMP-S1',   75, 0),
          ('Air Purifier Pro',        'HEPA + activated carbon filter, covers 500 sq ft, ultra-quiet.',            12999, 15999,  'Home',        'AirNova',  'AN-PUR-P1',   22, 1),

          -- Sports
          ('Yoga Mat Premium',        '6mm thick, non-slip natural rubber, alignment lines, carry strap.',           1999, 2499,   'Sports',      'FlexGear', 'FG-MAT-PRO',  95, 0),
          ('Smart Fitness Watch',     'GPS, heart rate, SpO2, 7-day battery, 5ATM water resistant.',               14999, 17999,  'Sports',      'FitPro',   'FP-WACH-S3',  55, 1),
          ('Resistance Band Set',     '5 levels, anti-snap latex, includes door anchor + handles.',                   999, 1299,   'Sports',      'FlexGear', 'FG-BAND-S5', 180, 0),

          -- Books
          ('Atomic Habits',           'James Clear. The definitive guide to building good habits and breaking bad ones.',  499, 599, 'Books', NULL, 'BK-ATHMB', 250, 0),
          ('The Pragmatic Programmer','Andrew Hunt & David Thomas. Your journey to mastery.',                          699, NULL,   'Books',       NULL,       'BK-PRGPG', 120, 0),
          ('Designing Data-Intensive Applications','Martin Kleppmann. The definitive guide to scalable systems.',  899, 999,   'Books',       NULL,       'BK-DDIA',   85, 0),

          -- Beauty
          ('SPF 50 Sunscreen',        'Lightweight, non-greasy, reef-safe, daily moisturising formula.',              799, 999,   'Beauty',      'GlowLab',  'GL-SUN-50',  160, 0),
          ('Vitamin C Serum 30ml',    '20% L-Ascorbic acid, hyaluronic acid, ferulic acid complex.',                1299, 1599,  'Beauty',      'GlowLab',  'GL-SER-VC',  110, 1),

          -- Toys
          ('LEGO Technic Set',        '1,580 pieces, motorised functions, ages 10+.',                                5499, 6999,  'Toys',        'LEGO',     'LG-TECH-1',   30, 0),
          ('RC Racing Car',           '1:16 scale, 30km/h, 4WD, 2.4GHz remote, USB charging.',                     2999, NULL,   'Toys',        'SpeedX',   'SX-RC-001',   55, 1)
        `);
        console.log('✅ Database seeded with products.');
      }

      conn.release();
      console.log('✅ Database ready.');
      return;
    } catch (err) {
      console.warn(`DB not ready yet (attempt ${i + 1}/${retries}): ${err.message}`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  throw new Error('Could not connect to MySQL after multiple attempts.');
}

// ── Routes ─────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'ok', service: 'NovaShop API' }));

app.get('/products', async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let sql    = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ? OR brand LIKE ?)';
      const like = `%${search}%`;
      params.push(like, like, like);
    }

    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    const sortMap = {
      newest    : 'created_at DESC',
      price_asc : 'price ASC',
      price_desc: 'price DESC',
      name_asc  : 'name ASC',
    };
    sql += ` ORDER BY ${sortMap[sort] || 'created_at DESC'}`;

    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT DISTINCT category FROM products ORDER BY category');
    res.json(rows.map(r => r.category));
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// ── Start ──────────────────────────────────────────────────────────────────────
bootstrap().then(() => {
  app.listen(5000, () => console.log('NovaShop API running on port 5000'));
}).catch(err => {
  console.error('Bootstrap failed:', err.message);
  process.exit(1);
});
