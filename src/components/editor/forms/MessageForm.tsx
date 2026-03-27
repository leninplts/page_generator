import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface MessageFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function MessageForm({ content, onChange }: MessageFormProps) {
  const update = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="msg-title">Titulo</Label>
        <Input
          id="msg-title"
          placeholder="Ej: Con todo nuestro amor"
          value={content.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="msg-content">Mensaje</Label>
        <textarea
          id="msg-content"
          className="flex min-h-[100px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
          placeholder="Escribe tu mensaje o dedicatoria..."
          value={content.content || ""}
          onChange={(e) => update("content", e.target.value)}
        />
      </div>
    </div>
  );
}
