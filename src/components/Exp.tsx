"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import useScreenSize from '@/hooks/useScreenSize';

interface AnimateOnScrollProps {
  children: ReactNode;
}

const AnimateOnScroll = ({ children }: AnimateOnScrollProps) => (
  <div className="animate-fade-in">{children}</div>
);

const experiences = [
  {
    role: "AD & AI PROMPT POLICY EVALUATION",
    company: "Appen (Remote – Thailand)",
    duration: "Apr 2025 – Present",
    description: [
      "Reviewed 250+ Facebook & Instagram ads per shift for policy compliance, achieving >90% audit accuracy",
      "Flagged high-risk ads involving misinformation, gambling, sexual content, and medical deception, enabling rapid removal",
      "Evaluated 160+ AI-generated prompts per hour for health and religion guideline violations using structured taxonomy",
      "Reduced average handle time to 22 seconds by standardizing rationale formats, improving reviewer efficiency",
      "Collaborated with policy leads to refine escalation workflows, cutting backlog and improving turnaround times"
    ],
  },
  {
    role: "LLM Output Quality Evaluation",
    company: "MatrixGo (Remote – Thailand)",
    duration: "Jun 2025 – Jul 2025",
    description: [
      "Benchmarked Thai/English LLM responses for fluency, factuality, and intent alignment, ensuring strong inter-annotator agreement",
      "Delivered actionable feedback on tone, cultural nuance, and safety to inform model retraining cycles",
      "Authored prompt-clarity guidelines adopted across the evaluator team"
    ],
  },
  {
    role: "Family Business Rental Real Estate",
    company: "Bangkok, Thailand",
    duration: "2018 – 2024",
    description: [
      "Managed family rental business including tenant relations, property maintenance, and cost control",
      "Maintained operations during COVID-19 while focusing on personal health and wellness",
      "Completed self-directed fullstack web development training in React, Next.js, Node.js, and modern JavaScript/TypeScript"
    ],
  },
];

export default function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile } = useScreenSize();

  // เพิ่ม IntersectionObserver กลับมา แต่ปิด Veo3 indicator
  useEffect(() => {
    if (isMobile === null) {
      return;
    }

    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch((err) => {
              console.warn("Play error:", err);
            });
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isMobile]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  if (isMobile === null) {
    return <section id="experience" className="relative min-h-screen w-full" />;
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-6 overflow-hidden"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            minWidth: '100%',
            minHeight: '100%',
            width: '100%',
            height: '100%',
          }}
          // เพิ่ม CSS เพื่อซ่อน Veo3 indicator
          onPlay={() => {
            // ซ่อน Chrome's video AI indicators
            if (videoRef.current) {
              const video = videoRef.current;
              // ลบ attributes ที่อาจแสดง AI indicators
              video.removeAttribute('data-veo');
              video.removeAttribute('data-ai-generated');
              // เพิ่ม CSS class เพื่อซ่อน indicators
              video.classList.add('hide-ai-indicators');
            }
          }}
        >
          <source src="/videos/exp-bg.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      <div className="relative z-20 container mx-auto max-w-5xl">
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#84e0ff] via-[#a8d8ff] to-[#dabaff]">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#84e0ff] to-[#dabaff] mx-auto rounded-full"></div>
          </div>
        </AnimateOnScroll>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#84e0ff] via-[#a8d8ff] to-[#dabaff]"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <AnimateOnScroll key={index}>
                <div
                  className={`relative transition-all duration-300 ${hoveredIndex === index ? 'scale-105' : ''
                    }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white border-4 border-[#84e0ff] rounded-full shadow-lg z-10"></div>

                  {/* Content */}
                  <div className="md:grid md:grid-cols-2 gap-8 items-start ml-16 md:ml-0">
                    {/* Left side - Job info */}
                    <div className="md:text-right md:pr-8 flex md:justify-end">
                      <div
                        className={`inline-block w-fit bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl hover:shadow-[#84e0ff]/20 transition-all duration-300 p-6`}
                      >
                        <h3 className="text-2xl font-bold text-white mb-2 whitespace-nowrap">
                          {exp.role}
                        </h3>

                        <p className="text-lg font-medium text-[#84e0ff] mb-2">
                          {exp.company}
                        </p>

                        <p className="text-sm font-medium text-gray-300 bg-white/10 px-3 py-1 rounded-full inline-block">
                          {exp.duration}
                        </p>
                      </div>
                    </div>

                    {/* Right side - Description */}
                    <div className="mt-4 md:mt-0 md:pl-8">
                      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl hover:shadow-[#84e0ff]/20 transition-all duration-300 p-6">
                        <div className="space-y-3">
                          {exp.description.map((desc, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-[#84e0ff] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-300 leading-relaxed">
                                {desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        /* ซ่อน AI indicators และ watermarks */
        .hide-ai-indicators::after,
        .hide-ai-indicators::before,
        .hide-ai-indicators .veo-watermark,
        .hide-ai-indicators [data-veo],
        .hide-ai-indicators [class*="veo"],
        .hide-ai-indicators [class*="ai-generated"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }

        /* ซ่อน Chrome's built-in AI video indicators */
        video.hide-ai-indicators {
          position: relative;
        }
        
        video.hide-ai-indicators::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}