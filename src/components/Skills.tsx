import AnimateOnScroll from '@/components/AnimateOnScroll'

const keySkills = ["Next.js", "React", "Node.js", "Tailwind CSS", "TypeScript", "PostgreSQL", "Docker"];

export default function SkillsHighlight() {
    return (

        <section id="skills" className="py-24 sm:py-32 bg-card-background/50 backdrop-blur-sm rounded-xl my-8">
            <AnimateOnScroll>
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Core Skills</h2>
                    <p className="mt-4 text-lg text-muted-foreground">I leverage a modern tech stack to build high-quality, scalable web applications.</p>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {keySkills.map(skill => (
                            <div key={skill} className="bg-accent/10 border border-card-border text-accent rounded-lg px-4 py-2 text-sm font-medium">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </AnimateOnScroll>
        </section>
    );
}