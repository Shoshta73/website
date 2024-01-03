import { useEffect, useState } from "react";

import { supabaseClient } from "@Clients";

import { Project } from "@Types/custom.supabase.ts";
import { PostgrestError } from "@supabase/supabase-js";

function useProject(id: number, shouldFetch?: boolean) {
  const [ project, setProject ] = useState<Project>({
    description: "",
    details: {
      tech: [],
      skills: [],
      languages: [],
    },
    id: 0,
    image_url: "",
    name: "",
    planned: false,
    previewable: false,
    version: "",
  });
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<PostgrestError | unknown | null>();

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await supabaseClient.getProjectById(id)
        if (!response.ok) {
          const error: PostgrestError = await response.json();
          setError(error);
          setIsLoading(false);
          return;
        }

        const project: Project = await response.json();
        setProject(project)
      } catch (error) {
        setError(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    if(shouldFetch) getProject()
  }, [shouldFetch]);

  return {project, isLoading, error};
}

export default useProject
