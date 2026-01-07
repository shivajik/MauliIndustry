import { useState } from "react";
import { Plus, Save, X, Trash2, Edit, GripVertical, Eye, EyeOff, ExternalLink } from "lucide-react";
import { useMenuManager, type MenuItem, type Menu } from "../../hooks/use-menu-manager";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Card } from "../ui/card/card";
import { Badge } from "../ui/badge/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs/tabs";
import styles from "./menu-manager.module.css";

export function MenuManager() {
  const { menus, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuManager();
  const [activeMenu, setActiveMenu] = useState<string>("main-menu");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [addingItem, setAddingItem] = useState(false);
  const [itemForm, setItemForm] = useState<Partial<MenuItem>>({
    label: "",
    url: "",
    type: "page",
    order: 1,
    enabled: true,
    openInNewTab: false
  });

  const currentMenu = menus.find(m => m.id === activeMenu);

  const handleSaveItem = (itemId: string) => {
    if (currentMenu) {
      updateMenuItem(currentMenu.id, itemId, itemForm);
      setEditingItemId(null);
      setItemForm({ label: "", url: "", type: "page", order: 1, enabled: true, openInNewTab: false });
    }
  };

  const handleAddItem = () => {
    if (currentMenu && itemForm.label && itemForm.url) {
      addMenuItem(currentMenu.id, itemForm as Omit<MenuItem, "id">);
      setAddingItem(false);
      setItemForm({ label: "", url: "", type: "page", order: 1, enabled: true, openInNewTab: false });
    }
  };

  const renderItemEditor = (item?: MenuItem) => {
    const form = item ? { ...item, ...itemForm } : itemForm;
    
    return (
      <div className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Menu Label</label>
            <Input
              value={form.label}
              onChange={(e) => setItemForm({ ...itemForm, label: e.target.value })}
              placeholder="e.g., Home"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>URL</label>
            <Input
              value={form.url}
              onChange={(e) => setItemForm({ ...itemForm, url: e.target.value })}
              placeholder="e.g., /about or https://example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Type</label>
            <select
              value={form.type}
              onChange={(e) => setItemForm({ ...itemForm, type: e.target.value as MenuItem["type"] })}
              className={styles.select}
            >
              <option value="page">Internal Page</option>
              <option value="custom">Custom Link</option>
              <option value="external">External Link</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Order</label>
            <Input
              type="number"
              value={form.order}
              onChange={(e) => setItemForm({ ...itemForm, order: parseInt(e.target.value) || 1 })}
              min="1"
            />
          </div>

          <div className={styles.formGroup}>
            <label>CSS Class (optional)</label>
            <Input
              value={form.cssClass || ""}
              onChange={(e) => setItemForm({ ...itemForm, cssClass: e.target.value })}
              placeholder="custom-class"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.openInNewTab || false}
                onChange={(e) => setItemForm({ ...itemForm, openInNewTab: e.target.checked })}
              />
              <span>Open in new tab</span>
            </label>
          </div>
        </div>

        <div className={styles.formActions}>
          <Button onClick={() => item ? handleSaveItem(item.id) : handleAddItem()}>
            <Save size={16} />
            {item ? "Save Changes" : "Add Item"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              if (item) {
                setEditingItemId(null);
              } else {
                setAddingItem(false);
              }
              setItemForm({ label: "", url: "", type: "page", order: 1, enabled: true, openInNewTab: false });
            }}
          >
            <X size={16} />
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Menus</h2>
          <p className={styles.subtitle}>Create and manage navigation menus for your site. Drag items to reorder them.</p>
        </div>
      </div>

      <Tabs value={activeMenu} onValueChange={setActiveMenu}>
        <TabsList className={styles.tabsList}>
          {menus.map(menu => (
            <TabsTrigger key={menu.id} value={menu.id}>
              {menu.name}
              <Badge variant="secondary" className={styles.menuBadge}>
                {menu.items.filter(i => i.enabled).length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {menus.map(menu => (
          <TabsContent key={menu.id} value={menu.id} className={styles.tabContent}>
            <div className={styles.menuActions}>
              <Button onClick={() => setAddingItem(true)}>
                <Plus size={16} />
                Add Menu Item
              </Button>
            </div>

            {addingItem && (
              <Card className={styles.editCard}>
                <div className={styles.editCardHeader}>
                  <h3 className={styles.cardTitle}>Add New Menu Item</h3>
                  <p className={styles.cardHint}>Fill in the details below to add a new item to this menu.</p>
                </div>
                {renderItemEditor()}
              </Card>
            )}

            <div className={styles.menuItems}>
              {menu.items
                .sort((a, b) => a.order - b.order)
                .map(item => (
                  <Card key={item.id} className={styles.menuItemCard}>
                    {editingItemId === item.id ? (
                      <>
                        <h4 className={styles.cardTitle}>Edit Menu Item</h4>
                        {renderItemEditor(item)}
                      </>
                    ) : (
                      <>
                        <div className={styles.itemHeader}>
                          <div className={styles.itemTitle}>
                            <GripVertical size={16} className={styles.dragHandle} />
                            <span className={styles.itemLabel}>{item.label}</span>
                            {item.openInNewTab && (
                              <ExternalLink size={14} className={styles.externalIcon} />
                            )}
                          </div>
                          <div className={styles.itemBadges}>
                            <Badge variant="outline">{item.type}</Badge>
                            {item.enabled ? (
                              <Badge variant="default">
                                <Eye size={12} />
                                Visible
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                <EyeOff size={12} />
                                Hidden
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className={styles.itemDetails}>
                          <div className={styles.itemUrl}>
                            <span className={styles.urlLabel}>URL:</span>
                            <code>{item.url}</code>
                          </div>
                          <div className={styles.itemMeta}>
                            <span>Order: {item.order}</span>
                            {item.cssClass && <span>Class: {item.cssClass}</span>}
                          </div>
                        </div>

                        <div className={styles.itemActions}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItemId(item.id);
                              setItemForm(item);
                            }}
                          >
                            <Edit size={14} />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateMenuItem(menu.id, item.id, { enabled: !item.enabled })}
                          >
                            {item.enabled ? <EyeOff size={14} /> : <Eye size={14} />}
                            {item.enabled ? "Hide" : "Show"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMenuItem(menu.id, item.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </Card>
                ))}
              
              {menu.items.length === 0 && (
                <div className={styles.emptyState}>
                  <p>No menu items yet. Click "Add Menu Item" to get started.</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
