import { Project } from "@Types/custom.supabase.ts";

async function saveProjects(projects: Project[], key?: string) {
  if (!key) {
    if (sessionStorage.getItem("projects")) {
      sessionStorage.removeItem("projects");
    }

    sessionStorage.setItem("projects", JSON.stringify(projects));
    return;
  }

  if (sessionStorage.getItem(key)) sessionStorage.removeItem(key);
  sessionStorage.setItem(key, JSON.stringify(projects));
}

export default saveProjects;
