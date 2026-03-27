import { Label } from "../../ui/label";
import { FileUploader } from "../FileUploader";

interface MusicFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
  eventId: string;
}

export function MusicForm({ content, onChange, eventId }: MusicFormProps) {
  const update = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label>Musica de fondo</Label>
        <FileUploader
          eventId={eventId}
          type="audio"
          accept="audio/mpeg,audio/mp3,audio/aac,audio/wav"
          currentUrl={content.audioUrl || ""}
          onUploaded={(url) => update("audioUrl", url)}
          label="Subir archivo de audio"
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
