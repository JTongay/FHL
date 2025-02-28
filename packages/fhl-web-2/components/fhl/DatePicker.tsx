import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, useField } from "formik";

interface Props {
  placeholder: string;
  className?: string;
  name: string;
}
export const DatePicker = ({ placeholder, className, name }: Props) => {
  // Get all three returns from useField - field, meta, and helpers
  const [field, meta, helpers] = useField<Date | undefined>(name);

  // Destructure the setters from helpers
  const { setValue } = helpers;

  // Custom handler for the Calendar's onSelect
  const handleSelect = (date: Date | undefined) => {
    setValue(date);
  };

  return (
    <div className="form-field">
      {/* Hidden input to connect with Formik */}
      <input
        type="hidden"
        {...field}
        value={field.value ? field.value.toISOString() : ""}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              `${className} justify-start text-left font-normal`,
              !field.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
