"use client";
import { useState, type FC, type MouseEvent } from "react";
import clsx from 'clsx';

type NavLinkData = { href: string; label: string; };
type HeaderProps = {
    navLinks: NavLinkData[];
    activeSection: string;
    isScrolled: boolean;
    handleSmoothScroll: (e: MouseEvent<HTMLAnchorElement>) => void;
};

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

const HeaderMobile: FC<HeaderProps> = ({ navLinks, activeSection, isScrolled, handleSmoothScroll }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        handleSmoothScroll(e);
        setMenuOpen(false); // ปิดเมนูหลังคลิก
    };

    return (
        <>
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

            {menuOpen && (
                <nav className="bg-card-background text-foreground px-6 py-4 space-y-2 font-medium shadow-lg fixed top-0 left-0 w-full pt-20 z-40">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            link={link}
                            isActive={activeSection === link.href.substring(1)}
                            onClick={handleLinkClick}
                            className="block py-3 text-center text-lg text-foreground"
                        />
                    ))}
                </nav>
            )}
        </>
    );
};

export default HeaderMobile;