"use client";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
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
    const [isIntersecting, setIsIntersecting] = useState(false);
    
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // ตรวจสอบการรองรับวิดีโอ
    useEffect(() => {
        const video = document.createElement("video");
        const support = video.canPlayType("video/webm");
        if (support === "probably" || support === "maybe") {
            setCanPlayVideo(true);
        }
    }, []);

    // Intersection Observer สำหรับจัดการการเล่นวิดีโอ
    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                
                if (entry.isIntersecting) {
                    // เมื่อมองเห็น section ให้เล่นวิดีโอ
                    if (videoRef.current && videoRef.current.paused) {
                        videoRef.current.play().catch((err) => {
                            console.warn("Video play error:", err);
                        });
                    }
                } else {
                    // เมื่อไม่เห็น section ให้หยุดวิดีโอ (ถ้าต้องการประหยัดทรัพยากร)
                    // หรือปล่อยให้เล่นต่อไปถ้าไม่ต้องการให้หยุด
                    // if (videoRef.current && !videoRef.current.paused) {
                    //     videoRef.current.pause();
                    // }
                }
            },
            { 
                threshold: 0.3, // เริ่มเล่นเมื่อเห็น 30% ของ section
                rootMargin: '50px 0px' // เพิ่ม margin เพื่อให้เริ่มเล่นก่อนหน่อย
            }
        );

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, [canPlayVideo]);

    const handleVideoLoad = useCallback(() => {
        setIsVideoLoaded(true);
    }, []);

    // แก้ไข: ระบุ Type ของ error parameter ให้ถูกต้อง
    const handleVideoError = useCallback((error: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        console.error("Video error:", error);
        setCanPlayVideo(false);
    }, []);

    // จัดการเมื่อวิดีโอหยุดเองโดยไม่คาดคิด
    const handleVideoPause = useCallback(() => {
        if (isIntersecting && videoRef.current) {
            // ถ้า section ยังมองเห็นอยู่แต่วิดีโอหยุด ให้เล่นใหม่
            setTimeout(() => {
                if (videoRef.current && videoRef.current.paused && isIntersecting) {
                    videoRef.current.play().catch((err) => {
                        console.warn("Video restart error:", err);
                    });
                }
            }, 100);
        }
    }, [isIntersecting]);

    return (
        <section 
            id="skills" 
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center py-24 sm:py-32 overflow-hidden"
        >
            {/* Background: Video or fallback image */}
            {canPlayVideo ? (
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    onPause={handleVideoPause}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        isVideoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                        minWidth: '100%', 
                        minHeight: '100%',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <source src="/videos/skills-bg.webm" type="video/webm" />
                    {/* เพิ่ม fallback สำหรับ browser ที่ไม่รองรับ webm */}
                    <source src="/videos/skills-bg.mp4" type="video/mp4" />
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
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-8 gap-y-12 text-left">
                        {skillCategories.map(({ title, skills }) => (
                            <div key={title}>
                                <h3 className="text-xl font-semibold tracking-wide text-blue-300 mb-5">{title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(skill => (
                                        <div
                                            key={skill}
                                            className="bg-gray-800/50 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700/50 transition-colors duration-200"
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