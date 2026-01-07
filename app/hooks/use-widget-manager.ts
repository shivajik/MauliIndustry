import { useState, useEffect } from "react";

export interface Widget {
  id: string;
  area: "footer-1" | "footer-2" | "footer-3" | "footer-4";
  type: "text" | "links" | "contact" | "social" | "html";
  title: string;
  content: WidgetContent;
  order: number;
  enabled: boolean;
}

export interface WidgetContent {
  text?: string;
  html?: string;
  links?: Array<{ label: string; url: string }>;
  contactItems?: Array<{ icon: string; text: string }>;
  socialLinks?: Array<{ platform: string; url: string }>;
}

const DEFAULT_WIDGETS: Widget[] = [
  {
    id: "widget-1",
    area: "footer-1",
    type: "text",
    title: "About Us",
    content: {
      text: "Leading manufacturer of precision industrial components since 1995."
    },
    order: 1,
    enabled: true
  },
  {
    id: "widget-2",
    area: "footer-2",
    type: "links",
    title: "Quick Links",
    content: {
      links: [
        { label: "Home", url: "/" },
        { label: "About Us", url: "/about" },
        { label: "Products & Services", url: "/products-services" },
        { label: "Clients", url: "/clients" },
        { label: "Contact", url: "/contact" }
      ]
    },
    order: 1,
    enabled: true
  },
  {
    id: "widget-3",
    area: "footer-3",
    type: "contact",
    title: "Contact Information",
    content: {
      contactItems: [
        { icon: "MapPin", text: "123 Industrial Area, Pune, MH 411001, India" },
        { icon: "Phone", text: "+91 20 2345 6789" },
        { icon: "Mail", text: "info@mauliindustries.com" }
      ]
    },
    order: 1,
    enabled: true
  }
];

export function useWidgetManager() {
  const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem("widgets");
    if (stored) {
      try {
        setWidgets(JSON.parse(stored));
      } catch {
        setWidgets(DEFAULT_WIDGETS);
      }
    }
  }, []);

  const saveWidgets = (newWidgets: Widget[]) => {
    setWidgets(newWidgets);
    localStorage.setItem("widgets", JSON.stringify(newWidgets));
  };

  const addWidget = (widget: Omit<Widget, "id">) => {
    const newWidget = {
      ...widget,
      id: `widget-${Date.now()}`
    };
    saveWidgets([...widgets, newWidget]);
  };

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    saveWidgets(widgets.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const deleteWidget = (id: string) => {
    saveWidgets(widgets.filter(w => w.id !== id));
  };

  const getWidgetsByArea = (area: Widget["area"]) => {
    return widgets
      .filter(w => w.area === area && w.enabled)
      .sort((a, b) => a.order - b.order);
  };

  return {
    widgets,
    addWidget,
    updateWidget,
    deleteWidget,
    getWidgetsByArea
  };
}
