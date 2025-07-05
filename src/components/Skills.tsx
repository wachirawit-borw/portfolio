import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';

// ข้อมูลทักษะ (สามารถนำมาจากไฟล์ข้อมูลภายนอกได้)
const skillCategories = [
    {
        title: "FRONTEND",
        skills: ["Next.js", "React", "Tailwind", "Javascript", "TypeScript", "Framer Motion", "HTML5/CSS3"]
    },
    {
        title: "BACKEND",
        skills: ["Node.js", "Express & Prisma", "REST / GraphQL", "PostgreSQL", "MongoDB", "Supabase", "Redis"]
    },
    {
        title: "DEVOPS",
        skills: ["Docker", "GitHub Actions", "Vercel", "Render CI/CD", "Terraform/Kubernetes"]
    },
    {
        title: "TOOLS",
        skills: ["Git/GitHub", "Figma", "Chrome DevTools", "Postman/Insomnia"]
    }
];

export default function SkillsWithVideoBackground() {
    return (
        <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src="/videos/skills-bg.webm" type="video/webm" /> 
            </video>

            {/* Overlay (ปรับความโปร่งแสงได้ตามต้องการ) */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>

            {/* Skills Content */}
            <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center text-white">
                <AnimateOnScroll>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        My Tech Stack & Tools
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        A collection of technologies I am proficient in and tools I use to build and deploy web applications.
                    </p>

                    {/* Grid container for skill categories */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 text-left">
                        {skillCategories.map((category) => (
                            <div key={category.title}>
                                <h3 className="text-xl font-semibold tracking-wide text-blue-300 mb-5">{category.title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map(skill => (
                                        <div key={skill} className="bg-gray-800/50 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 text-sm font-medium">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}