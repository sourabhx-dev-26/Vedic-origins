"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendOtp = async () => {
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        console.error("Send OTP error:", error);
        if (error.message.includes("rate limit") || error.message.includes("too many")) {
          setError("Too many attempts. Please wait before resending.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        return;
      }

      setStep("otp");
      setResendCountdown(60);
      setSuccess("Login code sent! Check your inbox (and spam folder).");
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (otp.length !== 8 || !/^\d+$/.test(otp)) {
      setError("OTP code must be 8 digits");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        console.error("Verify OTP error:", error);
        if (error.message.includes("expired")) {
          setError("Invalid or expired code. Please try again.");
        } else if (error.message.includes("invalid")) {
          setError("Invalid or expired code. Please try again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        return;
      }

      if (data.user) {
        setSuccess("Logged in successfully! Redirecting...");
        setTimeout(() => {
          router.push(redirectTo);
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setStep("email");
    setOtp("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Branding */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🕉️</div>
        <h1 className="text-2xl font-serif font-bold text-darkBrown">
          Vedic Origins
        </h1>
        <p className="text-secondary text-sm mt-1">Pure. Authentic. Traditional.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-primary">
        <h2 className="text-xl font-serif font-bold text-darkBrown mb-1">
          {step === "email" ? "Welcome Back" : "Enter Login Code"}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {step === "email"
            ? "Sign in or create an account with your email"
            : `We sent an 8-digit code to ${email}`}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {success}
          </div>
        )}

        {step === "email" ? (
          <div className="space-y-4">
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
              autoFocus
              autoComplete="email"
            />
            <Button
              onClick={handleSendOtp}
              loading={loading}
              className="w-full"
            >
              Send Login Code
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              id="otp"
              label="8-Digit Login Code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="12345678"
              maxLength={8}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
              autoFocus
              autoComplete="one-time-code"
            />
            <Button
              onClick={handleVerifyOtp}
              loading={loading}
              className="w-full"
            >
              Verify &amp; Login
            </Button>
            <div className="text-center text-sm text-gray-500">
              {resendCountdown > 0 ? (
                <span>Resend code in {resendCountdown}s</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-primary underline hover:text-orange-600"
                >
                  Resend Code
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setStep("email");
                setOtp("");
                setError("");
                setSuccess("");
              }}
              className="w-full text-sm text-gray-400 hover:text-gray-600 underline text-center"
            >
              Change email address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
