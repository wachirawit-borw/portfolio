"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import AnimateOnScroll from './AnimateOnScroll';

export default function Hero() {
    const [canPlayVideo, setCanPlayVideo] = useState(false);

    useEffect(() => {
        const vid = document.createElement("video");
        const support = vid.canPlayType("video/webm");
        if (support === "probably" || support === "maybe") {
            setCanPlayVideo(true);
        }
    }, []);

    return (
        <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden">
            {canPlayVideo ? (
                <video
                    autoPlay loop muted playsInline preload="auto"
                    onError={() => setCanPlayVideo(false)}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/videos/hero-bg.webm" type="video/webm" />
                </video>
            ) : (
                <Image
                    src="/pictures/hero-image.webp"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center z-0"
                />
            )}

            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="relative z-10 container mx-auto w-full max-w-screen-lg">
                <AnimateOnScroll>
                    <div className="
                        max-w-2xl
                        bg-black/1
                        backdrop-blur-md
                        border border-white/10
                        rounded-2xl
                        p-8 md:p-5
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
                            <a href="https://github.com/wachirawit-borw" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                                <FaGithub className="w-7 h-7 text-gray-300 hover:text-white hover:scale-110 transition-all duration-300" />
                            </a>
                            <a href="https://linkedin.com/in/zurfrk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                                <FaLinkedin className="w-7 h-7 text-gray-300 hover:text-white hover:scale-110 transition-all duration-300" />
                            </a>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
}