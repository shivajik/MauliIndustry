import { useState } from "react";
import { Plus, Save, X, Trash2, Edit, GripVertical, Eye, EyeOff } from "lucide-react";
import { useWidgetManager, type Widget } from "../../hooks/use-widget-manager";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Textarea } from "../ui/textarea/textarea";
import { Card } from "../ui/card/card";
import { Badge } from "../ui/badge/badge";
import styles from "./widget-manager.module.css";

export function WidgetManager() {
  const { widgets, addWidget, updateWidget, deleteWidget } = useWidgetManager();
  const [editingWidgetId, setEditingWidgetId] = useState<string | null>(null);
  const [addingWidget, setAddingWidget] = useState(false);
  const [widgetForm, setWidgetForm] = useState<Partial<Widget>>({
    area: "footer-1",
    type: "text",
    title: "",
    content: {},
    order: 1,
    enabled: true
  });

  const handleSaveWidget = (id: string) => {
    updateWidget(id, widgetForm);
    setEditingWidgetId(null);
    setWidgetForm({ area: "footer-1", type: "text", title: "", content: {}, order: 1, enabled: true });
  };

  const handleAddWidget = () => {
    if (widgetForm.area && widgetForm.type && widgetForm.title) {
      addWidget(widgetForm as Omit<Widget, "id">);
      setAddingWidget(false);
      setWidgetForm({ area: "footer-1", type: "text", title: "", content: {}, order: 1, enabled: true });
    }
  };

  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case "text":
        return <p className={styles.previewText}>{widget.content.text}</p>;
      case "html":
        return <div dangerouslySetInnerHTML={{ __html: widget.content.html || "" }} />;
      case "links":
        return (
          <ul className={styles.linkList}>
            {widget.content.links?.map((link, i) => (
              <li key={i}>{link.label} → {link.url}</li>
            ))}
          </ul>
        );
      case "contact":
        return (
          <ul className={styles.contactList}>
            {widget.content.contactItems?.map((item, i) => (
              <li key={i}>{item.icon}: {item.text}</li>
            ))}
          </ul>
        );
      case "social":
        return (
          <ul className={styles.socialList}>
            {widget.content.socialLinks?.map((link, i) => (
              <li key={i}>{link.platform} → {link.url}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const renderWidgetEditor = (widget?: Widget) => {
    const form = widget || widgetForm;
    
    return (
      <div className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Widget Title</label>
            <Input
              value={form.title}
              onChange={(e) => widget 
                ? setWidgetForm({ ...widgetForm, title: e.target.value })
                : setWidgetForm({ ...widgetForm, title: e.target.value })
              }
              placeholder="e.g., About Us"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Widget Type</label>
            <select
              value={form.type}
              onChange={(e) => {
                const type = e.target.value as Widget["type"];
                const newContent = type === "text" ? { text: "" }
                  : type === "html" ? { html: "" }
                  : type === "links" ? { links: [] }
                  : type === "contact" ? { contactItems: [] }
                  : { socialLinks: [] };
                
                if (widget) {
                  setWidgetForm({ ...widgetForm, type, content: newContent });
                } else {
                  setWidgetForm({ ...widgetForm, type, content: newContent });
                }
              }}
              className={styles.select}
            >
              <option value="text">Text Widget</option>
              <option value="html">HTML Widget</option>
              <option value="links">Links Widget</option>
              <option value="contact">Contact Widget</option>
              <option value="social">Social Links</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Footer Area</label>
            <select
              value={form.area}
              onChange={(e) => widget
                ? setWidgetForm({ ...widgetForm, area: e.target.value as Widget["area"] })
                : setWidgetForm({ ...widgetForm, area: e.target.value as Widget["area"] })
              }
              className={styles.select}
            >
              <option value="footer-1">Footer Column 1</option>
              <option value="footer-2">Footer Column 2</option>
              <option value="footer-3">Footer Column 3</option>
              <option value="footer-4">Footer Column 4</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Order</label>
            <Input
              type="number"
              value={form.order}
              onChange={(e) => widget
                ? setWidgetForm({ ...widgetForm, order: parseInt(e.target.value) || 1 })
                : setWidgetForm({ ...widgetForm, order: parseInt(e.target.value) || 1 })
              }
              min="1"
            />
          </div>

          {form.type === "text" && (
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Text Content</label>
              <Textarea
                value={form.content?.text || ""}
                onChange={(e) => widget
                  ? setWidgetForm({ ...widgetForm, content: { ...form.content, text: e.target.value } })
                  : setWidgetForm({ ...widgetForm, content: { ...form.content, text: e.target.value } })
                }
                rows={4}
                placeholder="Enter text content..."
              />
            </div>
          )}

          {form.type === "html" && (
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>HTML Content</label>
              <Textarea
                value={form.content?.html || ""}
                onChange={(e) => widget
                  ? setWidgetForm({ ...widgetForm, content: { ...form.content, html: e.target.value } })
                  : setWidgetForm({ ...widgetForm, content: { ...form.content, html: e.target.value } })
                }
                rows={6}
                placeholder="<div>Your HTML here</div>"
              />
            </div>
          )}

          {form.type === "links" && (
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Links (JSON format)</label>
              <Textarea
                value={JSON.stringify(form.content?.links || [], null, 2)}
                onChange={(e) => {
                  try {
                    const links = JSON.parse(e.target.value);
                    widget
                      ? setWidgetForm({ ...widgetForm, content: { ...form.content, links } })
                      : setWidgetForm({ ...widgetForm, content: { ...form.content, links } });
                  } catch {}
                }}
                rows={6}
                placeholder='[{"label": "Home", "url": "/"}]'
              />
            </div>
          )}

          {form.type === "contact" && (
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Contact Items (JSON format)</label>
              <Textarea
                value={JSON.stringify(form.content?.contactItems || [], null, 2)}
                onChange={(e) => {
                  try {
                    const contactItems = JSON.parse(e.target.value);
                    widget
                      ? setWidgetForm({ ...widgetForm, content: { ...form.content, contactItems } })
                      : setWidgetForm({ ...widgetForm, content: { ...form.content, contactItems } });
                  } catch {}
                }}
                rows={6}
                placeholder='[{"icon": "MapPin", "text": "Address"}]'
              />
            </div>
          )}

          {form.type === "social" && (
            <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
              <label>Social Links (JSON format)</label>
              <Textarea
                value={JSON.stringify(form.content?.socialLinks || [], null, 2)}
                onChange={(e) => {
                  try {
                    const socialLinks = JSON.parse(e.target.value);
                    widget
                      ? setWidgetForm({ ...widgetForm, content: { ...form.content, socialLinks } })
                      : setWidgetForm({ ...widgetForm, content: { ...form.content, socialLinks } });
                  } catch {}
                }}
                rows={6}
                placeholder='[{"platform": "Facebook", "url": "https://..."}]'
              />
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <Button onClick={() => widget ? handleSaveWidget(widget.id) : handleAddWidget()}>
            <Save size={16} />
            {widget ? "Save Changes" : "Create Widget"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              if (widget) {
                setEditingWidgetId(null);
              } else {
                setAddingWidget(false);
              }
              setWidgetForm({ area: "footer-1", type: "text", title: "", content: {}, order: 1, enabled: true });
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
          <h2 className={styles.title}>Widget Manager</h2>
          <p className={styles.subtitle}>Manage footer widgets and content areas</p>
        </div>
        <Button onClick={() => setAddingWidget(true)}>
          <Plus size={16} />
          Add Widget
        </Button>
      </div>

      {addingWidget && (
        <Card className={styles.editCard}>
          <h3 className={styles.cardTitle}>Add New Widget</h3>
          {renderWidgetEditor()}
        </Card>
      )}

      <div className={styles.widgetsGrid}>
        {["footer-1", "footer-2", "footer-3", "footer-4"].map((area) => (
          <div key={area} className={styles.widgetArea}>
            <h3 className={styles.areaTitle}>
              {area === "footer-1" && "Footer Column 1"}
              {area === "footer-2" && "Footer Column 2"}
              {area === "footer-3" && "Footer Column 3"}
              {area === "footer-4" && "Footer Column 4"}
            </h3>
            
            {widgets
              .filter(w => w.area === area)
              .sort((a, b) => a.order - b.order)
              .map(widget => (
                <Card key={widget.id} className={styles.widgetCard}>
                  {editingWidgetId === widget.id ? (
                    <>
                      <h4 className={styles.cardTitle}>Edit Widget</h4>
                      {renderWidgetEditor(widget)}
                    </>
                  ) : (
                    <>
                      <div className={styles.widgetHeader}>
                        <div className={styles.widgetTitle}>
                          <GripVertical size={16} className={styles.dragHandle} />
                          <span>{widget.title}</span>
                        </div>
                        <div className={styles.widgetBadges}>
                          <Badge variant="secondary">{widget.type}</Badge>
                          {widget.enabled ? (
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
                      
                      <div className={styles.widgetPreview}>
                        {renderWidgetContent(widget)}
                      </div>

                      <div className={styles.widgetActions}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingWidgetId(widget.id);
                            setWidgetForm(widget);
                          }}
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateWidget(widget.id, { enabled: !widget.enabled })}
                        >
                          {widget.enabled ? <EyeOff size={14} /> : <Eye size={14} />}
                          {widget.enabled ? "Hide" : "Show"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteWidget(widget.id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </Card>
              ))}
            
            {widgets.filter(w => w.area === area).length === 0 && (
              <div className={styles.emptyArea}>
                <p>No widgets in this area</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
