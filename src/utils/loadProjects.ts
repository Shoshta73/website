import { Project } from "@Types/supabase.ts";

function loadProjects() : Project[] {
  const savedProjects = sessionStorage.getItem("projects");
  if (savedProjects === null) return [];
  return JSON.parse(savedProjects)
}

export default loadProjects;
