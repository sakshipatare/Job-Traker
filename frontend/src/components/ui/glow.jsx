import React from "react";
import { cn } from "../../lib/utils";

const Glow = React.forwardRef(
  ({ className, variant = "top", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute w-full", getVariantPosition(variant), className)}
        {...props}
      >
        {/* Large Glow */}
        <div
          className={cn(
            "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.4)_10%,_transparent_60%)] sm:h-[512px]",
            variant === "center" && "-translate-y-1/2"
          )}
        />

        {/* Small Glow */}
        <div
          className={cn(
            "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(217,70,239,0.3)_10%,_transparent_60%)] sm:h-[256px]",
            variant === "center" && "-translate-y-1/2"
          )}
        />
      </div>
    );
  }
);

function getVariantPosition(variant) {
  switch (variant) {
    case "above":
      return "-top-[128px]";
    case "bottom":
      return "bottom-0";
    case "below":
      return "-bottom-[128px]";
    case "center":
      return "top-1/2";
    default:
      return "top-0";
  }
}

Glow.displayName = "Glow";

export { Glow };