import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface ItineraryItem {
  time: string;
  activity: string;
  description?: string;
}

interface ItineraryFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function ItineraryForm({ content, onChange }: ItineraryFormProps) {
  const items: ItineraryItem[] = content.items || [];

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, items: updated });
  };

  const addItem = () => {
    onChange({ ...content, items: [...items, { time: "", activity: "" }] });
  };

  const removeItem = (index: number) => {
    onChange({ ...content, items: items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-2 items-start p-3 rounded-lg bg-slate-50 border border-slate-100"
        >
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <Input
                className="w-24"
                placeholder="18:00"
                value={item.time}
                onChange={(e) => updateItem(index, "time", e.target.value)}
              />
              <Input
                className="flex-1"
                placeholder="Actividad"
                value={item.activity}
                onChange={(e) => updateItem(index, "activity", e.target.value)}
              />
            </div>
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
        + Agregar actividad
      </Button>
    </div>
  );
}
