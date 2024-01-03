import { createClient } from "@supabase/supabase-js";
import { Database } from "@Types/supabase.ts";

const supabase = createClient<Database>(
  // @ts-expect-error Something is farting
  import.meta.env.VITE_SUPABASE_URL,
  // @ts-expect-error Something is farting
  import.meta.env.VITE_SUPABASE_KEY,
);

async function getProjects() {
  try {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) return new Response(JSON.stringify(error));

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}

async function getProjectById(id: number) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return new Response(JSON.stringify(error));

    console.log("supabase-client: data", data);
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}

export default { getProjects, getProjectById };
