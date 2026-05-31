"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle, AlertCircle, Smartphone } from "lucide-react";

interface MpesaPaymentFormProps {
  courseId: string;
  courseSlug: string;
  amount: number;
  defaultPhone: string;
  userId: string;
}

export function MpesaPaymentForm({
  courseId,
  courseSlug,
  amount,
  defaultPhone,
  userId,
}: MpesaPaymentFormProps) {
  const [phone, setPhone] = useState(defaultPhone || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");

  const formatPhone = (raw: string) => {
    // Convert 07xx to 2547xx
    let cleaned = raw.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "254" + cleaned.slice(1);
    if (!cleaned.startsWith("254")) cleaned = "254" + cleaned;
    return cleaned;
  };

  const handlePay = async () => {
    if (!phone) {
      setMessage("Please enter your M-Pesa phone number");
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const formattedPhone = formatPhone(phone);
      const res = await fetch("/api/mpesa/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formattedPhone,
          amount,
          courseId,
          userId,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setStatus("error");
        setMessage(data.error || "Payment initiation failed. Please try again.");
        setLoading(false);
        return;
      }

      setCheckoutRequestId(data.checkoutRequestId);
      setStatus("pending");
      setMessage(
        `A payment prompt has been sent to ${phone}. Enter your M-Pesa PIN to complete the payment.`
      );
      setLoading(false);

      // Poll for payment status
      pollPaymentStatus(data.checkoutRequestId);
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (reqId: string) => {
    const maxAttempts = 20;
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setStatus("error");
        setMessage(
          "Payment confirmation timed out. If you completed the payment, please contact support."
        );
        return;
      }

      attempts++;

      try {
        const res = await fetch(`/api/mpesa/status?checkoutRequestId=${reqId}&courseId=${courseId}`);
        const data = await res.json();

        if (data.status === "completed") {
          setStatus("success");
          setMessage("Payment successful! Redirecting to your course...");
          setTimeout(() => {
            window.location.href = `/my-learning/${courseSlug}`;
          }, 2000);
          return;
        }

        if (data.status === "failed") {
          setStatus("error");
          setMessage(data.message || "Payment was cancelled or failed. Please try again.");
          return;
        }

        // Still pending — poll again in 3 seconds
        setTimeout(poll, 3000);
      } catch {
        setTimeout(poll, 3000);
      }
    };

    setTimeout(poll, 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      {status === "success" && (
        <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm">{message}</p>
        </div>
      )}

      {status === "pending" && (
        <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          <Spinner className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm">{message}</p>
        </div>
      )}

      {status !== "success" && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">M-Pesa Phone Number</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="0712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                disabled={loading || status === "pending"}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the Safaricom number registered for M-Pesa
            </p>
          </div>

          <Button
            onClick={handlePay}
            disabled={loading || status === "pending"}
            className="w-full gap-2 bg-green-600 hover:bg-green-700"
            size="lg"
          >
            {loading ? (
              <Spinner className="size-4" />
            ) : (
              <>
                <Smartphone className="size-4" />
                {status === "pending" ? "Waiting for payment..." : `Pay KES ${amount.toLocaleString()}`}
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            You will receive an M-Pesa prompt on your phone. Enter your PIN to
            confirm.
          </p>
        </>
      )}
    </div>
  );
}
