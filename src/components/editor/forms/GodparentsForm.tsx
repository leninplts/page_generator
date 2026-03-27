import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface Person {
  name: string;
  role: string;
  photoUrl?: string;
}

interface GodparentsFormProps {
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

export function GodparentsForm({ content, onChange }: GodparentsFormProps) {
  const people: Person[] = content.people || [];

  const updatePerson = (index: number, field: string, value: string) => {
    const updated = [...people];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, people: updated });
  };

  const addPerson = () => {
    onChange({ ...content, people: [...people, { name: "", role: "" }] });
  };

  const removePerson = (index: number) => {
    const updated = people.filter((_, i) => i !== index);
    onChange({ ...content, people: updated });
  };

  return (
    <div className="space-y-3">
      {people.map((person, index) => (
        <div
          key={index}
          className="flex gap-2 items-start p-3 rounded-lg bg-slate-50 border border-slate-100"
        >
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Nombre completo"
              value={person.name}
              onChange={(e) => updatePerson(index, "name", e.target.value)}
            />
            <Input
              placeholder="Rol (Ej: Padrino, Madrina, Padre)"
              value={person.role}
              onChange={(e) => updatePerson(index, "role", e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => removePerson(index)}
            className="mt-1 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
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
      <Button type="button" variant="outline" size="sm" onClick={addPerson}>
        + Agregar persona
      </Button>
    </div>
  );
}
