"use client";

import type { ReactNode } from 'react';
import { useAnimateOnScroll } from '@/hooks/useAOS';
import clsx from 'clsx'; // ใช้ clsx เพื่อความคลีน

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimateOnScroll({ children, className = '' }: AnimateOnScrollProps) {
  // 2. เรียกใช้ Hook เพื่อเอา ref และสถานะการ animate มาใช้งาน
  // โค้ดส่วน Logic ทั้งหมดจะอยู่ใน Hook ทำให้คอมโพเนนต์นี้ดูแลแค่งานแสดงผล
  const { ref, shouldAnimate } = useAnimateOnScroll();

  return (
    <div
      ref={ref}
      className={clsx(
        'scroll-animate',
        { 'scroll-animate-in': shouldAnimate }, // 3. กำหนด class ตามสถานะที่ได้จาก Hook
        className
      )}
    >
      {children}
    </div>
  );
}