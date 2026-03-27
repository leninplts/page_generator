import { HeroForm } from "./HeroForm";
import { LocationForm } from "./LocationForm";
import { GodparentsForm } from "./GodparentsForm";
import { MessageForm } from "./MessageForm";
import { StoryForm } from "./StoryForm";
import { CountdownForm } from "./CountdownForm";
import { ItineraryForm } from "./ItineraryForm";
import { DressCodeForm } from "./DressCodeForm";
import { MusicForm } from "./MusicForm";
import { EntertainmentForm } from "./EntertainmentForm";
import { GiftsForm } from "./GiftsForm";
import { RsvpForm } from "./RsvpForm";
import { VideoForm } from "./VideoForm";
import { GalleryForm } from "./GalleryForm";

interface SectionFormProps {
  sectionType: string;
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
  eventId: string;
}

export function SectionForm({
  sectionType,
  content,
  onChange,
  eventId,
}: SectionFormProps) {
  switch (sectionType) {
    case "hero":
      return (
        <HeroForm content={content} onChange={onChange} eventId={eventId} />
      );
    case "ceremony":
      return (
        <LocationForm content={content} onChange={onChange} title="Ceremonia" />
      );
    case "reception":
      return (
        <LocationForm content={content} onChange={onChange} title="Recepcion" />
      );
    case "godparents":
      return <GodparentsForm content={content} onChange={onChange} />;
    case "message":
      return <MessageForm content={content} onChange={onChange} />;
    case "story":
      return (
        <StoryForm content={content} onChange={onChange} eventId={eventId} />
      );
    case "countdown":
      return <CountdownForm content={content} onChange={onChange} />;
    case "itinerary":
      return <ItineraryForm content={content} onChange={onChange} />;
    case "dresscode":
      return <DressCodeForm content={content} onChange={onChange} />;
    case "music":
      return (
        <MusicForm content={content} onChange={onChange} eventId={eventId} />
      );
    case "entertainment":
      return <EntertainmentForm content={content} onChange={onChange} />;
    case "gifts":
      return <GiftsForm content={content} onChange={onChange} />;
    case "rsvp":
      return <RsvpForm content={content} onChange={onChange} />;
    case "video":
      return <VideoForm content={content} onChange={onChange} />;
    case "gallery":
      return (
        <GalleryForm content={content} onChange={onChange} eventId={eventId} />
      );
    default:
      return (
        <p className="text-sm text-slate-400 italic">
          Editor no disponible para este tipo de seccion.
        </p>
      );
  }
}
