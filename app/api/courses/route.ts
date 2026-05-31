import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const offset = parseInt(url.searchParams.get("offset") || "0");

  let query = supabase
    .from("courses")
    .select(
      `
      *,
      instructor:profiles!courses_instructor_id_fkey(id, full_name, avatar_url),
      category:categories(id, name, slug)
      `,
      { count: "exact" }
    )
    .eq("status", "published");

  if (category) {
    query = query.eq("category_id", category);
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data: courses, count, error } = await query
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    {
      courses,
      total: count,
      limit,
      offset,
    },
    { status: 200 }
  );
}
