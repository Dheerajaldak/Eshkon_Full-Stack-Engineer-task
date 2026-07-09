"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/server/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLES } from "@/core/auth/roles";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="default" className="w-full h-12 text-sm font-semibold bg-white text-[#080816] hover:bg-white/90 transition-colors" disabled={pending}>
      <LogIn className="size-4" aria-hidden />
      {pending ? "Signing in…" : "Sign in"}
    </Button>
  );
}

/**
 * Accessible login form (Brief §7: "Forms fully labelled + accessible errors").
 * Errors are announced via role="alert" and linked with aria-describedby.
 */
export function LoginForm({ from }: { from: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("editor");
  const [password, setPassword] = useState("editor");
  const errorId = "login-error";

  const handleQuickSelect = (role: string) => {
    setSelectedRole(role);
    setPassword(role);
  };

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <input type="hidden" name="from" value={from} />

      {/* Quick Select Buttons */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-white/80">Select a role to sign in:</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["viewer", "editor", "publisher"] as const).map((role) => {
            const isActive = selectedRole === role;
            return (
              <Button
                key={role}
                type="button"
                variant={isActive ? "default" : "outline"}
                onClick={() => handleQuickSelect(role)}
                className={`flex h-14 flex-col gap-0.5 text-xs capitalize transition-all duration-200 rounded-[14px] ${
                  isActive
                    ? "bg-white text-[#080816] hover:bg-white/90 border-0"
                    : "border-white/10 bg-white/[0.02] text-white hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="font-semibold">{role}</span>
                <span className={`text-[9px] opacity-80 ${isActive ? "text-[#080816]/70" : "text-white/40"}`}>
                  {role === "viewer"
                    ? "Preview Only"
                    : role === "editor"
                      ? "Edit Drafts"
                      : "Full Access"}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm text-white/80">Selected Role</Label>
        <div className="relative">
          <select
            id="role"
            name="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            aria-describedby={state.error ? errorId : undefined}
            className="flex h-11 w-full appearance-none rounded-full border border-white/10 bg-white/[0.04] pl-5 pr-10 py-2 text-sm text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#080816]"
          >
            {ROLES.map((role) => (
              <option key={role} value={role} className="capitalize bg-[#0b0c20] text-white">
                {role}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
            <svg className="size-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        <p className="text-xs text-white/50 leading-relaxed px-1">
          {selectedRole === "viewer" && "Viewers can inspect pages and navigate the layout, but cannot save edits."}
          {selectedRole === "editor" && "Editors can modify visual properties, add sections, and save layout drafts."}
          {selectedRole === "publisher" && "Publishers have full permissions to edit and release versioned snapshots."}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm text-white/80">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            aria-describedby={state.error ? errorId : "password-hint"}
            aria-invalid={state.error ? true : undefined}
            className="pr-10 h-11 rounded-full border border-white/10 bg-white/[0.04] text-white placeholder-white/30 px-4 focus-visible:ring-offset-[#080816]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#080816] rounded-full"
          >
            {showPassword ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        </div>
        <p id="password-hint" className="text-xs text-white/60 px-1">
         Password is automatically set for you. Just click <strong>Sign in</strong> below!
        </p>
      </div>

      {state.error ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-destructive px-1">
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
