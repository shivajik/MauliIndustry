import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

// Types matching the API responses
interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at?: string;
}

interface Client {
  id: string;
  name: string;
  logo_url: string;
  created_at?: string;
}

interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  profile_brief?: string;
  profile_mission?: string;
  profile_vision?: string;
  profile_history?: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  author: string;
  created_at?: string;
  updated_at?: string;
  featured_image?: string;
  excerpt?: string;
}

export function useCmsDataApi() {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetcher = useFetcher();

  // Helper to get auth headers
  const getAuthHeaders = () => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    // Session cookie is automatically sent with fetch
    return headers;
  };

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch company info (no auth required for GET)
        const companyRes = await fetch('/api/company');
        const companyData = await companyRes.json();
        if (companyData.success && companyData.data) {
          const c = companyData.data;
          setCompany({
            name: c.name,
            tagline: c.tagline || '',
            description: c.description || '',
            email: c.email || '',
            phone: c.phone || '',
            address: `${c.address_line1 || ''}, ${c.address_line2 || ''}, ${c.address_country || ''}`,
            profile_brief: c.profile_brief,
            profile_mission: c.profile_mission,
            profile_vision: c.profile_vision,
            profile_history: c.profile_history,
          });
        }

        // Fetch products
        const productsRes = await fetch('/api/products');
        const productsData = await productsRes.json();
        if (productsData.success) {
          setProducts(productsData.data || []);
        }

        // Fetch clients
        const clientsRes = await fetch('/api/clients');
        const clientsData = await clientsRes.json();
        if (clientsData.success) {
          setClients(clientsData.data || []);
        }

        // Fetch pages
        const pagesRes = await fetch('/api/pages');
        const pagesData = await pagesRes.json();
        if (pagesData.success) {
          setPages(pagesData.data || []);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching CMS data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateCompany = async (newData: CompanyInfo) => {
    try {
      const response = await fetch('/api/company', {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include', // Include cookies for auth
        body: JSON.stringify({
          name: newData.name,
          tagline: newData.tagline,
          description: newData.description,
          email: newData.email,
          phone: newData.phone,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setCompany(newData);
        // Refresh data
        window.location.reload();
      } else {
        throw new Error(result.error || 'Failed to update company');
      }
    } catch (err) {
      console.error('Error updating company:', err);
      throw err;
    }
  };

  const updateProduct = async (id: string, newData: Partial<Product & { image?: string; category?: string }>) => {
    try {
      // Map dashboard format (image) to API format (image_url)
      const apiData: Partial<Product> = {};
      if (newData.name !== undefined) apiData.name = newData.name;
      if (newData.description !== undefined) apiData.description = newData.description;
      if ((newData as any).image !== undefined) apiData.image_url = (newData as any).image;
      if (newData.image_url !== undefined) apiData.image_url = newData.image_url;
      
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(apiData),
      });

      const result = await response.json();
      if (result.success) {
        setProducts(products.map(p => p.id === id ? { ...p, ...result.data } : p));
      } else {
        throw new Error(result.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const addProduct = async (newProduct: { name: string; description: string; image?: string; category?: string }) => {
    try {
      // Map dashboard format to API format
      const product = {
        id: `product-${Date.now()}`,
        name: newProduct.name,
        description: newProduct.description,
        image_url: newProduct.image || '',
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(product),
      });

      const result = await response.json();
      if (result.success) {
        setProducts([...products, result.data]);
      } else {
        throw new Error(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      const result = await response.json();
      if (result.success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        throw new Error(result.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  const updateClient = async (id: string, newData: Partial<Client & { logo?: string }>) => {
    try {
      // Map dashboard format to API format
      const apiData: Partial<Client> = {};
      if (newData.name !== undefined) apiData.name = newData.name;
      if ((newData as any).logo !== undefined) apiData.logo_url = (newData as any).logo;
      if (newData.logo_url !== undefined) apiData.logo_url = newData.logo_url;
      
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(apiData),
      });

      const result = await response.json();
      if (result.success) {
        setClients(clients.map(c => c.id === id ? { ...c, ...newData } : c));
      } else {
        throw new Error(result.error || 'Failed to update client');
      }
    } catch (err) {
      console.error('Error updating client:', err);
      throw err;
    }
  };

  const addClient = async (newClient: { name: string; logo: string }) => {
    try {
      const client = {
        id: `client-${Date.now()}`,
        name: newClient.name,
        logo_url: newClient.logo,
      };

      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(client),
      });

      const result = await response.json();
      if (result.success) {
        setClients([...clients, result.data]);
      } else {
        throw new Error(result.error || 'Failed to add client');
      }
    } catch (err) {
      console.error('Error adding client:', err);
      throw err;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      const result = await response.json();
      if (result.success) {
        setClients(clients.filter(c => c.id !== id));
      } else {
        throw new Error(result.error || 'Failed to delete client');
      }
    } catch (err) {
      console.error('Error deleting client:', err);
      throw err;
    }
  };

  const updatePage = async (id: string, newData: Partial<Page>) => {
    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      if (result.success) {
        setPages(pages.map(p => p.id === id ? { ...p, ...newData, updated_at: new Date().toISOString() } : p));
      } else {
        throw new Error(result.error || 'Failed to update page');
      }
    } catch (err) {
      console.error('Error updating page:', err);
      throw err;
    }
  };

  const addPage = async (newPage: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const page = {
        ...newPage,
        id: `page-${Date.now()}`,
      };

      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(page),
      });

      const result = await response.json();
      if (result.success) {
        setPages([...pages, result.data]);
      } else {
        throw new Error(result.error || 'Failed to add page');
      }
    } catch (err) {
      console.error('Error adding page:', err);
      throw err;
    }
  };

  const deletePage = async (id: string) => {
    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      const result = await response.json();
      if (result.success) {
        setPages(pages.filter(p => p.id !== id));
      } else {
        throw new Error(result.error || 'Failed to delete page');
      }
    } catch (err) {
      console.error('Error deleting page:', err);
      throw err;
    }
  };

  return {
    company: company || {
      name: '',
      tagline: '',
      description: '',
      email: '',
      phone: '',
      address: '',
    },
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image: p.image_url,
      category: 'Industrial Components',
    })),
    clients: clients.map(c => ({
      id: c.id,
      name: c.name,
      logoUrl: c.logo_url,
    })),
    pages: pages.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      content: p.content,
      status: p.status,
      author: p.author,
      createdAt: p.created_at || new Date().toISOString(),
      updatedAt: p.updated_at || new Date().toISOString(),
      featured_image: p.featured_image,
      excerpt: p.excerpt,
    })),
    loading,
    error,
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

