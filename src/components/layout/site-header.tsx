import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { getSession } from "@/server/auth/session";
import { logoutAction } from "@/server/actions/auth-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

/**
 * Global header. Server component — reads the session and reflects the user's
 * role. UI gating here is convenience only; the server enforces access.
 */
export async function SiteHeader() {
  const user = await getSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform hover:scale-[1.02]"
        >
          <Logo className="size-8 shrink-0" />
          <span className="font-heading text-lg font-bold tracking-tight">Page Studio</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <MobileNav />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/preview/home">Preview</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/studio/home">Studio</Link>
          </Button>
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-muted-foreground sm:inline">{user.name}</span>
              <Badge variant="secondary" className="hidden capitalize min-[375px]:inline-flex">
                {user.role}
              </Badge>
              <form action={logoutAction}>
                <Button type="submit" variant="outline" size="sm">
                  <LogOut aria-hidden />
                  <span className="sr-only sm:not-sr-only">Sign out</span>
                </Button>
              </form>
            </div>
          ) : (
            <Button asChild size="sm" variant="brand">
              <Link href="/login">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
