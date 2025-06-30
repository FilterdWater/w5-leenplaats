import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/js/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/js/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/js/components/ui/popover.tsx";
import type { Category } from "../models/category";
import { cn } from "../lib/utils";

interface MultiCategoryDropdownProps {
  selectedIds: number[];
  categories: Category[];
  onChange: (selectedIds: number[]) => void;
}

export function MultiCategoryDropdown({
  selectedIds,
  categories,
  onChange,
}: MultiCategoryDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const toggleCategory = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const selectedLabels = categories
    .filter((c) => selectedIds.includes(c.id))
    .map((c) => c.name)
    .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedIds.length > 0 ? selectedLabels : "Select categories..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => toggleCategory(category.id)}
                >
                  {category.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedIds.includes(category.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
