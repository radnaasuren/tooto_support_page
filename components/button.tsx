import { ReactEventHandler, ReactNode } from "react";

interface ButtonParams {
  children: ReactNode;
  className?: string;
  onClick?: ReactEventHandler;
}

export const Button = ({ children, onClick, className }: ButtonParams) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};
