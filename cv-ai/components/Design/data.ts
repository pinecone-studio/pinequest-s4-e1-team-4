import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CircleDollarSign,

  GraduationCap,
  Hammer,
  HardHat,
  HeartPulse,

  Scale,

  UtensilsCrossed,
} from "lucide-react";
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

  title: string;
  text: string;
}> = [
  {

    title: "Resume ойлгомжтой болно",
    text: "Ажил олгогч хурдан уншаад ойлгохоор бүтэц, үг хэллэгийг цэгцэлнэ.",
  },
  {

    title: "Ярилцлагад дасгал хийнэ",
    text: "Бодит ярилцлага шиг асуулт, хариултаар өөртөө итгэлтэй болно.",
  },
  {

    title: "Алхам бүр тодорхой",
    text: "Юу хийхээ мэдэхгүй гацахгүй. Дэлгэц дээрх бүх зүйл энгийн заавартай.",
  },
];

export const benefitHighlights = [
  {
    value: "3 алхам",
    label: "Эхлэхэд ойлгомжтой",
  },
  {
    value: "Монгол",
    label: "Энгийн тайлбартай",
  },
  {
    value: "Шууд",
    label: "Зөвлөгөө авч болно",
  },
];

export const activityItems = [
];

export const jobIconTiles: Array<{
  icon: LucideIcon;
  label: string;
}> = [
  { icon: HeartPulse, label: "Эмч" },
  { icon: GraduationCap, label: "Багш" },
  { icon: Scale, label: "Хууль" },
  { icon: Building2, label: "Бизнес" },
  { icon: UtensilsCrossed, label: "Тогооч" },
  { icon: Hammer, label: "Инженер" },
  { icon: CircleDollarSign, label: "Санхүү" },
  { icon: HardHat, label: "Барилга" },
];
