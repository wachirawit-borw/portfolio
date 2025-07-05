"use client";
import { useState, useEffect, type FC, type MouseEvent } from "react";
import clsx from 'clsx';

// --- Data & Type Definitions ---
type NavLinkData = { href: string; label: string; };

// --- SVG Icons ---
const MenuIcon: FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon: FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Sub-components ---
const NavLink: FC<{
  link: NavLinkData;
  isActive: boolean;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}> = ({ link, isActive, onClick, className }) => (
  <a
    href={link.href}
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    className={clsx(
      'transition-colors duration-200 hover:text-accent-hover',
      { 'text-accent-hover font-bold': isActive, 'text-white': !isActive },
      className
    )}
  >
    {link.label}
  </a>
);

// --- Main Header Component ---
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks: NavLinkData[] = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" }
    ];

    // --- Side Effects ---

    // [วิธีแก้] กลับไปใช้ window.scrollY ซึ่งเสถียรและไม่ทำให้เกิดอาการเด้ง
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect สำหรับไฮไลท์เมนู (ใช้ IntersectionObserver เหมือนเดิม)
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

    // --- Handlers ---
    const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.getElementById(href.substring(1));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        if (menuOpen) {
            setMenuOpen(false);
        }
    };

    return (
        <>
            <header className={clsx(
                'fixed w-full px-4 sm:px-6 py-4 flex justify-between items-center top-0 z-50 transition-all duration-300',
                { 'bg-card-background/80 backdrop-blur-sm shadow-lg bg-gradient-to-r from-[#f0cca8] to-[#07ade5]': isScrolled, 'bg-transparent': !isScrolled }
            )}>
                <h1 className="text-2xl font-extrabold text-white [-webkit-text-stroke:0.5px_black]">ZURFRK</h1>

                <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 font-medium">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            link={link}
                            isActive={activeSection === link.href.substring(1)}
                            onClick={handleSmoothScroll}
                        />
                    ))}
                </nav>

                <button 
                    aria-label="Toggle mobile navigation" 
                    className="md:hidden z-50 text-white" 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </header>

            {menuOpen && (
                <nav className={clsx(
                    "md:hidden bg-card-background text-foreground px-6 py-4 space-y-2 font-medium shadow-lg",
                    "fixed top-0 left-0 w-full pt-20",
                    "transition-opacity duration-300 ease-in-out",
                    "z-40"
                )}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            link={link}
                            isActive={activeSection === link.href.substring(1)}
                            onClick={handleSmoothScroll}
                            className="block py-3 text-center text-lg" 
                        />
                    ))}
                </nav>
            )}
        </>
    );
}