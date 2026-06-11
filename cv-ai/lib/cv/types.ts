export type TemplateId = "classic" | "modern" | "compact";

export type CvData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  link: string;
  targetRole: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
  cvText: string;
  template: TemplateId;
};

export type CompanyFit = {
  id: string;
  name: string;
  score: number;
  matchedSkills: string[];
};

export type AiResult = {
  score: number;
  improvedSummary: string;
  advice: string[];
  keywords: string[];
  interview: string[];
  notes: string;
  topCompanies?: CompanyFit[];
};

export const blankCv: CvData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  link: "",
  targetRole: "Frontend Developer",
  summary: "",
  skills: "",
  experience: "",
  education: "",
  projects: "",
  cvText: "",
  template: "modern",
};

export const templates: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "compact", label: "Compact" },
];
