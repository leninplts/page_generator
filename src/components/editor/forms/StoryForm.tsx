import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { FileUploader } from "../FileUploader";

interface StoryFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
  eventId: string;
}

export function StoryForm({ content, onChange, eventId }: StoryFormProps) {
  const update = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="story-title">Titulo</Label>
        <Input
          id="story-title"
          placeholder="Ej: Nuestra Historia"
          value={content.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="story-content">Texto</Label>
        <textarea
          id="story-content"
          className="flex min-h-[100px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
          placeholder="Cuenta la historia de tu evento..."
          value={content.content || ""}
          onChange={(e) => update("content", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label>Imagen</Label>
        <FileUploader
          eventId={eventId}
          type="image"
          accept="image/jpeg,image/png,image/webp"
          currentUrl={content.imageUrl || ""}
          onUploaded={(url) => update("imageUrl", url)}
          label="Subir imagen"
        />
      </div>
    </div>
  );
}
