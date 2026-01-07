// app/template.tsx
"use client";

import GlobalTransition from "@/components/GlobalTransition/GlobalTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <GlobalTransition>
       {children}
    </GlobalTransition>
  );
}