import { FC, memo } from "react";

import { ProjectCard, Spinner } from "@Components";
import { useSortedProjects } from "@Hooks";

import { Project } from "@Types/custom.supabase.ts";

import "./Projects.css";

interface ProjectGroup {
  title: string;
  projects: Project[];
}

const ProjectGroup: FC<ProjectGroup> = ({ title, projects }) => (
  <>
    <h2 className="project-title">{title}</h2>
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={`${project.name}-${project.version}`}
          id={project.id}
          name={project.name}
          image_url={project.image_url}
        />
      ))}
    </div>
  </>
);
const Projects = () => {
  const { previewable, nonPreviewable, planned, error, isLoading } =
    useSortedProjects();

  if (error) {
    console.error(error);
    // @ts-expect-error TODO fix type - check for error type
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="projects">
      <h1 className="projects-title">Personal Projects</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {previewable.length !== 0 && (
            <ProjectGroup
              title="Projects with Preview"
              projects={previewable}
            />
          )}
          {nonPreviewable.length !== 0 && (
            <ProjectGroup
              title="Projects without Preview"
              projects={nonPreviewable}
            />
          )}
          {planned.length !== 0 && (
            <ProjectGroup title="Planned Projects" projects={planned} />
          )}
        </>
      )}
    </div>
  );
};

export default memo(Projects);
