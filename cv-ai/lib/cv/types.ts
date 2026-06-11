export type TemplateId =
  | "classic"
  | "modern"
  | "compact"
  | "executive"
  | "new"
  | "european"
  | "ribbon"
  | "timeline";

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
  experiences: ExperienceItem[];
  education: string;
  educations: EducationItem[];
  projects: string;
  cvText: string;
  template: TemplateId;
};

export type ExperienceItem = {
  id: string;
  jobTitle: string;
  companyName: string;
  address: string;
  functionsAchievements: string;
  startDate: string;
  endDate: string;
};

export type EducationItem = {
  id: string;
  level: string;
  schoolName: string;
  address: string;
  startDate: string;
  endDate: string;
};

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `exp-${Date.now()}-${Math.random()}`;
}

export function createExperience(): ExperienceItem {
  return {
    id: createId(),
    jobTitle: "",
    companyName: "",
    address: "",
    functionsAchievements: "",
    startDate: "",
    endDate: "",
  };
}

export function isFilledExperience(item: ExperienceItem) {
  return Boolean(
    item.jobTitle.trim() ||
      item.companyName.trim() ||
      item.address.trim() ||
      item.functionsAchievements.trim() ||
      item.startDate ||
      item.endDate,
  );
}

export function serializeExperiences(items: ExperienceItem[]) {
  return items
    .filter(isFilledExperience)
    .map((item) => {
      const header = [item.jobTitle, item.companyName].filter(Boolean).join(" - ");
      const dates = [item.startDate, item.endDate].filter(Boolean).join(" to ");
      const details = [
        header,
        item.address,
        dates,
        item.functionsAchievements,
      ].filter(Boolean);

      return details.join(" | ");
    })
    .join("\n");
}

export function createEducation(): EducationItem {
  return {
    id: createId(),
    level: "",
    schoolName: "",
    address: "",
    startDate: "",
    endDate: "",
  };
}

export function isFilledEducation(item: EducationItem) {
  return Boolean(
    item.level.trim() ||
      item.schoolName.trim() ||
      item.address.trim() ||
      item.startDate ||
      item.endDate,
  );
}

export function serializeEducations(items: EducationItem[]) {
  return items
    .filter(isFilledEducation)
    .map((item) => {
      const dates = [item.startDate, item.endDate].filter(Boolean).join(" to ");
      return [item.level, item.schoolName, item.address, dates]
        .filter(Boolean)
        .join(" | ");
    })
    .join("\n");
}

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
  experiences: [createExperience()],
  education: "",
  educations: [createEducation()],
  projects: "",
  cvText: "",
  template: "modern",
};

export const templates: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "classic", label: "Classic" },
  { id: "compact", label: "Compact" },
  { id: "executive", label: "Executive" },
  { id: "new", label: "New" },
  { id: "european", label: "European" },
  { id: "ribbon", label: "Ribbon" },
  { id: "timeline", label: "Timeline" },
];
