import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Page Studio"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(217 91% 60%)" />
          <stop offset="1" stopColor="hsl(265 90% 60%)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
      
      {/* Visual representation of a modular layout page */}
      <rect x="7" y="7" width="13" height="13" rx="2" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1" />
      <rect x="12" y="12" width="13" height="13" rx="2" fill="white" stroke="white" strokeWidth="1" />
      
      {/* Stylized blocks inside the main/front canvas */}
      <rect x="15" y="15" width="7" height="2" rx="0.5" fill="#2563eb" />
      <rect x="15" y="19" width="3" height="3" rx="0.5" fill="#2563eb" fillOpacity="0.8" />
      <rect x="19" y="19" width="3" height="3" rx="0.5" fill="#2563eb" fillOpacity="0.8" />
    </svg>
  );
}
