import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { FileUploader } from "../FileUploader";

interface HeroFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
  eventId: string;
}

export function HeroForm({ content, onChange, eventId }: HeroFormProps) {
  const update = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="hero-title">Titulo principal</Label>
        <Input
          id="hero-title"
          placeholder="Ej: Juan & Maria"
          value={content.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="hero-subtitle">Subtitulo</Label>
        <Input
          id="hero-subtitle"
          placeholder="Ej: Nos casamos!"
          value={content.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label>Imagen principal</Label>
        <FileUploader
          eventId={eventId}
          type="image"
          accept="image/jpeg,image/png,image/webp"
          currentUrl={content.imageUrl || ""}
          onUploaded={(url) => update("imageUrl", url)}
          label="Subir imagen principal"
        />
      </div>
    </div>
  );
}
