import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@Components";
import { useProjects } from "@Hooks";

import { loadProjects, loadProjectById } from "@Utils";

import { Project } from "@Types/supabase.ts";

function ProjectDisplay() {
  const [project, setProject] = useState<Project>();
  const [fetchFromDB, setFetchFromDB] = useState(false);
  const { id } = useParams();
  const { projects, error, isLoading } = useProjects(fetchFromDB);

  useEffect(() => {
    const selectProject = (id: string) => {
      const proj = projects.find((project) => project.id === parseInt(id));
      if (proj !== undefined) {
        setProject(proj);
      }
    }

    const fetchProject = () => {
      const proj = loadProjectById(id ?? "")
      if (proj !== null) {
        setProject(proj);
        return
      }

      const projs = loadProjects()
      if (projs.length > 0) {
        selectProject(id ?? "")
        return
      } else{
        // If project is not found in local storage, fetch from database
        setFetchFromDB(true);
        return;
      }
    }
    if (id) fetchProject()
  }, [id, projects]);

  return (
    <div className="project">
      {isLoading && <Spinner />}
      {!isLoading && project && <div>{project.name}</div>}
    </div>
  );
}

export default ProjectDisplay;
