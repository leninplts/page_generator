import { auth } from "./lib/auth";
import { defineMiddleware } from "astro:middleware";

const PROTECTED_ROUTES = ['/dashboard'];
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export const onRequest = defineMiddleware(async (context, next) => {
  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  const pathname = context.url.pathname;

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  if (isProtected && !isAuthed) {
    return context.redirect('/auth/login');
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  if (isAuthRoute && isAuthed) {
    return context.redirect('/dashboard');
  }

  return next();
});
