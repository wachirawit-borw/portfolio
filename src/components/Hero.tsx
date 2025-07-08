"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default function Hero() {
    const [canPlayVideo, setCanPlayVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const vid = document.createElement("video");
        const support = vid.canPlayType("video/webm");
        if (support === "probably" || support === "maybe") {
            setCanPlayVideo(true);
        }
    }, []);

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };

    return (
        <section id="home" className="relative min-h-screen w-full flex items-end justify-center pb-20 overflow-hidden">
            {/* Background Container - กำหนดขนาดที่ชัดเจน */}
            <div className="absolute inset-0 w-full h-full">
                {/* Fallback Background - แสดงก่อนที่วิดีโอจะโหลด */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                
                {canPlayVideo ? (
                    <video
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        preload="metadata"
                        onLoadedData={handleVideoLoad}
                        onError={() => setCanPlayVideo(false)}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isVideoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            // กำหนดขนาดพื้นฐานให้วิดีโอเพื่อป้องกัน layout shift
                            minWidth: '100%',
                            minHeight: '100%',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <source src="/videos/hero-bg.webm" type="video/webm" />
                    </video>
                ) : (
                    <Image
                        src="/pictures/hero-image.webp"
                        alt="Hero Background"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />
            
            {/* Content Container - กำหนดตำแหน่งที่ชัดเจน */}
            <div className="relative z-20 container w-full max-w-screen-lg px-4">
                <AnimateOnScroll>
                    <div className="
                        max-w-2xl
                        mx-auto
                        bg-black/40
                        backdrop-blur-md
                        border border-white/10
                        rounded-2xl
                        p-8 md:p-10
                        shadow-2xl shadow-black/30
                    ">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#84e0ff] to-[#dabaff]">
                            Hi, It&apos;s Wachirawit
                        </h1>

                        <div className="text-xl sm:text-2xl font-bold mb-6 h-8 text-gray-200" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
                            <TypeAnimation
                                sequence={[
                                    'Full-Stack Developer (AI/ML)', 2000,
                                    'Frontend with Next.js & Tailwind', 2000,
                                    'Backend: Node.js | Prisma & PostgreSQL', 2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                        <p className="text-gray-300 text-base lg:text-lg mb-8">
                            Fullstack Developer building modern, scalable web applications that deliver seamless user experiences from frontend to backend.
                        </p>
                        <div className="flex items-center gap-x-5">
                            <a 
                                href="https://github.com/wachirawit-borw" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="GitHub Profile"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaGithub className="w-7 h-7 text-gray-300 hover:text-white transition-colors duration-300" />
                            </a>
                            <a 
                                href="https://linkedin.com/in/zurfrk" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="LinkedIn Profile"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaLinkedin className="w-7 h-7 text-gray-300 hover:text-white transition-colors duration-300" />
                            </a>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}