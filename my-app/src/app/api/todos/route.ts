import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data));
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, completed: false }])
    .select();
  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data));
}

export async function PATCH(req: NextRequest) {
  const { id, completed } = await req.json();
  const { data, error } = await supabase
    .from("todos")
    .update({ completed })
    .eq("id", id)
    .select();
  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data));
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return new Response(error.message, { status: 500 });
  return new Response(null, { status: 204 });
}