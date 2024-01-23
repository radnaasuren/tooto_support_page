import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { Box } from "./box";

interface InputType {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  parentClassName?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export const Input = ({
  className,
  parentClassName,
  value,
  onChange,
  onKeyDown,
  ...props
}: InputType) => {
  return (
    <Box className={`rounded-md ${parentClassName} flex-col`}>
      <input
        className={"focus:outline-none " + className}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          onKeyDown && onKeyDown(e);
        }}
        {...props}
      />
    </Box>
  );
};
