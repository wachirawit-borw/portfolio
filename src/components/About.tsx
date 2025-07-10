"use client";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import useScreenSize from '@/hooks/useScreenSize';

export default function About() {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasBeenUnmutedOnce = useRef(false);
    const { isMobile } = useScreenSize();

    useEffect(() => {
        if (isMobile === null) {
            return;
        }

        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                
                // จัดการการเล่น/หยุดวิดีโอเมื่อมองเห็น/ไม่เห็น
                if (entry.isIntersecting) {
                    if (videoRef.current && videoRef.current.paused) {
                        videoRef.current.play().catch((err) => {
                            console.warn("Play error:", err);
                        });
                    }
                } else {
                    if (videoRef.current && !videoRef.current.paused) {
                         videoRef.current.pause();
                     }
                }
            },
            { 
                threshold: 0.5,
                rootMargin: '0px 0px -10% 0px'
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
    }, [isMobile]);

    // ลบ useEffect ที่ซ้ำซ้อนออก - ให้ autoPlay หรือ Intersection Observer จัดการ

    const toggleMute = () => {
        if (!videoRef.current) return;
        const newMutedState = !videoRef.current.muted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
        if (!newMutedState && !hasBeenUnmutedOnce.current) {
            hasBeenUnmutedOnce.current = true;
        }
    };

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };

    if (isMobile === null) {
        return <section id="about" className="relative min-h-screen w-full" />;
    }

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center overflow-hidden"
        >
            {/* Background Video Container */}
            <div className="absolute inset-0 w-full h-full">
                {/* Fallback Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={handleVideoLoad}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        isVideoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        minWidth: '100%',
                        minHeight: '100%',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <source src="/videos/about-bg.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-black/40 z-10" />
            </div>
            
            <div className={`relative z-20 w-full ${isMobile ? 'px-4' : 'px-8 lg:px-12 xl:px-16'}`}>
                <AnimateOnScroll>
                    <div className={`${isMobile ? 'max-w-sm mx-auto' : 'max-w-xl'} bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl ${isMobile ? 'p-5' : 'p-8 md:p-10'} shadow-2xl shadow-black/40`}>
                        <div className="flex flex-col">
                            <div className="mb-5">
                                <Image
                                    src="/pictures/profile-image.webp"
                                    alt="Wachirawit Borwonsuk"
                                    width={isMobile ? 100 : 120}
                                    height={isMobile ? 100 : 120}
                                    className="rounded-full object-cover border-4 border-white/20 shadow-lg"
                                    priority
                                />
                            </div>
                            <div>
                                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#84e0ff] to-[#dabaff]`}>
                                    About Me
                                </h2>
                                <div className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base lg:text-lg'} space-y-4`}>
                                    <p>My name is Wachirawit Borwonsuk <br /> I was born in 1995 <br />I hold a Bachelor of Business Administration (B.B.A.) in Business Computer from Bangkok University.</p>
                                    <p>I am passionate about building websites that are not only accessible but also have a global reach. I am particularly excited about leveraging modern AI tools to streamline the development process and create more innovative and engaging web experiences.</p>
                                    <p>As a full-stack developer specializing in clean UI, robust APIs, and modern frameworks such as Next.js, I am driven to transform conceptual ideas into impactful digital solutions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
            
            {/* Mute Button */}
            {isIntersecting && (
                <button
                    onClick={toggleMute}
                    className={`absolute z-30 ${isMobile ? 'bottom-4 right-4 p-3' : 'bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 p-3 sm:p-4'} bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110`}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? 
                        <FaVolumeMute size={isMobile ? 18 : 20} className={!isMobile ? "sm:w-6 sm:h-6" : ""} /> : 
                        <FaVolumeUp size={isMobile ? 18 : 20} className={!isMobile ? "sm:w-6 sm:h-6" : ""} />
                    }
                </button>
            )}
        </section>
    );
}