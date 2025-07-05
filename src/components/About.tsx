"use client";

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function About() {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasBeenUnmutedOnce = useRef(false);

    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting) {
                    videoRef.current?.play();

                    if (hasBeenUnmutedOnce.current) {
                        if (videoRef.current) {
                            videoRef.current.muted = true;
                        }
                        setIsMuted(true);
                    }
                } else {
                    videoRef.current?.pause();
                }
            },
            { threshold: 0.85 }
        );

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    const toggleMute = () => {
        if (!videoRef.current) return;

        const newMutedState = !videoRef.current.muted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);

        if (!newMutedState && !hasBeenUnmutedOnce.current) {
            hasBeenUnmutedOnce.current = true;
        }
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative z-20 min-h-screen w-full flex items-center justify-center overflow-hidden outline-none"
        >
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/about-bg.webm" type="video/webm" />
            </video>

            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="relative z-20 container mx-auto w-full h-full flex items-center px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center w-full">
                    <div className="md:col-span-2 text-white">
                        <AnimateOnScroll>
                            <div className="max-w-xl bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/40">
                                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <div className="mb-5">
                                        <Image
                                            src="/pictures/profile-image.webp"
                                            alt="Wachirawit Borwonsuk"
                                            width={120}
                                            height={120}
                                            className="rounded-full object-cover border-4 border-white/20 shadow-lg"
                                            priority
                                        />
                                    </div>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#84e0ff] to-[#dabaff]">
                                    About Me
                                </h2>
                                <div className="text-gray-300 text-base lg:text-lg space-y-4">
                                    <p>My name is Wachirawit Borwonsuk <br></br>I was born on March 2 1995</p>
                                    Graduated B.B.A. in Business Computer, Bangkok University

                                    <p>
                                        I love building websites because they are easy to access and can reach anyone, anywhere. Now with AI tools helping the process, creating websites has become easier and more exciting than ever.
                                    </p>

                                    <p>Full-stack developer focused on clean UI, robust APIs, and modern frameworks like Next.js. Driven to transform ideas into impactful digital solutions.</p>
                                </div>

                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>

            {isIntersecting && (
                <button
                    onClick={toggleMute}
                    className="absolute z-30 bottom-10 right-10 bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-opacity duration-300 hover:bg-white/30"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                </button>
            )}
        </section>
    );
}