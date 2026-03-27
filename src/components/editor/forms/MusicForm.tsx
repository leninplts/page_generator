import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface MusicFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function MusicForm({ content, onChange }: MusicFormProps) {
  const update = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="music-url">URL del audio (MP3)</Label>
        <Input
          id="music-url"
          placeholder="https://ejemplo.com/musica.mp3"
          value={content.audioUrl || ""}
          onChange={(e) => update("audioUrl", e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="music-autoplay"
          checked={content.autoplay !== false}
          onChange={(e) => update("autoplay", e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
        />
        <Label htmlFor="music-autoplay">
          Reproducir automaticamente al entrar
        </Label>
      </div>
    </div>
  );
}
