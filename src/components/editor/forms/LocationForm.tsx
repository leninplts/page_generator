import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface LocationFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
  title: string;
}

export function LocationForm({ content, onChange, title }: LocationFormProps) {
  const update = (field: string, value: string | number) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor={`${title}-place`}>Nombre del lugar</Label>
        <Input
          id={`${title}-place`}
          placeholder="Ej: Iglesia San Francisco"
          value={content.placeName || ""}
          onChange={(e) => update("placeName", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${title}-address`}>Direccion</Label>
        <Input
          id={`${title}-address`}
          placeholder="Av. Principal 123, Ciudad"
          value={content.address || ""}
          onChange={(e) => update("address", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${title}-time`}>Hora</Label>
        <Input
          id={`${title}-time`}
          type="time"
          value={content.time || ""}
          onChange={(e) => update("time", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor={`${title}-lat`}>Latitud</Label>
          <Input
            id={`${title}-lat`}
            type="number"
            step="any"
            placeholder="-17.389"
            value={content.latitude || ""}
            onChange={(e) =>
              update("latitude", parseFloat(e.target.value) || 0)
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`${title}-lng`}>Longitud</Label>
          <Input
            id={`${title}-lng`}
            type="number"
            step="any"
            placeholder="-66.156"
            value={content.longitude || ""}
            onChange={(e) =>
              update("longitude", parseFloat(e.target.value) || 0)
            }
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${title}-notes`}>Notas adicionales</Label>
        <Input
          id={`${title}-notes`}
          placeholder="Ej: Llegar 15 minutos antes"
          value={content.notes || ""}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
    </div>
  );
}
