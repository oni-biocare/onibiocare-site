import { DOSE_SECTION_ORDER } from "@/lib/dose/constants";
import CuteDoseQuestionClient from "./CuteDoseQuestionClient";

export async function generateStaticParams() {
    const sections = DOSE_SECTION_ORDER;
    const qs = [1, 2, 3, 4, 5, 6];
    return sections.flatMap((section) =>
        qs.map((q) => ({ section, q: String(q) })),
    );
}

export default async function CuteDoseQuestionPage({
    params,
}: {
    params: Promise<{ section: string; q: string }>;
}) {
    const { section, q } = await params;
    return <CuteDoseQuestionClient section={section} q={q} />;
}
