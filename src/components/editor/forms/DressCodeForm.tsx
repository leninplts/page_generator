import { Label } from "../../ui/label";

interface DressCodeFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function DressCodeForm({ content, onChange }: DressCodeFormProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="dc-desc">Descripcion</Label>
        <textarea
          id="dc-desc"
          className="flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
          placeholder="Ej: Formal. El blanco esta reservado para la novia."
          value={content.description || ""}
          onChange={(e) =>
            onChange({ ...content, description: e.target.value })
          }
        />
      </div>
    </div>
  );
}
