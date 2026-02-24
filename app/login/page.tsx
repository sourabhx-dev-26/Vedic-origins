import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Spinner } from "@/components/ui/Spinner";

export const metadata = {
  title: "Login | Vedic Origins",
};

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 50%, #FFDEAD 100%)",
      }}
    >
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
