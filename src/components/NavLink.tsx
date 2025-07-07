"use client";

import type { FC, MouseEvent } from "react";
import clsx from 'clsx';

// กำหนด Type ของ Props ให้ชัดเจน
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
                    [activeClassName]: isActive,   // ใช้ class ที่ส่งเข้ามาเมื่อ active
                    [inactiveClassName]: !isActive, // ใช้ class ที่ส่งเข้ามาเมื่อ inactive
                },
                className // class เพิ่มเติม
            )}
        >
            {link.label}
        </a>
    );
};

export default NavLink;