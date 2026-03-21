import { Checkbox, Popover } from "radix-ui";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "#/lib/utils";

type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  ariaLabel: string;
  className?: string;
  onValueChange: (values: string[]) => void;
  options: MultiSelectOption[];
  placeholder: string;
  value: string[];
};

export function MultiSelect({
  ariaLabel,
  className,
  onValueChange,
  options,
  placeholder,
  value,
}: MultiSelectProps) {
  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);

  const triggerLabel = selectedLabels.length === 0 ? placeholder : selectedLabels.join(", ");

  const toggleValue = (nextValue: string) => {
    const nextValues = value.includes(nextValue)
      ? value.filter((item) => item !== nextValue)
      : [...value, nextValue];

    onValueChange(nextValues);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            "flex min-w-40 items-center justify-between gap-2 border border-(--line) bg-transparent px-3 py-2 text-left text-sm text-(--sea-ink)",
            className,
          )}
        >
          <span className="truncate">{triggerLabel}</span>
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-(--sea-ink-soft)" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="end"
          className="z-50 w-56 border border-(--line) bg-[color-mix(in_oklab,var(--surface-strong)_94%,white_6%)] p-1 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md"
        >
          <div className="flex flex-col">
            {options.map((option) => {
              const checked = value.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleValue(option.value)}
                  className="flex items-center gap-2 px-2 py-2 text-sm text-(--sea-ink) hover:bg-(--link-bg-hover)"
                >
                  <Checkbox.Root
                    checked={checked}
                    className="flex h-4 w-4 items-center justify-center border border-(--line) data-[state=checked]:border-(--lagoon-deep) data-[state=checked]:bg-(--lagoon-deep) data-[state=checked]:text-white"
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="h-3 w-3" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
