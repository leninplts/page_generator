import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface RsvpFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function RsvpForm({ content, onChange }: RsvpFormProps) {
  const update = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="rsvp-deadline">Fecha limite de confirmacion</Label>
        <Input
          id="rsvp-deadline"
          type="date"
          value={content.deadline || ""}
          onChange={(e) => update("deadline", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="rsvp-max">Maximo de acompanantes</Label>
        <Input
          id="rsvp-max"
          type="number"
          min="0"
          max="10"
          value={content.maxGuests ?? 2}
          onChange={(e) => update("maxGuests", parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rsvp-dietary"
          checked={content.showDietary || false}
          onChange={(e) => update("showDietary", e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
        />
        <Label htmlFor="rsvp-dietary">
          Preguntar restricciones alimentarias
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rsvp-message"
          checked={content.showMessage !== false}
          onChange={(e) => update("showMessage", e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
        />
        <Label htmlFor="rsvp-message">
          Permitir mensaje para los anfitriones
        </Label>
      </div>
    </div>
  );
}
