import type { AiResult, CvData, EducationItem, ExperienceItem } from "./types";
import { analyzeCompanyFit } from "./companies";

const KNOWN_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "SQL",
  "Prisma",
  "Figma",
  "Tailwind",
  "GraphQL",
  "Docker",
  "Git",
  "Testing",
  "UI/UX",
  "REST API",
  "MongoDB",
  "PostgreSQL",
];

const ROLE_KEYWORDS: Record<string, string[]> = {
  frontend: ["React", "Next.js", "TypeScript", "Accessibility", "Testing"],
  backend: ["Node.js", "SQL", "API", "Database", "Security"],
  designer: ["Figma", "UI/UX", "Prototype", "Research", "Design system"],
  data: ["Python", "SQL", "Dashboard", "Analytics", "Modeling"],
};

export function splitItems(value = "") {
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function includes(text: string, word: string) {
  return text.toLowerCase().includes(word.toLowerCase());
}

function pickLines(lines: string[], pattern: RegExp, limit = 4) {
  return lines
    .filter((line) => pattern.test(line))
    .slice(0, limit)
    .join("\n");
}

export function extractCvFromText(text: string): Partial<CvData> {
  const clean = text.replace(/\s+/g, " ").trim();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const email =
    clean.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const phone = clean.match(/(?:\+?\d[\s-]?){7,14}\d/)?.[0] ?? "";
  const link =
    clean.match(/https?:\/\/\S+|linkedin\.com\/\S+|github\.com\/\S+/i)?.[0] ??
    "";
  const name =
    lines.find((line) => !/[0-9@:/]|resume|cv|email|phone/i.test(line)) ?? "";
  const foundSkills = KNOWN_SKILLS.filter((skill) => includes(clean, skill));
  const experience = pickLines(
    lines,
    /(developer|engineer|designer|manager|intern|ажил|туршлага|компани|\b20\d{2}\b)/i,
    6,
  );
  const education = pickLines(
    lines,
    /(university|college|school|bachelor|master|degree|их сургууль|сургууль|бакалавр)/i,
  );
  return {
    name,
    email,
    phone,
    link,
    skills: foundSkills.join(", "),
    experience,
    education,
    summary: clean.slice(0, 260),
    cvText: text,
  };
}

function roleKeywords(role: string) {
  const lower = role.toLowerCase();
  const match = Object.entries(ROLE_KEYWORDS).find(([key]) =>
    lower.includes(key),
  );
  return (
    match?.[1] ?? ["Communication", "Problem solving", "Ownership", "Impact"]
  );
}

function filled(value: string) {
  return Boolean(value.trim());
}

function completion(values: string[]) {
  if (values.length === 0) return 0;
  return values.filter(filled).length / values.length;
}

function summaryCompletion(summary: string) {
  return filled(summary) ? 1 : 0;
}

function skillsCompletion(skills: string[]) {
  return skills.length > 0 ? 1 : 0;
}

function experienceCompletion(items: ExperienceItem[], legacyExperience: string) {
  const visibleItems = items.length ? items : [];
  if (visibleItems.length === 0) return filled(legacyExperience) ? 1 : 0;

  const itemScores = visibleItems.map((item) =>
    completion([
      item.jobTitle,
      item.companyName,
      item.address,
      item.startDate,
      item.endDate,
      item.functionsAchievements,
    ]),
  );

  return itemScores.reduce((sum, score) => sum + score, 0) / itemScores.length;
}

function educationCompletion(items: EducationItem[], legacyEducation: string) {
  const visibleItems = items.length ? items : [];
  if (visibleItems.length === 0) return filled(legacyEducation) ? 1 : 0;

  const itemScores = visibleItems.map((item) =>
    completion([
      item.level,
      item.schoolName,
      item.address,
      item.startDate,
      item.endDate,
    ]),
  );

  return itemScores.reduce((sum, score) => sum + score, 0) / itemScores.length;
}

function atsScore(cv: CvData, skills: string[]) {
  const profileScore =
    completion([
      cv.name,
      cv.title,
      cv.targetRole,
      cv.email,
      cv.phone,
      cv.location,
      cv.link,
    ]) * 39;

  const score =
    profileScore +
    summaryCompletion(cv.summary) * 14 +
    skillsCompletion(skills) * 14 +
    experienceCompletion(cv.experiences, cv.experience) * 18 +
    educationCompletion(cv.educations, cv.education) * 15;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function buildAiResult(cv: CvData, cvText = ""): AiResult {
  const skills = splitItems(cv.skills);
  const text = `${cv.summary} ${cv.experience} ${cv.projects} ${cvText}`;
  const hasMetric = /\b\d+%|\b\d+x|\b\d+\+|\b\d{2,}\b/.test(text);
  const hasExperience =
    filled(cv.experience) ||
    cv.experiences.some((item) =>
      [
        item.jobTitle,
        item.companyName,
        item.address,
        item.startDate,
        item.endDate,
        item.functionsAchievements,
      ].some(filled),
    );
  const hasEducation =
    filled(cv.education) ||
    cv.educations.some((item) =>
      [item.level, item.schoolName, item.address, item.startDate, item.endDate].some(filled),
    );
  
  const advice = [
    !cv.summary && "Summary хэсэгт 2-3 өгүүлбэрээр гол үнэ цэнээ бич.",
    !hasMetric && "Ажлын үр дүнгээ тоо, хувь, хугацаа эсвэл хэмжүүртэй болго.",
    skills.length < 5 &&
      "Target role-д таарах 6-10 ур чадварыг түлхүүр үгээр нэм.",
    !hasExperience &&
      "Сүүлийн ажлын туршлагаа role, company, impact хэлбэрээр оруул.",
    !hasEducation && "Боловсролын мэдээллээ түвшин, сургууль, хугацаатай нь бөглө.",
    !cv.email && "Recruiter шууд холбогдох имэйл заавал харагдах ёстой.",
  ].filter(Boolean) as string[];

  const keywords = [
    ...new Set([...roleKeywords(cv.targetRole), ...skills]),
  ].slice(0, 8);

  const score = atsScore(cv, skills);

  const role = cv.targetRole || cv.title || "сонгосон ажлын байр";
  const improvedSummary =
    cv.summary ||
    `${role}-д чиглэсэн, хэрэглэгчийн асуудлыг ойлгож шийдэл гаргах чадвартай мэргэжилтэн.`;

  const companyFits = analyzeCompanyFit(cv.skills, cv.targetRole);
  const topCompanies = companyFits
    .filter((fit) => fit.score >= 30)
    .slice(0, 5)
    .map((fit) => ({
      id: fit.company.id,
      name: fit.company.name,
      score: fit.score,
      matchedSkills: fit.company.skills.filter((skill) =>
        cv.skills.toLowerCase().includes(skill.toLowerCase()),
      ),
    }));

  return {
    score,
    improvedSummary,
    advice: advice.length
      ? advice
      : [
          "CV бүтэц сайн байна. Одоо role-specific keywords болон хэмжигдэхүйц impact нэмэхэд анхаар.",
        ],
    keywords,
    interview: [
      `${role}-д хамгийн ойр 2 төслөө STAR аргаар тайлбарла.`,
      `Сул тал асуувал сайжруулсан бодит жишээтэй хариул.`,
      `${keywords[0] ?? "гол skill"} ашиглаж шийдсэн асуудлаа 60 секундэд ярь.`,
    ],
    notes:
      "Local AI fallback ашигласан. OPENAI_API_KEY нэмбэл илүү нарийвчилсан дүн шинжилгээ авна.",
    topCompanies,
  };
}
