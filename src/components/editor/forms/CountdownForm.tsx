import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

interface CountdownFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function CountdownForm({ content, onChange }: CountdownFormProps) {
  const update = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="cd-style">Estilo</Label>
        <select
          id="cd-style"
          className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
          value={content.style || "numeric"}
          onChange={(e) => update("style", e.target.value)}
        >
          <option value="numeric">Numerico</option>
          <option value="flip">Flip</option>
          <option value="circular">Circular</option>
        </select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="cd-end">Mensaje cuando termine</Label>
        <Input
          id="cd-end"
          placeholder="Ej: El evento ya llego!"
          value={content.endMessage || ""}
          onChange={(e) => update("endMessage", e.target.value)}
        />
      </div>
    </div>
  );
}
