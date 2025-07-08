"use client";
import type { FC, MouseEvent } from "react";
import clsx from 'clsx';

export type NavLinkData = {
    href: string;
    label: string;
};

type NavLinkProps = {
    link: NavLinkData;
    isActive: boolean;
    onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
    // Props สำหรับรับ class เพื่อกำหนดสไตล์
    activeClassName: string;
    inactiveClassName: string;
    // Prop สำหรับ class อื่นๆ เพิ่มเติม (เช่น การจัด layout)
    className?: string;
};

const NavLink: FC<NavLinkProps> = ({
    link,
    isActive,
    onClick,
    activeClassName,
    inactiveClassName,
    className
}) => {
    return (
        <a
            href={link.href}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
                'transition-colors duration-200',
                {
                    [activeClassName]: isActive,
                    [inactiveClassName]: !isActive,
                },
                className
            )}
        >
            {link.label}
        </a>
    );
};

export default NavLink;