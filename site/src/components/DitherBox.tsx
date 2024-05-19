import { ReactNode } from "react";
import { cn } from "~/frontendUtils";

interface DitherBoxProps {
  children?: ReactNode;
  title: string;
  className?: string;
}

export const DitherBox = ({ children, title, className }: DitherBoxProps) => {
  return (
    <fieldset
      className={cn(
        "border-2 border-black halftone-shadow p-[16px] bg-white",
        className,
      )}
    >
      <legend className="font-bold font-mono text-lg px-2">{title}</legend>
      {children}
    </fieldset>
  );
};
