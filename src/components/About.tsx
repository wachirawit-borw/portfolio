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

    // ... (ส่วน Logic ของ useEffect และ toggleMute ไม่มีการเปลี่ยนแปลง) ...
    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch((err) => {
                        console.warn("Play error:", err);
                    });

                    if (hasBeenUnmutedOnce.current) {
                        if (videoRef.current) {
                            videoRef.current.muted = true;
                        }
                        setIsMuted(true);
                    }
                } else {
                    if (!videoRef.current?.paused) {
                        videoRef.current?.pause();
                    }
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
            // 1. ลบ p-20 และ justify-end ออก ให้ section ทำหน้าที่เป็นแค่กรอบเต็มจอ
            className="relative min-h-screen w-full flex items-center"
        >
            {/* Video Background */}
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/about-bg.webm" type="video/webm" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* 2. สร้าง Container ขึ้นมาใหม่เพื่อกำหนด "เลน" ให้กับเนื้อหา */}
            {/* - container mx-auto: ทำให้เลนนี้อยู่กลางจอและ responsive
                   - px-8 sm:px-12: คือ padding ที่ปลอดภัย ไม่ทำให้จอซูม */}
            <div className="relative z-20 w-full container mx-auto px-8 sm:px-12">
                <AnimateOnScroll>
                    {/* 3. กล่องข้อความจะอยู่ใน "เลน" นี้ ซึ่งจะจัดชิดซ้ายโดยอัตโนมัติ */}
                    <div className="max-w-xl bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/40">
                        <div className="flex flex-col">
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

                            {/* --- ส่วนของข้อความ --- */}
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#84e0ff] to-[#dabaff]">
                                    About Me
                                </h2>
                                <div className="text-gray-300 text-base lg:text-lg space-y-4">
                                    <p>My name is Wachirawit Borwonsuk <br></br> I was born in 1995 <br></br>I hold a Bachelor of Business Administration (B.B.A.) in Business Computer from Bangkok University.</p>
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
                    className="absolute z-30 bottom-10 right-10 bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-opacity duration-300 hover:bg-white/30"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                </button>
            )}
        </section>
    );
}