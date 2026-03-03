import { DOSE_SECTION_ORDER } from "@/lib/dose/constants";
import DoseQuestionClient from "./DoseQuestionClient";

export async function generateStaticParams() {
  const sections = DOSE_SECTION_ORDER;
  const qs = [1, 2, 3, 4, 5, 6];

  return sections.flatMap((section) =>
    qs.map((q) => ({ section, q: String(q) })),
  );
}

export default function DoseQuestionPage({
  params,
}: {
  params: { section: string; q: string };
}) {
  return <DoseQuestionClient section={params.section} q={params.q} />;
}
