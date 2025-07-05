import AnimateOnScroll from "@/components/AnimateOnScroll";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "ZURFRK Men's Shoes",
    description:
      "A landing page for a men's shoe brand, designed with a mobile-first approach. Features interactive elements and a clean, modern UI. The project was developed with a focus on semantic HTML, modern CSS, and interactive JavaScript, later refactored to a modular TypeScript structure.",
    imageUrl: "/pictures/zurfrk-shoes.webp",
    liveUrl: "https://zurfrk-landing-page.vercel.app",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript", "TypeScript", "React Prep"],
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full min-h-screen py-24 flex flex-col items-center my-8"
    >
      {/* [สำคัญ] เพิ่ม Wrapper Div นี้เข้ามา */}
      <div className="container mx-auto max-w-screen-lg px-6 w-full">
        <AnimateOnScroll>
          <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            My Projects
          </h2>
        </AnimateOnScroll>
        <div className="w-full space-y-12">
          {projects.map((project) => (
            <AnimateOnScroll key={project.title}>
              <ProjectCard project={project} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}