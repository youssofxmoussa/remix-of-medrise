import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { hasDemoSession } from "@/lib/demo-session";
import { SITE, publicHead } from "@/lib/seo";

const title = "BioVision — study platform for medical and science students";
const description =
  "BioVision turns a full first-year science curriculum into 13 focused subjects. Each one bundles the lecture video, the PDF notes and a quiz, with a streak that only counts real learning time.";

export const Route = createFileRoute("/")({
  head: () =>
    publicHead({
      title,
      description,
      path: "/",
      keywords: ["free study app", "first year university science", "lecture videos and notes"],
    }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate({ to: hasDemoSession() ? "/courses" : "/login", replace: true });
  }, [navigate]);

  return (
    <main
      className="flex min-h-[100dvh] items-center justify-center bg-background"
      aria-label={`Loading ${SITE.name}`}
    >
      <img
        src="/brand/biovision-logo.png"
        alt="BioVision logo"
        width={3200}
        height={2369}
        className="h-24 w-auto animate-pulse object-contain"
      />
    </main>
  );
}
