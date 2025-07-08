"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import AnimateOnScroll from '@/components/AnimateOnScroll';

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
    const [canPlayVideo, setCanPlayVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const video = document.createElement("video");
        const support = video.canPlayType("video/webm");
        if (support === "probably" || support === "maybe") {
            setCanPlayVideo(true);
        }
    }, []);

    const handleVideoLoad = useCallback(() => {
        setIsVideoLoaded(true);
    }, []);

    return (
        <section id="skills" className="relative min-h-screen flex items-center justify-center py-24 sm:py-32 overflow-hidden">
            {/* Background: Video or fallback image */}
            {canPlayVideo ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={handleVideoLoad}
                    onError={() => setCanPlayVideo(false)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ minWidth: '100%', minHeight: '100%' }}
                >
                    <source src="/videos/skills-bg.webm" type="video/webm" />
                </video>
            ) : (
                <Image
                    src="/pictures/hero-image.webp"
                    alt="Skills section fallback background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            )}

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center text-white">
                <AnimateOnScroll>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        My Tech Stack & Tools
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        A collection of technologies I am proficient in and tools I use to build and deploy web applications.
                    </p>

                    {/* Skill categories */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 text-left">
                        {skillCategories.map(({ title, skills }) => (
                            <div key={title}>
                                <h3 className="text-xl font-semibold tracking-wide text-blue-300 mb-5">{title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(skill => (
                                        <div
                                            key={skill}
                                            className="bg-gray-800/50 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 text-sm font-medium"
                                        >
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
