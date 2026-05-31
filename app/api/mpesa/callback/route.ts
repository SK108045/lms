import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const callback = body?.Body?.stkCallback;
  if (!callback) {
    return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
  }

  const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callback;

  // Find transaction
  const { data: transaction } = await supabase
    .from("mpesa_transactions")
    .select("*, payment:payments(*)")
    .eq("checkout_request_id", CheckoutRequestID)
    .single();

  if (!transaction) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  const success = ResultCode === 0;
  let mpesaReceiptNumber: string | null = null;
  let transactionDate: string | null = null;

  if (success && CallbackMetadata?.Item) {
    for (const item of CallbackMetadata.Item) {
      if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
      if (item.Name === "TransactionDate") {
        const raw = item.Value?.toString();
        if (raw) {
          // Format: YYYYMMDDHHmmss
          transactionDate = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}T${raw.slice(8, 10)}:${raw.slice(10, 12)}:${raw.slice(12, 14)}Z`;
        }
      }
    }
  }

  // Update M-Pesa transaction record
  await supabase
    .from("mpesa_transactions")
    .update({
      result_code: ResultCode,
      result_desc: ResultDesc,
      mpesa_receipt_number: mpesaReceiptNumber,
      transaction_date: transactionDate,
      updated_at: new Date().toISOString(),
    })
    .eq("checkout_request_id", CheckoutRequestID);

  // Update payment status
  const paymentStatus = success ? "completed" : "failed";
  await supabase
    .from("payments")
    .update({
      status: paymentStatus,
      transaction_id: mpesaReceiptNumber,
      updated_at: new Date().toISOString(),
    })
    .eq("id", transaction.payment_id);

  // If payment succeeded, create enrollment
  if (success && transaction.payment) {
    const payment = transaction.payment;

    const { data: existing } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", payment.user_id)
      .eq("course_id", payment.course_id)
      .single();

    if (!existing) {
      await supabase.from("enrollments").insert({
        user_id: payment.user_id,
        course_id: payment.course_id,
        status: "active",
        progress: "0",
      });
    }
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
