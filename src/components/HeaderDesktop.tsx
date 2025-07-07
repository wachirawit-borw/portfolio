"use client";
import type { FC, MouseEvent } from "react";
import clsx from 'clsx';
import NavLink, { type NavLinkData } from "./NavLink";

type HeaderDesktopProps = {
    navLinks: NavLinkData[];
    activeSection: string;
    isScrolled: boolean;
    handleSmoothScroll: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const HeaderDesktop: FC<HeaderDesktopProps> = ({
    navLinks,
    activeSection,
    isScrolled,
    handleSmoothScroll
}) => {
    return (
        <header className={clsx(
            'fixed w-full px-4 sm:px-6 py-4 flex justify-between items-center top-0 z-50 transition-all duration-300',
            { 'bg-card-background/80 backdrop-blur-sm shadow-lg bg-gradient-to-r from-[#f0cca8] to-[#07ade5]': isScrolled, 'bg-transparent': !isScrolled }
        )}>
            <h1 className="text-2xl font-extrabold text-white [-webkit-text-stroke:0.5px_black]">
                ZURFRK
            </h1>
            <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 font-medium">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.href}
                        link={link}
                        isActive={activeSection === link.href.substring(1)}
                        onClick={handleSmoothScroll}
                        activeClassName="text-accent-hover font-bold"
                        inactiveClassName="text-white hover:text-accent-hover"
                    />
                ))}
            </nav>
        </header>
    );
};

export default HeaderDesktop;