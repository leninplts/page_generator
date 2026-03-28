import { useState } from "react";
import { signIn, signUp, authClient } from "../../lib/auth/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type AuthMode = "login" | "register" | "forgot";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch {
      setError("Error al iniciar sesion con Google");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "forgot") {
        const { error } = await authClient.requestPasswordReset({
          email,
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        if (error) {
          setError(error.message || "Error al enviar el correo");
        } else {
          setSuccess(
            "Si el correo existe, recibiras un enlace para restablecer tu contrasena.",
          );
        }
      } else if (mode === "register") {
        await signUp.email(
          {
            name,
            email,
            password,
          },
          {
            onError: (ctx) => {
              setError(ctx.error.message || "Error al crear la cuenta");
            },
            onSuccess: () => {
              window.location.href = "/dashboard";
            },
          },
        );
      } else {
        await signIn.email(
          {
            email,
            password,
          },
          {
            onError: (ctx) => {
              setError(ctx.error.message || "Credenciales incorrectas");
            },
            onSuccess: () => {
              window.location.href = "/dashboard";
            },
          },
        );
      }
    } catch (err) {
      setError("Ocurrio un error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setSuccess("");
  };

  return (
    <div className="space-y-6">
      {/* Logo / Brand */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Page Generator</h1>
        <p className="mt-2 text-sm text-slate-600">
          Crea invitaciones digitales hermosas
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
        {/* Tab Switcher — hidden in forgot mode */}
        {mode !== "forgot" && (
          <div className="flex rounded-lg bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Iniciar Sesion
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                mode === "register"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Crear Cuenta
            </button>
          </div>
        )}

        {/* Forgot password header */}
        {mode === "forgot" && (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className="flex items-center text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
            >
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Volver al login
            </button>
            <h2 className="text-lg font-semibold text-slate-900">
              Recuperar contrasena
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Ingresa tu correo y te enviaremos un enlace para restablecer tu
              contrasena.
            </p>
          </div>
        )}

        {/* Google Sign In — only on login/register */}
        {mode !== "forgot" && (
          <>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {googleLoading ? "Conectando..." : "Continuar con Google"}
            </button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400">
                  o con email
                </span>
              </div>
            </div>
          </>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-1.5">
              <Label htmlFor="name" required>
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" required>
              Correo electronico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {mode !== "forgot" && (
            <div className="space-y-1.5">
              <Label htmlFor="password" required>
                Contrasena
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={
                  mode === "register" ? "Minimo 8 caracteres" : "Tu contrasena"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
              />
            </div>
          )}

          {/* Forgot password link — only on login */}
          {mode === "login" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  setError("");
                  setSuccess("");
                }}
                className="text-xs text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Olvidaste tu contrasena?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            {mode === "login" && "Iniciar Sesion"}
            {mode === "register" && "Crear Cuenta"}
            {mode === "forgot" && "Enviar enlace"}
          </Button>
        </form>

        {/* Switch mode link */}
        {mode !== "forgot" && (
          <p className="mt-4 text-center text-sm text-slate-600">
            {mode === "login" ? (
              <>
                No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Registrate
                </button>
              </>
            ) : (
              <>
                Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Inicia sesion
                </button>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
