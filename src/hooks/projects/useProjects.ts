import { useEffect, useState } from "react";

import { supabaseClient } from "@Clients";

import { Project } from "@Types/supabase.ts";
import { PostgrestError } from "@supabase/supabase-js";
import { saveProjects } from "@Utils";
import saveProjectById from "@Utils/saveProjectById.ts";

export type TState = {
  projects: Project[];
  isLoading: boolean;
  error: null | PostgrestError | unknown;
};

function useProjects(shouldFetch?: boolean) {
  const [state, setState] = useState<TState>({
    projects: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await supabaseClient.getProjects()
        if (!response.ok) {
          const error: PostgrestError = await response.json();
          setState((prevState) => ({ ...prevState, error, isLoading: false }));
          return;
        }

        const projects: Project[] = await response.json();

        saveProjects(projects);
        saveProjectById(projects)

        setState({
          projects,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        setState((prevState) => ({ ...prevState, error, isLoading: false }));
      }
    };

    if (shouldFetch) getProjects();
    setState((prevState) => ({ ...prevState, isLoading: false }));
  }, [shouldFetch]);

  return state;
}

export default useProjects;
