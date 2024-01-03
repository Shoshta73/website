function loadProjectById(id: number | string) {
  let project;

  if (typeof id === "string") {
    project = sessionStorage.getItem(`project-${id}`)
  } else {
    id = id.toString();
    project = sessionStorage.getItem(`project-${id}`);
  }

  if (project === null) return project;
  return JSON.parse(project);
}

export default loadProjectById;
