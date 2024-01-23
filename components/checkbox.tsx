import { Dispatch, SetStateAction } from "react";
import { Button, Text } from ".";

interface CheckBoxProps {
  value: string;
  selectedValue: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const CheckBox = ({ value, selectedValue, setValue }: CheckBoxProps) => {
  return (
    <Button
      className="flex items-center gap-2.5"
      onClick={() => setValue(value)}
    >
      {selectedValue == value ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={13}
          height={14}
          fill="none"
        >
          <path
            fill="#91B669"
            fillRule="evenodd"
            d="M0 7.324c0-1.756.685-3.44 1.904-4.681A6.44 6.44 0 0 1 6.5.703a6.44 6.44 0 0 1 4.596 1.94A6.683 6.683 0 0 1 13 7.324c0 1.756-.685 3.44-1.904 4.681a6.44 6.44 0 0 1-4.596 1.94 6.44 6.44 0 0 1-4.596-1.94A6.683 6.683 0 0 1 0 7.324Zm6.13 2.834L9.87 5.393l-.676-.551-3.19 4.061-2.261-1.918-.555.678 2.94 2.495Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={13}
          height={14}
          fill="none"
        >
          <path
            fill="#E0E0E0"
            fillRule="evenodd"
            d="M0 7.324c0-1.756.685-3.44 1.904-4.681A6.44 6.44 0 0 1 6.5.703a6.44 6.44 0 0 1 4.596 1.94A6.683 6.683 0 0 1 13 7.324c0 1.756-.685 3.44-1.904 4.681a6.44 6.44 0 0 1-4.596 1.94 6.44 6.44 0 0 1-4.596-1.94A6.683 6.683 0 0 1 0 7.324Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <Text
        className={`text-xs ${selectedValue == value ? "text-sec" : "text-field"}`}
      >
        {value}
      </Text>
    </Button>
  );
};
