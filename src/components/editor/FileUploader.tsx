import { useState, useRef, useCallback } from "react";
import { clsx } from "clsx";

interface FileUploaderProps {
  eventId: string;
  type: "image" | "audio";
  accept: string;
  onUploaded: (url: string) => void;
  currentUrl?: string;
  label?: string;
  className?: string;
}

export function FileUploader({
  eventId,
  type,
  accept,
  onUploaded,
  currentUrl,
  label = "Subir archivo",
  className,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");
      setProgress(10);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("eventId", eventId);
        formData.append("type", type);

        setProgress(30);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        setProgress(80);

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Error al subir");
          return;
        }

        const data = await res.json();
        setProgress(100);
        setPreviewUrl(data.url);
        onUploaded(data.url);
      } catch {
        setError("Error de conexion");
      } finally {
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
        }, 500);
      }
    },
    [eventId, type, onUploaded],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <div className={className}>
      {/* Preview for images */}
      {type === "image" && previewUrl && (
        <div className="relative group mb-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="h-40 w-full rounded-lg border border-slate-200 object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl("");
              onUploaded("");
            }}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <svg
              className="h-3.5 w-3.5"
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
      )}

      {/* Preview for audio */}
      {type === "audio" && previewUrl && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
            />
          </svg>
          <audio controls src={previewUrl} className="h-8 flex-1" />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl("");
              onUploaded("");
            }}
            className="rounded p-1 text-slate-400 transition-colors hover:text-red-500"
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
      )}

      {/* Drop zone */}
      {!previewUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={clsx(
            "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all",
            dragOver
              ? "border-orange-400 bg-orange-50/50"
              : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50",
            uploading && "pointer-events-none opacity-60",
          )}
        >
          {uploading ? (
            <>
              <div className="mb-3 h-1.5 w-full rounded-full bg-slate-200">
                <div
                  className="h-1.5 rounded-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">Subiendo... {progress}%</p>
            </>
          ) : (
            <>
              <svg
                className="mb-2 h-8 w-8 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="mt-0.5 text-xs text-slate-400">
                Arrastra o haz clic
              </p>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error message */}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
