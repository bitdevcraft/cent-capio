import { cn } from "@repo/ui/lib/utils";
import React from "react";

export function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl sm:text-6xl lg:text-9xl font-semibold",
        className
      )}
    />
  );
}

export function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cn(
        "text-3xl sm:text-5xl lg:text-7xl font-semibold",
        className
      )}
    />
  );
}
export function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        "text-2xl sm:text-4xl lg:text-6xl font-semibold",
        className
      )}
    />
  );
}
export function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      {...props}
      className={cn("text-xl sm:text-3xl lg:text-5xl font-semibold", className)}
    />
  );
}
export function H5({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      {...props}
      className={cn("text-lg sm:text-2xl lg:text-4xl font-semibold", className)}
    />
  );
}
export function H6({ className, ...props }: React.ComponentProps<"h6">) {
  return (
    <h6
      {...props}
      className={cn(
        "text-medium sm:text-xl lg:text-3xl font-semibold",
        className
      )}
    />
  );
}
