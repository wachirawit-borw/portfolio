import AnimateOnScroll from "@/components/AnimateOnScroll";

const experiences = [
  {
    role: "AI Prompt Evaluator (for Meta)",
    company: "Appen Contract",
    duration: "June 2025 - Present",
    description: [
      "Evaluated over 160 AI-generated prompts per hour for health and religion related violations, consistently achieving a quality score above 90%.",
      "Applied a structured violation taxonomy to produce standardized rationales, enabling an average handle time (AHT) of just 22 seconds per task.",
      "Partnered with policy leads to streamline escalation workflows and reduce backlog of edge-case content.",
    ],
  },
  {
    role: "LLM Output Evaluator",
    company: "Prompt & Intent Evaluation",
    duration: "June 2025 - Present",
    description: [
      "Benchmarked Thai / English LLM responses for fluency, factuality, and intent alignment.",
      "Delivered actionable feedback on tone, cultural nuance, and safety, directly informing model retraining cycles.",
      "Authored prompt-clarity guidelines later adopted across the evaluator team.",
    ],
  },
  {
    role: "Ad Quality Rater (for Meta)",
    company: "Appen Contract",
    duration: "April 2025 - June 2025",
    description: [
      "Screened 250+ Facebook & Instagram ads per shift for policy compliance, maintaining >80% audit accuracy.",
      "Flagged high-risk ads (misinformation, gambling, etc.) and initiated rapid takedown requests.",
      "Escalated borderline cases with concise rationales, accelerating secondary reviews.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen container mx-auto py-16 md:py-24 px-6 flex flex-col items-center backdrop-blur-sm rounded-xl my-20"
    >
      <AnimateOnScroll>
        <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-800">
          Work Experience
        </h2>
      </AnimateOnScroll>

      <div className="relative w-full max-w-4xl">
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 h-full w-1 bg-[#828282]"></div>

        {experiences.map((exp, index) => (
          <AnimateOnScroll key={index}>
            <div className="relative pl-10 md:pl-0 mb-16">
              <div className="md:grid md:grid-cols-2 gap-8 items-start">
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-2 border-card-background top-3"></div>

                <div className="text-right md:pr-8">
                  <h3 className="font-bold text-xl text-accent">{exp.role}</h3>
                  <p className="text-muted-foreground mt-1">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {exp.duration}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 md:pl-8">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground break-words">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
