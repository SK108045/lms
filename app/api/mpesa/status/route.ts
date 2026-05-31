import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const checkoutRequestId = searchParams.get("checkoutRequestId");
  const courseId = searchParams.get("courseId");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!checkoutRequestId) {
    return NextResponse.json({ error: "Missing checkoutRequestId" }, { status: 400 });
  }

  const { data: transaction } = await supabase
    .from("mpesa_transactions")
    .select("result_code, result_desc, mpesa_receipt_number, payment:payments(status, user_id, course_id)")
    .eq("checkout_request_id", checkoutRequestId)
    .single();

  if (!transaction) {
    return NextResponse.json({ status: "pending" });
  }

  if (transaction.result_code === null) {
    return NextResponse.json({ status: "pending" });
  }

  if (transaction.result_code === 0) {
    return NextResponse.json({ status: "completed" });
  }

  return NextResponse.json({
    status: "failed",
    message: transaction.result_desc || "Payment was not completed",
  });
}
