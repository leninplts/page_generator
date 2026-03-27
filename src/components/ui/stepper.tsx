import { clsx } from "clsx";

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.label}
              className={clsx("flex items-center", !isLast && "flex-1")}
            >
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isCompleted && "border-indigo-600 bg-indigo-600 text-white",
                    isCurrent && "border-indigo-600 bg-white text-indigo-600",
                    !isCompleted &&
                      !isCurrent &&
                      "border-slate-300 bg-white text-slate-400",
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={clsx(
                      "text-xs font-medium",
                      isCompleted || isCurrent
                        ? "text-indigo-600"
                        : "text-slate-400",
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
              {!isLast && (
                <div
                  className={clsx(
                    "mx-2 h-0.5 flex-1 transition-colors",
                    isCompleted ? "bg-indigo-600" : "bg-slate-200",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
