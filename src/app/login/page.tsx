import Link from "next/link";
import type { Metadata } from "next";
import { LogOut, LayoutDashboard, Sliders } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import { getSession } from "@/server/auth/session";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/server/actions/auth-actions";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const user = await getSession();

  return (
    <main
      id="main-content"
      className="relative isolate flex h-screen items-center justify-center overflow-hidden bg-[#080816] px-4 py-4"
    >
      {/* Premium background image generated directly */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-40 scale-105" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg')" }} 
      />
      <h1 className="sr-only">Sign in to Page Studio</h1>
      <Card className="w-full max-w-md border border-white/[0.08] bg-white/[0.04] shadow-2xl backdrop-blur-xl rounded-[24px]">
        <CardHeader className="text-center pb-2">
          <Link
            href="/"
            className="mx-auto mb-4 block size-14 transition-all hover:scale-105"
          >
            <Logo className="size-full" />
            <span className="sr-only">Page Studio home</span>
          </Link>
          <CardTitle className="text-3xl font-heading font-bold text-white tracking-tight">Welcome back!</CardTitle>
          <CardDescription className="text-white/60 mt-1">Sign in to access the Studio - Assignment</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {user ? (
            <div className="space-y-6">
              <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.02] p-5 text-center">
                <p className="text-sm text-white/50">You are currently signed in as:</p>
                <p className="mt-1.5 text-xl font-heading font-semibold capitalize text-white">{user.role}</p>
                <p className="text-xs text-white/40 mt-0.5">({user.name})</p>
              </div>

              <div className="space-y-3">
                <Button asChild variant="brand" className="w-full h-12 text-sm font-semibold">
                  <Link href="/studio/home">
                    Go to Page Studio <Sliders className="ml-2 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full h-12 text-sm font-semibold bg-white/5 text-white hover:bg-white/10 border-0">
                  <Link href="/">
                    Go to Dashboard <LayoutDashboard className="ml-2 size-4" aria-hidden />
                  </Link>
                </Button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/[0.08]"></div>
                <span className="flex-shrink mx-4 text-xs text-white/45">Or switch accounts</span>
                <div className="flex-grow border-t border-white/[0.08]"></div>
              </div>

              <form action={logoutAction}>
                <Button type="submit" variant="outline" className="w-full border-white/10 bg-transparent text-white hover:bg-white/5">
                  <LogOut className="mr-2 size-4" aria-hidden />
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <LoginForm from={from ?? "/"} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
