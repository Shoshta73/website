export type Project = {
  description: string | null;
  details: Details;
  id: number;
  image_url: string;
  name: string;
  planned: boolean | null;
  previewable: boolean | null;
  version: string | null;
};

export type Details = {
  tech: string[];
  skills: string[];
  languages: string[];
};
