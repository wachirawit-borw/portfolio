import AnimateOnScroll from "@/components/AnimateOnScroll";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "ZURFRK Men's Shoes",
    description:
      "A premium landing page for a men's shoe brand, meticulously crafted with a mobile-first approach. Features sophisticated interactive elements, smooth animations, and a clean, modern UI that drives conversions. The project demonstrates expertise in semantic HTML, advanced CSS techniques, and interactive JavaScript, later refactored to a robust modular TypeScript structure.",
    imageUrl: "/pictures/zurfrk-shoes.webp",
    liveUrl: "https://zurfrk-landing-page.vercel.app",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript", "TypeScript", "React Prep"],
    techStack: ["Frontend", "Responsive Design", "UI/UX"],
    year: "2024",
    status: "Live",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full min-h-screen py-24 flex flex-col items-center my-8 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-cyan-50/20 dark:from-blue-950/10 dark:to-cyan-950/10 pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto max-w-6xl px-6 w-full relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400">
              My Projects
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="w-full space-y-16">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.title}>
              <ProjectCard project={project} index={index} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}