import { useField } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ReactNode } from "react";

type FieldInputValue = {
  id: string;
};

type RenderOptionFn<T extends FieldInputValue> = (option: T) => ReactNode;

interface Props<T extends FieldInputValue, K extends keyof T> {
  name: string;
  values: T[];
  // For simple display values with no fancy styling or content
  displayKey?: K;
  // For more complex display values that require the use of a custom component
  renderOption?: RenderOptionFn<T>;
  placeholder: string;
}

type SelectDisplayProps<T extends FieldInputValue, K extends keyof T> = {
  item: T;
  displayKey?: K;
  renderOption?: RenderOptionFn<T>;
};

const SelectDisplay = <T extends FieldInputValue, K extends keyof T>({
  item,
  displayKey,
  renderOption,
}: SelectDisplayProps<T, K>) => {
  if (displayKey) {
    return <span>{String(item[displayKey])}</span>;
  }

  if (renderOption) {
    return renderOption(item);
  }

  console.warn("You should use either a displayKey or renderOption");
  // Fallback to something but this should never actually be rendered
  return <span>{String(item.id)}</span>;
};

export const SelectInput = <T extends FieldInputValue, K extends keyof T>({
  displayKey,
  renderOption,
  values,
  name,
  placeholder,
}: Props<T, K>) => {
  const [field] = useField<string>(name);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((item, index) => (
          <SelectItem {...field} value={item.id} key={index}>
            <SelectDisplay
              item={item}
              displayKey={displayKey}
              renderOption={renderOption}
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
