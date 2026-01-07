import { useEffect, useState } from "react";
import { companyInfo } from "~/data/company";
import { productCategories, type ProductCategory } from "~/data/products";
import { clients as defaultClients, type Client } from "~/data/clients";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  author: string;
  createdAt: string;
  updatedAt: string;
  featured_image?: string;
  excerpt?: string;
}

// Convert product categories to flat products for admin
const defaultProducts: Product[] = productCategories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  description: cat.description,
  image: cat.imageUrl,
  category: "Industrial Components",
}));

// Convert company info to flat structure
const defaultCompanyInfo: CompanyInfo = {
  name: companyInfo.name,
  tagline: companyInfo.tagline,
  description: companyInfo.description,
  email: companyInfo.contact.email,
  phone: companyInfo.contact.phone,
  address: `${companyInfo.address.line1}, ${companyInfo.address.line2}, ${companyInfo.address.country}`,
};

// Default pages with actual website content
const defaultPages: Page[] = [
  {
    id: '1',
    title: 'Precision Engineering for Steel & Rolling Mill Industries',
    slug: 'home',
    content: 'With 20+ years of experience, we deliver reliable, high-quality industrial components tailored to your requirements. From design to delivery, we are your trusted partner in precision manufacturing.',
    status: 'published',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured_image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800',
    excerpt: 'ISO 9001:2015 certified precision tool room specializing in machining solutions'
  },
  {
    id: '2',
    title: 'About Mauli Industries',
    slug: 'about',
    content: `Company Profile:
${companyInfo.profile.brief}

Our Mission:
${companyInfo.profile.mission}

Our Vision:
${companyInfo.profile.vision}

Our History:
${companyInfo.profile.history}`,
    status: 'published',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    excerpt: 'Excellence in Precision Engineering Since 20+ Years'
  },
  {
    id: '3',
    title: 'Contact Us',
    slug: 'contact',
    content: 'Get in touch with Mauli Industries for all your precision engineering needs. We are located in MIDC Waluj, Aurangabad, Maharashtra and serve clients across India.',
    status: 'published',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    excerpt: "We're Here to Help You"
  },
];

export function useCmsData() {
  const [company, setCompany] = useState<CompanyInfo>(defaultCompanyInfo);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [clients, setClients] = useState<Client[]>(defaultClients);
  const [pages, setPages] = useState<Page[]>(defaultPages);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCompany = localStorage.getItem("company-data");
      if (storedCompany) {
        try {
          setCompany(JSON.parse(storedCompany));
        } catch (e) {
          console.error("Failed to parse company data", e);
        }
      } else {
        localStorage.setItem("company-data", JSON.stringify(defaultCompanyInfo));
      }

      const storedProducts = localStorage.getItem("products-data");
      if (storedProducts) {
        try {
          setProducts(JSON.parse(storedProducts));
        } catch (e) {
          console.error("Failed to parse products data", e);
        }
      } else {
        localStorage.setItem("products-data", JSON.stringify(defaultProducts));
      }

      const storedClients = localStorage.getItem("clients-data");
      if (storedClients) {
        try {
          setClients(JSON.parse(storedClients));
        } catch (e) {
          console.error("Failed to parse clients data", e);
        }
      } else {
        localStorage.setItem("clients-data", JSON.stringify(defaultClients));
      }

      const storedPages = localStorage.getItem("pages-data");
      if (storedPages) {
        try {
          setPages(JSON.parse(storedPages));
        } catch (e) {
          console.error("Failed to parse pages data", e);
        }
      } else {
        localStorage.setItem("pages-data", JSON.stringify(defaultPages));
      }
    }
  }, []);

  const updateCompany = (newData: CompanyInfo) => {
    setCompany(newData);
    if (typeof window !== "undefined") {
      localStorage.setItem("company-data", JSON.stringify(newData));
    }
  };

  const updateProduct = (id: string, newData: Partial<Product>) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, ...newData } : p
    );
    setProducts(updatedProducts);
    if (typeof window !== "undefined") {
      localStorage.setItem("products-data", JSON.stringify(updatedProducts));
    }
  };

  const addProduct = (newProduct: Omit<Product, "id">) => {
    const product = { ...newProduct, id: Date.now().toString() };
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    if (typeof window !== "undefined") {
      localStorage.setItem("products-data", JSON.stringify(updatedProducts));
    }
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    if (typeof window !== "undefined") {
      localStorage.setItem("products-data", JSON.stringify(updatedProducts));
    }
  };

  const updateClient = (id: string, newData: Partial<Client>) => {
    const updatedClients = clients.map((c) =>
      c.id === id ? { ...c, ...newData } : c
    );
    setClients(updatedClients);
    if (typeof window !== "undefined") {
      localStorage.setItem("clients-data", JSON.stringify(updatedClients));
    }
  };

  const addClient = (newClient: { name: string; logo: string }) => {
    const client: Client = { 
      id: Date.now().toString(), 
      name: newClient.name, 
      logoUrl: newClient.logo 
    };
    const updatedClients = [...clients, client];
    setClients(updatedClients);
    if (typeof window !== "undefined") {
      localStorage.setItem("clients-data", JSON.stringify(updatedClients));
    }
  };

  const deleteClient = (id: string) => {
    const updatedClients = clients.filter((c) => c.id !== id);
    setClients(updatedClients);
    if (typeof window !== "undefined") {
      localStorage.setItem("clients-data", JSON.stringify(updatedClients));
    }
  };

  const updatePage = (id: string, newData: Partial<Page>) => {
    const updatedPages = pages.map((p) =>
      p.id === id ? { ...p, ...newData, updatedAt: new Date().toISOString() } : p
    );
    setPages(updatedPages);
    if (typeof window !== "undefined") {
      localStorage.setItem("pages-data", JSON.stringify(updatedPages));
    }
  };

  const addPage = (newPage: Omit<Page, "id" | "createdAt" | "updatedAt">) => {
    const page: Page = { 
      ...newPage, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedPages = [...pages, page];
    setPages(updatedPages);
    if (typeof window !== "undefined") {
      localStorage.setItem("pages-data", JSON.stringify(updatedPages));
    }
  };

  const deletePage = (id: string) => {
    const updatedPages = pages.filter((p) => p.id !== id);
    setPages(updatedPages);
    if (typeof window !== "undefined") {
      localStorage.setItem("pages-data", JSON.stringify(updatedPages));
    }
  };

  return {
    company,
    products,
    clients,
    pages,
    updateCompany,
    updateProduct,
    addProduct,
    deleteProduct,
    updateClient,
    addClient,
    deleteClient,
    updatePage,
    addPage,
    deletePage,
  };
}

export function usePagesData() {
  const [data, setData] = useState<Page[]>(defaultPages);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pages-data");
      if (stored) {
        try {
          setData(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse pages data", e);
        }
      }
    }
  }, []);

  return data;
}

export type { Page };

export function useCompanyData() {
  const [data, setData] = useState(companyInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("company-data");
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          // Merge stored flat data back to original structure
          setData({
            ...companyInfo,
            name: parsedData.name || companyInfo.name,
            tagline: parsedData.tagline || companyInfo.tagline,
            description: parsedData.description || companyInfo.description,
            contact: {
              ...companyInfo.contact,
              email: parsedData.email || companyInfo.contact.email,
              phone: parsedData.phone || companyInfo.contact.phone,
            },
            address: {
              ...companyInfo.address,
            },
            profile: {
              ...companyInfo.profile,
            }
          });
        } catch (e) {
          console.error("Failed to parse company data", e);
        }
      }
    }
  }, []);

  return data;
}

export function useProductsData() {
  const [data, setData] = useState<ProductCategory[]>(productCategories);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("products-data");
      if (stored) {
        try {
          setData(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse products data", e);
        }
      }
    }
  }, []);

  return data;
}

export function useClientsData() {
  const [data, setData] = useState<Client[]>(defaultClients);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clients-data");
      if (stored) {
        try {
          setData(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse clients data", e);
        }
      }
    }
  }, []);

  return data;
}
