import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Daraja API helpers
async function getMpesaToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY!;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const res = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const data = await res.json();
  return data.access_token;
}

function getMpesaPassword(shortcode: string, passkey: string): { password: string; timestamp: string } {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
  return { password, timestamp };
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { phone, amount, courseId, userId } = await request.json();

  if (!phone || !amount || !courseId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const shortcode = process.env.MPESA_SHORTCODE || "174379"; // Daraja sandbox default
  const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com"}/api/mpesa/callback`;

  try {
    const token = await getMpesaToken();
    const { password, timestamp } = getMpesaPassword(shortcode, passkey);

    const res = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Math.ceil(amount),
          PartyA: phone,
          PartyB: shortcode,
          PhoneNumber: phone,
          CallBackURL: callbackUrl,
          AccountReference: `COURSE-${courseId.slice(0, 8).toUpperCase()}`,
          TransactionDesc: "Course Purchase",
        }),
      }
    );

    const data = await res.json();

    if (data.ResponseCode !== "0") {
      return NextResponse.json(
        { error: data.ResponseDescription || "M-Pesa initiation failed" },
        { status: 400 }
      );
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: userId,
        course_id: courseId,
        amount: amount.toString(),
        currency: "KES",
        status: "pending",
        payment_method: "mpesa",
      })
      .select()
      .single();

    if (paymentError || !payment) {
      return NextResponse.json({ error: "Failed to create payment record" }, { status: 500 });
    }

    // Store M-Pesa transaction
    await supabase.from("mpesa_transactions").insert({
      payment_id: payment.id,
      merchant_request_id: data.MerchantRequestID,
      checkout_request_id: data.CheckoutRequestID,
      phone_number: phone,
      amount: amount.toString(),
      account_reference: `COURSE-${courseId.slice(0, 8).toUpperCase()}`,
      transaction_desc: "Course Purchase",
    });

    return NextResponse.json({
      success: true,
      checkoutRequestId: data.CheckoutRequestID,
      merchantRequestId: data.MerchantRequestID,
    });
  } catch (err) {
    console.error("M-Pesa error:", err);
    return NextResponse.json({ error: "Payment service unavailable" }, { status: 500 });
  }
}
