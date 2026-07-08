"use client";

import * as React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function AuthListener() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const triggered = React.useRef("");

  React.useEffect(() => {
    const login = searchParams.get("login");
    const role = searchParams.get("role");
    const key = `${login}-${role}`;

    if (login === "success" && role && triggered.current !== key) {
      triggered.current = key;

      toast({
        title: "Welcome back!",
        description: `Successfully signed in as ${role}.`,
      });

      // Clear the query parameters from the address bar for clean UX
      const params = new URLSearchParams(searchParams.toString());
      params.delete("login");
      params.delete("role");
      const query = params.toString();
      const cleanUrl = `${pathname}${query ? `?${query}` : ""}`;
      
      // Delay slightly to ensure browser completes initial render
      const timer = setTimeout(() => {
        router.replace(cleanUrl);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchParams, pathname, router, toast]);

  return null;
}
