import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark rounded-xl shadow-card hover:shadow-card-hover",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground rounded-xl",
      },
      size: {
        default: "h-11 sm:h-14 px-6 sm:px-8 text-base sm:text-lg [&_svg]:size-4 sm:[&_svg]:size-5",
        sm: "h-9 sm:h-11 px-4 sm:px-5 text-sm sm:text-base [&_svg]:size-4",
        lg: "h-12 sm:h-14 md:h-16 px-8 sm:px-10 md:px-12 text-base sm:text-lg md:text-xl [&_svg]:size-5 sm:[&_svg]:size-6",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };