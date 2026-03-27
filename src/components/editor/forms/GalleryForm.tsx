import { FileUploader } from "../FileUploader";

interface GalleryFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
  eventId: string;
}

export function GalleryForm({ content, onChange, eventId }: GalleryFormProps) {
  const images: string[] = content.images || [];

  const addImage = (url: string) => {
    if (url) {
      onChange({ ...content, images: [...images, url] });
    }
  };

  const removeImage = (index: number) => {
    onChange({
      ...content,
      images: images.filter((_: string, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-3">
      {/* Existing images grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((url: string, index: number) => (
            <div key={index} className="group relative aspect-square">
              <img
                src={url}
                alt={`Foto ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
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
        </div>
      )}

      {/* Upload new image */}
      <FileUploader
        eventId={eventId}
        type="image"
        accept="image/jpeg,image/png,image/webp"
        onUploaded={addImage}
        label="Agregar foto a la galeria"
      />
    </div>
  );
}
