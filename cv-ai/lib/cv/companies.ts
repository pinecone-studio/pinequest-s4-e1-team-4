export const TOP_COMPANIES = [
  {
    id: "google",
    name: "Google",
    skills: ["Python", "Java", "C++", "Go", "System Design", "Problem Solving"],
    roles: ["Software Engineer", "DevOps Engineer", "ML Engineer"],
  },
  {
    id: "meta",
    name: "Meta",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "GraphQL",
      "System Design",
      "Performance",
    ],
    roles: ["Frontend Engineer", "Full Stack Engineer", "Infrastructure"],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    skills: [
      "C#",
      "Azure",
      "TypeScript",
      ".NET",
      "Cloud Architecture",
      "Leadership",
    ],
    roles: ["Software Engineer", "Cloud Engineer", "DevOps"],
  },
  {
    id: "amazon",
    name: "Amazon",
    skills: [
      "AWS",
      "Java",
      "Python",
      "Scalability",
      "Leadership",
      "Operations",
    ],
    roles: ["Backend Engineer", "DevOps Engineer", "Solutions Architect"],
  },
  {
    id: "apple",
    name: "Apple",
    skills: [
      "Swift",
      "Objective-C",
      "iOS",
      "System Design",
      "Performance",
      "Security",
    ],
    roles: ["iOS Engineer", "Backend Engineer", "Hardware Engineer"],
  },
  {
    id: "netflix",
    name: "Netflix",
    skills: [
      "Java",
      "Scala",
      "Kotlin",
      "Microservices",
      "Performance",
      "Scalability",
    ],
    roles: ["Backend Engineer", "DevOps Engineer", "Full Stack"],
  },
  {
    id: "uber",
    name: "Uber",
    skills: [
      "Python",
      "Go",
      "Node.js",
      "Distributed Systems",
      "Geolocation",
      "Realtime",
    ],
    roles: ["Backend Engineer", "DevOps Engineer", "Data Engineer"],
  },
  {
    id: "airbnb",
    name: "Airbnb",
    skills: [
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "Design Systems",
      "Performance",
    ],
    roles: ["Frontend Engineer", "Full Stack Engineer", "Designer"],
  },
  {
    id: "stripe",
    name: "Stripe",
    skills: [
      "TypeScript",
      "Node.js",
      "React",
      "System Design",
      "Payment Systems",
      "Security",
    ],
    roles: ["Software Engineer", "Full Stack Engineer", "DevOps"],
  },
  {
    id: "discord",
    name: "Discord",
    skills: [
      "TypeScript",
      "React",
      "Rust",
      "WebSockets",
      "Performance",
      "Scalability",
    ],
    roles: ["Backend Engineer", "Frontend Engineer", "Fullstack"],
  },
];

export function analyzeCompanyFit(
  cvSkills: string,
  targetRole: string,
): { company: (typeof TOP_COMPANIES)[0]; score: number }[] {
  const skillsLower = cvSkills.toLowerCase();
  const roleLower = targetRole.toLowerCase();

  return TOP_COMPANIES.map((company) => {
    let score = 0;

    company.skills.forEach((skill) => {
      if (skillsLower.includes(skill.toLowerCase())) {
        score += 15;
      }
    });

    company.roles.forEach((role) => {
      if (roleLower.includes(role.split(" ")[0].toLowerCase())) {
        score += 10;
      }
    });

    return { company, score: Math.min(score, 100) };
  }).sort((a, b) => b.score - a.score);
}
