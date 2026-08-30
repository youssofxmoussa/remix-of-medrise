import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { hasDemoSession } from "@/lib/demo-session";
import { courses } from "@/lib/courses";
import {
  SITE,
  publicHead,
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  courseListSchema,
  softwareAppSchema,
  breadcrumbSchema,
  faqSchema,
  ANSWERS,
  KEY_FACTS,
  courseName,
} from "@/lib/seo";

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
      schemas: [
        organizationSchema(),
        webSiteSchema(),
        softwareAppSchema(),
        courseListSchema(),
        faqSchema(ANSWERS.map((a) => ({ q: a.question, a: a.answer }))),
        webPageSchema({
          title,
          description,
          path: "/",
          speakableSelectors: ["h1", ".lede", ".answer"],
        }),
        breadcrumbSchema([{ label: "Home", path: "/" }]),
      ],
    }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate({ to: hasDemoSession() ? "/courses" : "/login", replace: true });
  }, [navigate]);

  const semester1 = courses.filter((c) => c.semester === 1);
  const semester2 = courses.filter((c) => c.semester === 2);

  return (
    <main
      className="min-h-[100dvh] bg-background"
      aria-label={`Loading ${SITE.name}`}
    >
      {/* Crawlable content layer: search engines and AI answer engines
          read this while signed-out visitors are redirected to sign in. */}
      <div className="mx-auto w-full max-w-2xl px-5 py-10 safe-top">
        <header>
          <img
            src="/brand/biovision-logo.png"
            alt="BioVision logo — DNA helix rising into an arrow beside the BioVision wordmark"
            width={3200}
            height={2369}
            className="h-14 w-auto object-contain"
          />
          <h1 className="mt-6 text-[2rem] font-black leading-[1.1] tracking-tight sm:text-[2.5rem]">
            BioVision — study platform for medical and science students
          </h1>
          <p className="lede mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">What you get</h2>
          <ul className="mt-3 space-y-2 leading-relaxed text-muted-foreground">
            {KEY_FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Subjects — semester 1</h2>
          <ul className="mt-3 space-y-1 leading-relaxed text-muted-foreground">
            {semester1.map((c) => (
              <li key={c.id}>
                <strong className="text-foreground">{c.id.toUpperCase()}</strong> —{" "}
                {courseName(c.title)} · {c.credits} credits
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Subjects — semester 2</h2>
          <ul className="mt-3 space-y-1 leading-relaxed text-muted-foreground">
            {semester2.map((c) => (
              <li key={c.id}>
                <strong className="text-foreground">{c.id.toUpperCase()}</strong> —{" "}
                {courseName(c.title)} · {c.credits} credits
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Common questions</h2>
          <div className="mt-4 space-y-6">
            {ANSWERS.map((a) => (
              <div key={a.question}>
                <h3 className="text-base font-semibold">{a.question}</h3>
                <p className="answer mt-1 leading-relaxed text-muted-foreground">{a.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav aria-label="Site" className="mt-10 flex flex-wrap gap-4 text-[0.9375rem]">
          <Link to="/about" className="text-primary hover:underline">
            About BioVision
          </Link>
          <Link to="/faq" className="text-primary hover:underline">
            FAQ
          </Link>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </nav>
      </div>
    </main>
  );
}
