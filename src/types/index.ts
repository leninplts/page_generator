export type { EventType } from '../lib/constants/event-types';
export type { SectionType } from '../lib/constants/sections';

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: 'admin' | 'organizer';
}

export interface EventConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  fontSize: {
    heading: string;
    body: string;
  };
}

export interface SectionConfig {
  backgroundColor?: string;
  textColor?: string;
  layout?: 'centered' | 'left' | 'right' | 'full-width';
  padding?: string;
}
