import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface GalleryFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function GalleryForm({ content, onChange }: GalleryFormProps) {
  const images: string[] = content.images || [];

  const addImage = () => {
    onChange({ ...content, images: [...images, ""] });
  };

  const updateImage = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    onChange({ ...content, images: updated });
  };

  const removeImage = (index: number) => {
    onChange({
      ...content,
      images: images.filter((_: string, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">
        La subida de imagenes estara disponible pronto. Por ahora puedes agregar
        URLs.
      </p>
      {images.map((url: string, index: number) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            className="flex-1"
            placeholder="https://ejemplo.com/foto.jpg"
            value={url}
            onChange={(e) => updateImage(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addImage}>
        + Agregar imagen
      </Button>
    </div>
  );
}
