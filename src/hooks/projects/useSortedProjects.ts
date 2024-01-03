import { useEffect, useState } from "react";

import { supabaseClient } from "@Clients";
import { saveProjects } from "@Utils";

import { Project } from "@Types/custom.supabase.ts";
import { PostgrestError } from "@supabase/supabase-js";
import saveProjectById from "@Utils/saveProjectById.ts";

export type TState = {
  projects: Project[];
  previewable: Project[];
  nonPreviewable: Project[];
  planned: Project[];
  isLoading: boolean;
  error: null | PostgrestError | unknown;
};

function useSortedProjects() {
  const [state, setState] = useState<TState>({
    projects: [],
    previewable: [],
    nonPreviewable: [],
    planned: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const getSortedProjects = async () => {
      try {
        const response = await supabaseClient.getProjects();
        if (!response.ok) {
          const error: PostgrestError = await response.json();
          setState((prevState) => ({ ...prevState, error, isLoading: false }));
          return;
        }
        const projects: Project[] = await response.json();

        const previewable = projects.filter(
          (project: Project) => project.previewable,
        );
        const nonPreviewable = projects.filter(
          (project: Project) => !project.previewable && !project.planned,
        );
        const planned = projects.filter((project: Project) => project.planned);

        saveProjects(projects);
        saveProjectById(projects);

        setState({
          projects,
          previewable,
          nonPreviewable,
          planned,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState((prevState) => ({ ...prevState, error, isLoading: false }));
      }
    };

    getSortedProjects();
  }, []);

  return state;
}

export default useSortedProjects;
