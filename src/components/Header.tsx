"use client";
import { useState, useEffect, type MouseEvent } from "react";
import useScreenSize from "@/hooks/useScreenSize";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const { isMobile } = useScreenSize();

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact",    label: "Contact" }
    ];

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

    const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.getElementById(href.substring(1));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (isMobile === null) {
        return null;
    }

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