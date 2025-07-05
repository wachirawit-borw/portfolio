"use client";

import { useInView } from 'react-intersection-observer';
import { useState, useEffect, type ReactNode } from 'react';

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimateOnScroll({ children, className = '' }: AnimateOnScrollProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true, // ให้ animation ทำงานแค่ครั้งเดียว
    threshold: 0.1,    // ให้ animation ทำงานเมื่อเห็น element 10%
  });

  // ป้องกัน Hydration Error โดยการไม่ render อะไรเลยฝั่ง Server
  if (!hasMounted) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`scroll-animate ${inView ? 'scroll-animate-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
