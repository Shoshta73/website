import { Project } from "@Types/custom.supabase.ts";

async function saveProjectById(projects: Project[]) {
  for (const project of projects) {
    sessionStorage.setItem(`project-${project.id.toString()}`, JSON.stringify(project));
  }
}

export default saveProjectById
