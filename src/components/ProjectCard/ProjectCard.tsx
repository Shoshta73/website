import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  name: string;
  image_url: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ id, name, image_url }) => {
  const navigate = useNavigate();

  return (
    <div
      className="project-card"
      onClick={() => {
        if (sessionStorage.getItem("first_visited") !== null) {
          sessionStorage.removeItem("first_visited");
          sessionStorage.setItem("first_visited", id.toString());
        } else {
          sessionStorage.setItem("first_visited", id.toString());
        }
        navigate(`/projects/${id}`);
      }}
    >
      <div
        style={{ backgroundImage: `url(${image_url})` }}
        className="bg-image"
      />
      <h1>{name}</h1>
    </div>
  );
};

export default memo(ProjectCard);
