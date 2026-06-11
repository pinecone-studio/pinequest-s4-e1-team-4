import type { LucideIcon } from "lucide-react";
import { FileText, Mic, ShieldCheck } from "lucide-react";

export const resumeSteps = [
  "CV эсвэл resume файлаа оруулна",
  "AI гол ур чадвар, туршлагыг тань ялгаж уншина",
  "Сайжруулсан товч, ойлгомжтой хувилбар бэлдэнэ",
];

export const interviewSteps = [
  "Сонгосон ажлын байртай тань таарсан асуулт асууна",
  "Хариултыг тань сонсоод шууд зөвлөгөө өгнө",
  "Давуу тал, сайжруулах хэсгийг энгийнээр тайлбарлана",
];

export const benefits: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: FileText,
    title: "Resume ойлгомжтой болно",
    text: "Ажил олгогч хурдан уншаад ойлгохоор бүтэц, үг хэллэгийг цэгцэлнэ.",
  },
  {
    icon: Mic,
    title: "Ярилцлагад дасгал хийнэ",
    text: "Бодит ярилцлага шиг асуулт, хариултаар өөртөө итгэлтэй болно.",
  },
  {
    icon: ShieldCheck,
    title: "Алхам бүр тодорхой",
    text: "Юу хийхээ мэдэхгүй гацахгүй. Дэлгэц дээрх бүх зүйл энгийн заавартай.",
  },
];

export const activityItems = [
  "CV оношилж байна",
  "Гол ур чадварыг ялгаж байна",
  "Ярилцлагын асуулт бэлдэж байна",
];
