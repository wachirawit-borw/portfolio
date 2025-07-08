"use client";
import { useState, useEffect, type MouseEvent } from "react";

// 1. Import คอมโพเนนต์และ Hook ที่จำเป็น
import useScreenSize from "@/hooks/useScreenSize"; // <-- Import Hook
import HeaderDesktop from "./HeaderDesktop"; // <-- Import Desktop Component
import HeaderMobile from "./HeaderMobile";   // <-- Import Mobile Component

// --- Main Header Component ---
export default function Header() {
    // State และ Logic ทั้งหมดจะยังคงอยู่ที่นี่
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const { isMobile } = useScreenSize(); // <-- ใช้งาน Hook

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact",    label: "Contact" }
    ];

    // --- Side Effects (คงเดิม) ---
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    // --- Handlers (คงเดิม) ---
    const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.getElementById(href.substring(1));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // 2. ป้องกัน Hydration Mismatch ใน Next.js
    // isMobile จะเป็น null ในตอนแรกฝั่งเซิร์ฟเวอร์
    if (isMobile === null) {
        return null; // หรือแสดง UI แบบ Loading/Placeholder ก็ได้
    }

    // 3. ใช้ Ternary Operator เพื่อเลือกว่าจะ Render คอมโพเนนต์ไหน
    // และส่ง Props ที่จำเป็นลงไป
    return isMobile ? (
        <HeaderMobile
            navLinks={navLinks}
            activeSection={activeSection}
            isScrolled={isScrolled}
            handleSmoothScroll={handleSmoothScroll}
        />
    ) : (
        <HeaderDesktop
            navLinks={navLinks}
            activeSection={activeSection}
            isScrolled={isScrolled}
            handleSmoothScroll={handleSmoothScroll}
        />
    );
}