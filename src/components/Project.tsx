import AnimateOnScroll from "@/components/AnimateOnScroll";
import Image from "next/image";

const projects = [
  {
    title: "ZURFRK Men's Shoes",
    description: "A landing page for a men's shoe brand, designed with a mobile-first approach. Features interactive elements and a clean, modern UI. The project was developed with a focus on semantic HTML, modern CSS, and interactive JavaScript, later refactored to a modular TypeScript structure.",
    imageUrl: "https://image.thum.io/get/width/600/crop/400/https://zurfrk-landing-page.vercel.app/",
    liveUrl: "https://zurfrk-landing-page.vercel.app",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript", "TypeScript", "React Prep"]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen container mx-auto py-24 px-6 flex flex-col items-center bg-card-background/50 backdrop-blur-sm rounded-xl my-8">
      <AnimateOnScroll>
        <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">My Projects</h2>
      </AnimateOnScroll>

      <div className="w-full max-w-4xl mx-auto">
        {projects.map((project) => (
          <AnimateOnScroll key={project.title}>
            <div className="bg-card-background/60 border border-card-border rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
              <div className="md:w-1/2">
                 <Image src={project.imageUrl} alt={project.title} width={600} height={400} className="object-cover w-full h-full"/>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-accent">{project.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => <div key={tag} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</div>)}
                </div>
                <div className="mt-auto">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-accent text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                    View Live Site
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}