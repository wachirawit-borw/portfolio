"use client";
import { useState, type FC, type MouseEvent } from "react";
import clsx from 'clsx';

// --- Type Definitions ---
type NavLinkData = { href: string; label: string; };
type HeaderProps = {
    navLinks: NavLinkData[];
    activeSection: string;
    isScrolled: boolean;
    handleSmoothScroll: (e: MouseEvent<HTMLAnchorElement>) => void;
};

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

// --- NavLink Component ---
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
      'transition-colors duration-200',
      // [แก้ไข] เปลี่ยนสีข้อความเป็นสีเข้ม เพื่อให้อ่านง่ายบนพื้นหลังสว่าง
      {
        'text-gray-900 font-bold': isActive, // สีสำหรับลิงก์ที่ Active (สีดำ)
        'text-gray-600 hover:text-gray-900': !isActive // สีสำหรับลิงก์ปกติ (สีเทาเข้ม)
      },
      className
    )}
  >
    {link.label}
  </a>
);


// --- Main Mobile Header Component ---
const HeaderMobile: FC<HeaderProps> = ({ navLinks, activeSection, isScrolled, handleSmoothScroll }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        handleSmoothScroll(e);
        setMenuOpen(false);
    };

    return (
        <>
            {/* Header Bar */}
            <header className={clsx(
                'fixed w-full px-4 sm:px-6 py-4 flex justify-between items-center top-0 z-50 transition-all duration-300',
                { 'bg-card-background/80 backdrop-blur-sm shadow-lg bg-gradient-to-r from-[#f0cca8] to-[#07ade5]': isScrolled, 'bg-transparent': !isScrolled }
            )}>
                <h1 className="text-2xl font-extrabold text-white [-webkit-text-stroke:0.5px_black]">ZURFRK</h1>
                <button
                    aria-label="Toggle mobile navigation"
                    className="z-50 text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <nav
                  className={clsx(
                    "fixed inset-0 z-40 flex flex-col items-center justify-center gap-y-6",
                    // [แก้ไข] เปลี่ยนสีพื้นหลังให้เป็น Gradient ตามที่คุณต้องการ
                    "bg-gradient-to-br from-blue-100 via-white to-orange-100"
                  )}
                >
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            link={link}
                            isActive={activeSection === link.href.substring(1)}
                            onClick={handleLinkClick}
                            className="block text-center text-2xl"
                        />
                    ))}
                </nav>
            )}
        </>
    );
};

export default HeaderMobile;