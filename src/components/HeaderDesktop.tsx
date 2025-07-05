"use client";

import type { FC, MouseEvent } from "react";
import clsx from 'clsx';

// [ปรับปรุง] นำ Type Definitions และ NavLink Component จากไฟล์ Header.tsx เดิมมาใช้
// เพื่อให้มั่นใจว่าทุกอย่างเหมือนกัน 100%

type NavLinkData = {
    href: string;
    label: string;
};

type HeaderDesktopProps = {
    navLinks: NavLinkData[];
    activeSection: string;
    isScrolled: boolean;
    handleSmoothScroll: (e: MouseEvent<HTMLAnchorElement>) => void;
};

// [ปรับปรุง] ใช้ NavLink Component จาก Header.tsx เดิมเพื่อให้สไตล์เหมือนกัน
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


const HeaderDesktop: FC<HeaderDesktopProps> = ({
    navLinks,
    activeSection,
    isScrolled,
    handleSmoothScroll
}) => {
    return (
        // [ปรับปรุง] ใช้ className ของ header จากไฟล์ Header.tsx เดิม
        <header className={clsx(
            'fixed w-full px-4 sm:px-6 py-4 flex justify-between items-center top-0 z-50 transition-all duration-300',
            { 'bg-card-background/80 backdrop-blur-sm shadow-lg bg-gradient-to-r from-[#f0cca8] to-[#07ade5]': isScrolled, 'bg-transparent': !isScrolled }
        )}>
            {/* Logo (คงเดิม) */}
            <h1 className="text-2xl font-extrabold text-white [-webkit-text-stroke:0.5px_black]">
                ZURFRK
            </h1>

            {/* [ปรับปรุง] ใช้โครงสร้างและ className ของ nav จากไฟล์ Header.tsx เดิม */}
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
        </header>
    );
};

export default HeaderDesktop;