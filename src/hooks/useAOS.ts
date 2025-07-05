import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

// นี่คือ Custom Hook ของเรา
export function useAnimateOnScroll(threshold = 0.1, triggerOnce = true) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Effect นี้จะทำงานแค่ฝั่ง Client เท่านั้น
    // ทำให้เรามั่นใจได้ว่า state `hasMounted` จะเป็น true แค่บน Client
    setHasMounted(true);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  // ถ้ายังไม่ Mount หรือยังไม่เข้า Viewport ก็ยังไม่ animate
  const shouldAnimate = hasMounted && inView;

  // Hook จะ return ค่าที่จำเป็นให้คอมโพเนนต์นำไปใช้
  return { ref, shouldAnimate };
}