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

    const textShadowStyle = { textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' };

    return (
        <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">

            {canPlayVideo ? (
                <video
                    autoPlay loop muted playsInline preload="auto"
                    onError={() => setCanPlayVideo(false)}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    poster="/profile-image.webp"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    <source src="/videos/hero-bg.webm" type="video/webm" />
                </video>
            ) : (
                <Image
                    src="/picture/hero-image.webp"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center z-0"
                />
            )}

            <div className="absolute inset-0 bg-black/70 z-10" />

            <div className="relative z-20 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 text-white">

                <AnimateOnScroll>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#84e0ff] to-[#dabaff] [text-shadow:0_2px_4px_rgba(0,0,0,0.25)]">
                            Hi, It&apos;s Wachirawit
                        </h1>
                        <div style={textShadowStyle} className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 h-8 text-gray-300">
                            <TypeAnimation sequence={[
                                'Fullstack Web Developer', 2000,
                                'React & Next.js Expert', 2000,
                                'Node.js Enthusiast', 2000
                            ]}
                                wrapper="span" speed={50} repeat={Infinity} />
                        </div>
                        <p style={textShadowStyle} className="max-w-2xl text-gray-300 text-base lg:text-lg mb-8">
                            A passionate developer specializing in building modern, responsive web applications with a focus on seamless user experiences.
                        </p>

                        <div className="flex justify-center md:justify-start items-center gap-6 mb-8">
                            <a href="https://github.com/wachirawit-borw" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                                <FaGithub className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                            </a>
                            <a href="https://linkedin.com/in/zurfrk" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                                <FaLinkedin className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                            </a>
                        </div>
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll>
                    <div className="flex justify-center">
                        <div className="relative w-[250px] h-[250px] lg:w-[350px] lg:h-[350px]">
                            <div className="absolute inset-0 bg-accent rounded-full blur-3xl opacity-40 animate-pulse"></div>
                            <Image
                                src="/picture/profile-image.webp"
                                alt="Wachirawit Borwonsuk"
                                width={350}
                                height={350}
                                className="relative rounded-full object-contain w-full h-full border-4 border-white-800/50"
                                priority
                            />
                        </div>
                    </div>
                </AnimateOnScroll>

            </div>
        </section>
    );
}
