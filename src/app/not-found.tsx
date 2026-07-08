import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-extrabold tracking-tight text-accent font-heading">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">The page you are looking for does not exist.</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">
          It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-8">
          <Button asChild variant="brand" size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
