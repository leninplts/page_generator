import { useState, useEffect } from "react";
import { authClient } from "../../lib/auth/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ResetPasswordForm() {
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    const err = params.get("error");
    if (err === "INVALID_TOKEN") {
      setTokenError(true);
    } else if (t) {
      setToken(t);
    } else {
      setTokenError(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }
    if (password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword: password,
        token,
      });
      if (resetError) {
        setError(resetError.message || "Error al restablecer la contrasena");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Ocurrio un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  if (tokenError) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Page Generator</h1>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <svg
              className="h-7 w-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Enlace invalido o expirado
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            El enlace para restablecer la contrasena ya no es valido. Puede que
            haya expirado o ya fue utilizado.
          </p>
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Volver al login
          </a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Page Generator</h1>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
            <svg
              className="h-7 w-7 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Contrasena actualizada
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Tu contrasena fue restablecida correctamente. Ya puedes iniciar
            sesion.
          </p>
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Iniciar sesion
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Page Generator</h1>
        <p className="mt-2 text-sm text-slate-600">
          Crea invitaciones digitales hermosas
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          Nueva contrasena
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Ingresa tu nueva contrasena.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password" required>
              Nueva contrasena
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" required>
              Confirmar contrasena
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repite la contrasena"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Restablecer contrasena
          </Button>
        </form>
      </div>
    </div>
  );
}
