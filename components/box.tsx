import {
  LegacyRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";

interface BoxType {
  id?: string;
  block?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: object;
  refA?: LegacyRef<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  dangerouslySetInnerHTML?: { __html: string | TrustedHTML };
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export const Box = ({
  block = false,
  className,
  children,
  onClick,
  refA,
  onKeyDown,
  ...params
}: BoxType) => {
  return (
    <div
      ref={refA}
      className={`${!block && "flex"} ${onClick && "cursor-pointer"} ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...params}
    >
      {children}
    </div>
  );
};
