import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@Components";
import { useProjects } from "@Hooks";

import { loadProjects, loadProjectById } from "@Utils";

import { Project, Details } from "@Types/custom.supabase.ts";

function ProjectDisplay() {
  const [project, setProject] = useState<Project>();
  const [fetchFromDB, setFetchFromDB] = useState(false);
  const [details, setDetails ] = useState<Details>({tech: [], skills: [], languages: []});
  const { id } = useParams();
  const { projects, error, isLoading } = useProjects(fetchFromDB);

  useEffect(() => {
    const selectProject = (id: string) => {
      const proj = projects.find((project) => project.id === parseInt(id));
      if (proj !== undefined) {
        setProject(proj);
        setDetails(proj.details)
      }
    }

    const fetchProject = () => {
      const proj = loadProjectById(id ?? "")
      if (proj !== null) {
        setProject(proj);
        setDetails(proj.details)
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

  if (error) {
    console.error(error);
    // @ts-expect-error TODO fix type - check for error type
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="project">
      {isLoading && <Spinner />}
      {!isLoading && project && (
        <>
          <h1>{project.name}</h1>
          <img src={project.image_url} alt={project.name} />
          {details && (
          <>
            <p>
              <b>Skills: </b>
              {details.skills.map((skill, index) => (
                <span key={index}>{skill} </span>
              ))}
            </p>
            <p>
              <b>Technology: </b>
              {details.skills.map((skill, index) => (
                <span key={index}>{skill} </span>
              ))}
            </p>
            <p>
              <b>Languages: </b>
              {details.skills.map((skill, index) => (
                <span key={index}>{skill} </span>
              ))}
            </p>
          </>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectDisplay;
