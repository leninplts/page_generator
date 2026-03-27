import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface GiftsFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function GiftsForm({ content, onChange }: GiftsFormProps) {
  const items = content.items || [];

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, items: updated });
  };

  const addItem = () => {
    onChange({
      ...content,
      items: [...items, { label: "", url: "", description: "" }],
    });
  };

  const removeItem = (index: number) => {
    onChange({
      ...content,
      items: items.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item: any, index: number) => (
        <div
          key={index}
          className="flex gap-2 items-start p-3 rounded-lg bg-slate-50 border border-slate-100"
        >
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Etiqueta (Ej: Cuenta bancaria)"
              value={item.label || ""}
              onChange={(e) => updateItem(index, "label", e.target.value)}
            />
            <Input
              placeholder="URL o numero de cuenta"
              value={item.url || ""}
              onChange={(e) => updateItem(index, "url", e.target.value)}
            />
            <Input
              placeholder="Descripcion (opcional)"
              value={item.description || ""}
              onChange={(e) => updateItem(index, "description", e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="mt-1 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        + Agregar regalo/cuenta
      </Button>
    </div>
  );
}
