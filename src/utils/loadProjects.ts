import { Project } from "@Types/custom.supabase.ts";

function loadProjects(): Project[] {
  const savedProjects = sessionStorage.getItem("projects");
  if (savedProjects === null) return [];
  return JSON.parse(savedProjects);
}

export default loadProjects;
