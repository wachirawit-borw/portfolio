"use client";
import { useState, useEffect } from "react";
import type { FC, MouseEvent } from "react";

// --- การกำหนด Type ---
// กำหนดโครงสร้างของข้อมูลสำหรับลิงก์ในเมนู
type NavLink = {
    href: string;
    label: string;
};

// --- ไอคอน SVG ---
const MenuIcon: FC<{ className?: string }> = ({ className }) => (<svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>);
// คอมโพเนนต์สำหรับไอคอนปิด (X)
const XIcon: FC<{ className?: string }> = ({ className }) => (<svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);


// --- คอมโพเนนต์หลัก ---
export default function Header() {
    // --- State Management ---
    // สถานะสำหรับเปิด/ปิดเมนูมือถือ
    const [menuOpen, setMenuOpen] = useState(false);
    // สถานะสำหรับเก็บว่าส่วนไหน (section) ของเว็บกำลังแสดงอยู่
    const [activeSection, setActiveSection] = useState('home');
    // สถานะสำหรับตรวจสอบว่าผู้ใช้เลื่อนหน้าจอลงมาแล้วหรือยัง
    const [isScrolled, setIsScrolled] = useState(false);

    // --- ข้อมูลลิงก์สำหรับเมนู ---
    const navLinks: NavLink[] = [
        { href: "#home", label: "Home" },
        { href: "#experience", label: "Experience" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" }
    ];

    // --- Side Effects ---
    // useEffect สำหรับจัดการกับการเลื่อนหน้าจอ
    useEffect(() => {
        // ฟังก์ชันสำหรับตรวจสอบตำแหน่ง scroll และกำหนดสถานะ isScrolled
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // ตั้งค่า Intersection Observer เพื่อตรวจจับว่า section ไหนกำลังแสดงบนจอ
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' });

        sections.forEach(section => observer.observe(section));

        // Cleanup function: จะทำงานเมื่อคอมโพเนนต์ถูกทำลาย เพื่อลบ event listener และ observer ออก
        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    // ฟังก์ชันสำหรับจัดการการเลื่อนไปยัง section ต่างๆ อย่างนุ่มนวล (Smooth Scroll)
    const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;

        const targetId = href.substring(1);
        setActiveSection(targetId);

        if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // ถ้าเมนูมือถือเปิดอยู่ ให้ปิดเมื่อคลิกที่ลิงก์
        if (menuOpen) setMenuOpen(false);
    };

    // ฟังก์ชันสำหรับตรวจสอบว่าลิงก์ไหนควรจะแสดงเป็นสถานะ "active"
    const isLinkActive = (link: NavLink) => activeSection === link.href.substring(1);

    // --- การแสดงผล (Render) ---
    return (
        <>
            {/* ส่วนหัวของเว็บ (Header) */}
            {/* ใช้เงื่อนไข isScrolled เพื่อเปลี่ยนสไตล์เมื่อผู้ใช้เลื่อนหน้าจอ */}
            <header className={`w-full px-4 sm:px-6 py-4 flex justify-between items-center top-0 z-50 transition-all duration-300 ${isScrolled ? 'sticky bg-card-background/80 backdrop-blur-sm shadow-lg' : 'absolute bg-transparent'}`}>

                {/* โลโก้ */}
                <h1 className="
                text-2xl 
                font-extrabold 
                text-foreground
                text-white
                [-webkit-text-stroke:0.5px_black]
                transition-colors 
                ">ZURFRK</h1>

                {/* เมนูสำหรับเดสก์ท็อป (ซ่อนในจอมือถือ) */}
                <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 font-medium text-foreground/80">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={handleSmoothScroll}
                            aria-current={isLinkActive(link) ? 'page' : undefined}
                            // กำหนดสไตล์โดยเช็คว่า active หรือไม่ ถ้า active ให้ใช้ 'text-accent-hover font-bold' ถ้าไม่ active ให้ใช้ 'text-white'
                            className={`
                                transition-colors 
                                duration-200 
                                hover:text-accent-hover 
                                ${isLinkActive(link) ?
                                'text-accent-hover font-bold' : 'text-white'}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* ปุ่มสำหรับเปิด/ปิดเมนูมือถือ (แสดงเฉพาะในจอมือถือ) */}
                <button aria-label="Toggle mobile navigation" aria-expanded={menuOpen} className="md:hidden z-50" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <XIcon className="text-foreground" /> : <MenuIcon className="text-foreground" />}
                </button>
            </header>

            {/* เมนูที่แสดงเมื่อกดปุ่มบนมือถือ */}
            {menuOpen && (
                <div className="md:hidden bg-card-background text-foreground px-6 py-4 space-y-2 font-medium shadow-lg fixed top-0 left-0 w-full pt-20">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={handleSmoothScroll}
                            // กำหนดสไตล์สำหรับเมนูมือถือแบบเดียวกับเดสก์ท็อป
                            className={`block py-3 transition-colors hover:text-accent-hover ${isLinkActive(link) ? 'font-bold text-accent-hover' : 'text-white'}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </>
    );
}