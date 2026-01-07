import pg from "pg";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const connectionString = process.env.SUPABASE_DATABASE_URL;

let pool: pg.Pool | null = null;

function getPool(): pg.Pool | null {
  if (!connectionString) {
    console.warn("SUPABASE_DATABASE_URL not configured. Using fallback data.");
    return null;
  }

  if (!pool) {
    pool = new pg.Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }

  return pool;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at?: string;
}

export interface Client {
  id: string;
  name: string;
  logo_url: string;
  created_at?: string;
}

export interface CompanyInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address_line1: string;
  address_line2: string;
  address_country: string;
  phone: string;
  email: string;
  website: string;
  profile_brief: string;
  profile_mission: string;
  profile_vision: string;
  profile_history: string;
  certifications: string[];
  created_at?: string;
  updated_at?: string;
}

export async function initDatabase(): Promise<void> {
  const db = getPool();
  if (!db) return;

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        logo_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS company_info (
        id TEXT PRIMARY KEY DEFAULT 'default',
        name TEXT NOT NULL,
        tagline TEXT,
        description TEXT,
        address_line1 TEXT,
        address_line2 TEXT,
        address_country TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        profile_brief TEXT,
        profile_mission TEXT,
        profile_vision TEXT,
        profile_history TEXT,
        certifications TEXT[],
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export async function getProducts(): Promise<ProductCategory[]> {
  const db = getPool();
  if (!db) {
    const { productCategories } = await import("~/data/products");
    return productCategories.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.imageUrl,
    }));
  }

  try {
    const result = await db.query<ProductCategory>(
      "SELECT * FROM products ORDER BY created_at ASC"
    );

    if (result.rows.length === 0) {
      const { productCategories } = await import("~/data/products");
      return productCategories.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        image_url: p.imageUrl,
      }));
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    const { productCategories } = await import("~/data/products");
    return productCategories.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.imageUrl,
    }));
  }
}

export async function getClients(): Promise<Client[]> {
  const db = getPool();
  if (!db) {
    const { clients } = await import("~/data/clients");
    return clients.map((c) => ({
      id: c.id,
      name: c.name,
      logo_url: c.logoUrl,
    }));
  }

  try {
    const result = await db.query<Client>(
      "SELECT * FROM clients ORDER BY created_at ASC"
    );

    if (result.rows.length === 0) {
      const { clients } = await import("~/data/clients");
      return clients.map((c) => ({
        id: c.id,
        name: c.name,
        logo_url: c.logoUrl,
      }));
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching clients:", error);
    const { clients } = await import("~/data/clients");
    return clients.map((c) => ({
      id: c.id,
      name: c.name,
      logo_url: c.logoUrl,
    }));
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  const db = getPool();
  const fallback = async () => {
    const { companyInfo } = await import("~/data/company");
    return {
      id: "default",
      name: companyInfo.name,
      tagline: companyInfo.tagline,
      description: companyInfo.description,
      address_line1: companyInfo.address.line1,
      address_line2: companyInfo.address.line2,
      address_country: companyInfo.address.country,
      phone: companyInfo.contact.phone,
      email: companyInfo.contact.email,
      website: companyInfo.contact.website,
      profile_brief: companyInfo.profile.brief,
      profile_mission: companyInfo.profile.mission,
      profile_vision: companyInfo.profile.vision,
      profile_history: companyInfo.profile.history,
      certifications: companyInfo.certifications,
    };
  };

  if (!db) {
    return fallback();
  }

  try {
    const result = await db.query<CompanyInfo>(
      "SELECT * FROM company_info WHERE id = 'default'"
    );

    if (result.rows.length === 0) {
      return fallback();
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching company info:", error);
    return fallback();
  }
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  author: string;
  featured_image?: string;
  excerpt?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getPages(): Promise<Page[]> {
  const db = getPool();
  if (!db) {
    return [];
  }

  try {
    const result = await db.query<Page>(
      "SELECT * FROM pages ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

export async function addProduct(product: Omit<ProductCategory, 'created_at'>): Promise<ProductCategory | null> {
  const db = getPool();
  if (!db) return null;

  try {
    const result = await db.query<ProductCategory>(
      "INSERT INTO products (id, name, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [product.id, product.name, product.description, product.image_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
}

export async function updateProduct(id: string, product: Partial<ProductCategory>): Promise<ProductCategory | null> {
  const db = getPool();
  if (!db) return null;

  try {
    const result = await db.query<ProductCategory>(
      "UPDATE products SET name = COALESCE($2, name), description = COALESCE($3, description), image_url = COALESCE($4, image_url) WHERE id = $1 RETURNING *",
      [id, product.name, product.description, product.image_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = getPool();
  if (!db) return false;

  try {
    await db.query("DELETE FROM products WHERE id = $1", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}

export async function addClient(client: Omit<Client, 'created_at'>): Promise<Client | null> {
  const db = getPool();
  if (!db) return null;

  try {
    const result = await db.query<Client>(
      "INSERT INTO clients (id, name, logo_url) VALUES ($1, $2, $3) RETURNING *",
      [client.id, client.name, client.logo_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding client:", error);
    return null;
  }
}

export async function updateClient(id: string, client: Partial<Client>): Promise<Client | null> {
  const db = getPool();
  if (!db) return null;

  try {
    const result = await db.query<Client>(
      "UPDATE clients SET name = COALESCE($2, name), logo_url = COALESCE($3, logo_url) WHERE id = $1 RETURNING *",
      [id, client.name, client.logo_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating client:", error);
    return null;
  }
}

export async function deleteClient(id: string): Promise<boolean> {
  const db = getPool();
  if (!db) return false;

  try {
    await db.query("DELETE FROM clients WHERE id = $1", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting client:", error);
    return false;
  }
}

export async function updateCompanyInfo(info: Partial<CompanyInfo>): Promise<CompanyInfo | null> {
  const db = getPool();
  if (!db) return null;

  try {
    const result = await db.query<CompanyInfo>(
      `UPDATE company_info SET 
        name = COALESCE($2, name),
        tagline = COALESCE($3, tagline),
        description = COALESCE($4, description),
        address_line1 = COALESCE($5, address_line1),
        address_line2 = COALESCE($6, address_line2),
        address_country = COALESCE($7, address_country),
        phone = COALESCE($8, phone),
        email = COALESCE($9, email),
        website = COALESCE($10, website),
        profile_brief = COALESCE($11, profile_brief),
        profile_mission = COALESCE($12, profile_mission),
        profile_vision = COALESCE($13, profile_vision),
        profile_history = COALESCE($14, profile_history),
        certifications = COALESCE($15, certifications),
        updated_at = NOW()
      WHERE id = $1 RETURNING *`,
      ['default', info.name, info.tagline, info.description, info.address_line1, info.address_line2, info.address_country, info.phone, info.email, info.website, info.profile_brief, info.profile_mission, info.profile_vision, info.profile_history, info.certifications]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating company info:", error);
    return null;
  }
}

export async function addPage(page: Omit<Page, 'created_at' | 'updated_at'>): Promise<Page | null> {
  const db = getPool();
  if (!db) return null;

  try {
    const result = await db.query<Page>(
      "INSERT INTO pages (id, title, slug, content, status, author, featured_image, excerpt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [page.id, page.title, page.slug, page.content, page.status, page.author, page.featured_image, page.excerpt]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding page:", error);
    return null;
  }
}

export async function updatePage(id: string, page: Partial<Page>): Promise<Page | null> {
  const db = getPool();
  if (!db) return null;

  try {
    const result = await db.query<Page>(
      `UPDATE pages SET 
        title = COALESCE($2, title),
        slug = COALESCE($3, slug),
        content = COALESCE($4, content),
        status = COALESCE($5, status),
        author = COALESCE($6, author),
        featured_image = COALESCE($7, featured_image),
        excerpt = COALESCE($8, excerpt),
        updated_at = NOW()
      WHERE id = $1 RETURNING *`,
      [id, page.title, page.slug, page.content, page.status, page.author, page.featured_image, page.excerpt]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating page:", error);
    return null;
  }
}

export async function deletePage(id: string): Promise<boolean> {
  const db = getPool();
  if (!db) return false;

  try {
    await db.query("DELETE FROM pages WHERE id = $1", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting page:", error);
    return false;
  }
}

export async function seedDatabase(): Promise<void> {
  const db = getPool();
  if (!db) return;

  try {
    const productsResult = await db.query("SELECT COUNT(*) FROM products");
    if (parseInt(productsResult.rows[0].count) === 0) {
      const { productCategories } = await import("~/data/products");
      for (const p of productCategories) {
        await db.query(
          "INSERT INTO products (id, name, description, image_url) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
          [p.id, p.name, p.description, p.imageUrl]
        );
      }
      console.log("Seeded products table");
    }

    const clientsResult = await db.query("SELECT COUNT(*) FROM clients");
    if (parseInt(clientsResult.rows[0].count) === 0) {
      const { clients } = await import("~/data/clients");
      for (const c of clients) {
        await db.query(
          "INSERT INTO clients (id, name, logo_url) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
          [c.id, c.name, c.logoUrl]
        );
      }
      console.log("Seeded clients table");
    }

    const companyResult = await db.query("SELECT COUNT(*) FROM company_info");
    if (parseInt(companyResult.rows[0].count) === 0) {
      const { companyInfo } = await import("~/data/company");
      await db.query(
        `INSERT INTO company_info (id, name, tagline, description, address_line1, address_line2, address_country, phone, email, website, profile_brief, profile_mission, profile_vision, profile_history, certifications) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT (id) DO NOTHING`,
        [
          "default",
          companyInfo.name,
          companyInfo.tagline,
          companyInfo.description,
          companyInfo.address.line1,
          companyInfo.address.line2,
          companyInfo.address.country,
          companyInfo.contact.phone,
          companyInfo.contact.email,
          companyInfo.contact.website,
          companyInfo.profile.brief,
          companyInfo.profile.mission,
          companyInfo.profile.vision,
          companyInfo.profile.history,
          companyInfo.certifications,
        ]
      );
      console.log("Seeded company_info table");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
