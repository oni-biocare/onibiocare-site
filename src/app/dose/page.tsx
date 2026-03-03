import { Button } from "@/components/ui/button";
import { DOSE_SECTION_ORDER } from "@/lib/dose/constants";
import Link from "next/link";

export default function DoseIntroPage() {
  const firstSection = DOSE_SECTION_ORDER[0];

  return (
    <main className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            D.O.S.E Questionnaire
          </h1>
          <p className="text-muted-foreground md:text-xl">
            A wellness-coaching tool to help you understand your current well-being
            profile.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          This tool is for self-reflection and coaching, not medical diagnosis.
          For each statement, choose the option that best describes your lived
          experience over the past few weeks.
        </p>
        <Button asChild size="lg">
          <Link href={`/dose/${firstSection}/1`}>Start Assessment</Link>
        </Button>
      </div>
    </main>
  );
}
