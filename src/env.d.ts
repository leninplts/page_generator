/// <reference path="../.astro/types.d.ts" />

type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image: string | null;
  role: "admin" | "organizer";
  createdAt: Date;
  updatedAt: Date;
};

type Session = {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
};

declare namespace App {
  interface Locals {
    user: User | null;
    session: Session | null;
  }
}
