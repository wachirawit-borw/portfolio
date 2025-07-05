"use client";
import { useState, useEffect } from 'react';

// ค่าเริ่มต้นของ Tailwind CSS สำหรับ breakpoint 'md' คือ 768px
const useScreenSize = (breakpoint: number = 768) => {
  // เริ่มต้น state เป็น null เพื่อป้องกันปัญหา Hydration Mismatch ใน Next.js
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // ฟังก์ชันนี้จะทำงานฝั่ง Client เท่านั้น
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // ตรวจสอบขนาดทันทีเมื่อคอมโพเนนต์พร้อมใช้งาน
    checkScreenSize();

    // เพิ่ม Event Listener เพื่อคอยดักจับการเปลี่ยนแปลงขนาดหน้าจอ
    window.addEventListener('resize', checkScreenSize);

    // Cleanup function: ลบ Event Listener ออกเมื่อคอมโพเนนต์ถูกทำลาย
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return { isMobile };
};

export default useScreenSize;