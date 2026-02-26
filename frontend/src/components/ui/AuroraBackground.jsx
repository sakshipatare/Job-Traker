import React from "react";

export const AuroraBackground = ({
  children,
  className = "",
  showRadialGradient = true,
}) => {
  return (
    <div
      className={`relative flex min-h-screen items-center justify-center bg-zinc-950 ${className}`}
    >
      {/* Aurora Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute -inset-[10px] opacity-50 blur-[10px]
            [background-image:repeating-linear-gradient(100deg,#6366f1_10%,#a5b4fc_15%,#7c3aed_20%,#c4b5fd_25%,#6366f1_30%)]
            [background-size:300%_200%]
            animate-[aurora_8s_linear_infinite]
            ${showRadialGradient ? "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]" : ""}
          `}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes aurora {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
};