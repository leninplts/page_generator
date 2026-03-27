import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface VideoFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function VideoForm({ content, onChange }: VideoFormProps) {
  const update = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="video-url">URL del video</Label>
        <Input
          id="video-url"
          placeholder="https://youtube.com/watch?v=... o https://vimeo.com/..."
          value={content.url || ""}
          onChange={(e) => update("url", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="video-type">Tipo</Label>
        <select
          id="video-type"
          className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300"
          value={content.type || "youtube"}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
          <option value="upload">Video subido</option>
        </select>
      </div>
    </div>
  );
}
