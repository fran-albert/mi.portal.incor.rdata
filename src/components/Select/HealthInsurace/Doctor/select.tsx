import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { HealthInsurance } from "@/types/Health-Insurance/Health-Insurance";
import { useHealthInsurance } from "@/hooks/Health-Insurance/useHealthInsurance";

interface HealthInsuranceDoctorProps {
  selected?: HealthInsurance[];
  onHealthInsuranceChange?: (value: HealthInsurance[]) => void;
}

export const HealthInsuranceDoctorSelect = ({
  selected = [],
  onHealthInsuranceChange,
}: HealthInsuranceDoctorProps) => {
  const [selectedHealthInsurances, setSelectedHealthInsurances] = useState<
    HealthInsurance[]
  >([]);
  const { healthInsurances } = useHealthInsurance({});

  useEffect(() => {
    setSelectedHealthInsurances(selected);
  }, [selected]);

  const handleValueChange = (selectedItems: HealthInsurance[]) => {
    const newSelectedHealthInsurances = healthInsurances.filter(
      (healthInsurance) => selectedItems.includes(healthInsurance)
    );

    setSelectedHealthInsurances(newSelectedHealthInsurances);

    if (onHealthInsuranceChange) {
      onHealthInsuranceChange(newSelectedHealthInsurances);
    }
  };

  return (
    <div className="w-full">
      <Listbox
        value={selectedHealthInsurances}
        onChange={handleValueChange}
        multiple
      >
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full h-10 text-start text-popover-foreground cursor-default rounded-md border border-input bg-background px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <span className="block truncate">
                  {selected.length > 0
                    ? selected.map((s) => s.name).join(", ")
                    : "Seleccione las obra sociales..."}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 w-full max-h-60 overflow-auto py-1 rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {healthInsurances.map((healthInsurance) => (
                    <Listbox.Option
                      key={healthInsurance.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1.5 pl-8 pr-2 text-sm ${
                          active
                            ? "bg-accent text-popover-foreground"
                            : "text-popover-foreground"
                        }`
                      }
                      value={healthInsurance}
                    >
                      {({ active }) => {
                        // Revisa si la opción actual está seleccionada.
                        const isSelected = selectedHealthInsurances.some(
                          (si) => si.id === healthInsurance.id
                        );
                        return (
                          <>
                            <span
                              className={`block truncate ${
                                isSelected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {healthInsurance.name}
                            </span>
                            {isSelected && (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active
                                    ? "text-accent-foreground"
                                    : "text-popover-foreground"
                                }`}
                              >
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        );
                      }}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
