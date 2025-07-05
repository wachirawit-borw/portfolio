"use client";

import type { FC, MouseEvent } from "react";
import clsx from 'clsx';

// Define the types for the props this component will receive
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

// A reusable NavLink component for individual links
const NavLink: FC<{
    link: NavLinkData;
    isActive: boolean;
    onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}> = ({ link, isActive, onClick }) => (
    <a
      href={link.href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
        {
          'bg-accent text-accent-foreground shadow-md': isActive, // Style for the active link
          'text-foreground hover:text-accent-hover': !isActive, // Style for inactive links
        }
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
        <header className={clsx(
            'fixed w-full px-4 sm:px-6 py-3 flex justify-between items-center top-0 z-50 transition-all duration-300',
            { 'bg-card-background/80 backdrop-blur-sm shadow-lg': isScrolled, 'bg-transparent': !isScrolled }
        )}>
            {/* Logo */}
            <h1 className="text-2xl font-extrabold text-white [-webkit-text-stroke:0.5px_black]">
                ZURFRK
            </h1>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-2 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
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