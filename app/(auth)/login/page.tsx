import { Suspense } from "react";
import { LoginForm } from "./login-form";

function LoginSkeleton() {
  return (
    <div className="w-full max-w-md animate-pulse rounded-lg border border-border bg-card p-8">
      <div className="mb-4 h-14 w-14 rounded-xl bg-muted mx-auto" />
      <div className="mb-2 h-6 bg-muted rounded" />
      <div className="mb-6 h-4 bg-muted rounded w-2/3 mx-auto" />
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
