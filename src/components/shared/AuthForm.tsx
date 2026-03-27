import { useState } from 'react';
import { signIn, signUp } from '../../lib/auth/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type AuthMode = 'login' | 'register';

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        const result = await signUp.email({
          name,
          email,
          password,
        }, {
          onError: (ctx) => {
            setError(ctx.error.message || 'Error al crear la cuenta');
          },
          onSuccess: () => {
            window.location.href = '/dashboard';
          },
        });
      } else {
        const result = await signIn.email({
          email,
          password,
        }, {
          onError: (ctx) => {
            setError(ctx.error.message || 'Credenciales incorrectas');
          },
          onSuccess: () => {
            window.location.href = '/dashboard';
          },
        });
      }
    } catch (err) {
      setError('Ocurrio un error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Logo / Brand */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Page Generator
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Crea invitaciones digitales hermosas
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-slate-100 p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Iniciar Sesion
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <Label htmlFor="name" required>Nombre completo</Label>
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
            <Label htmlFor="email" required>Correo electronico</Label>
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

          <div className="space-y-1.5">
            <Label htmlFor="password" required>Contrasena</Label>
            <Input
              id="password"
              type="password"
              placeholder={mode === 'register' ? 'Minimo 8 caracteres' : 'Tu contrasena'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={loading}
          >
            {mode === 'login' ? 'Iniciar Sesion' : 'Crear Cuenta'}
          </Button>
        </form>

        {/* Switch mode link */}
        <p className="mt-4 text-center text-sm text-slate-600">
          {mode === 'login' ? (
            <>
              No tienes cuenta?{' '}
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
              Ya tienes cuenta?{' '}
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
      </div>
    </div>
  );
}
