import type { CvData } from "@/lib/cv/types";
import { TextArea } from "../FormBits";
import type { OnCvField } from "./types";

type Props = {
  cv: CvData;
  onField: OnCvField;
};

export function SummarySkillsSection({ cv, onField }: Props) {
  return (
    <>
      <TextArea
        label="SUMMARY /ТАНИЛЦУУЛГА/"
        field="summary"
        value={cv.summary}
        onField={onField}
      />
      <TextArea
        label="SKILLS /УР ЧАДВАР/"
        field="skills"
        value={cv.skills}
        onField={onField}
      />
    </>
  );
}
