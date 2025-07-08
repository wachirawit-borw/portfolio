"use client";
import Image from "next/image";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  tags: string[];
  techStack?: string[];
  year?: string;
  status?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card-background/80 to-card-background/40 border border-card-border/50 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } flex flex-col lg:flex-row`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-64 lg:h-auto min-h-[350px] relative overflow-hidden">
        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {project.status}
          </div>
        )}
        
        {/* Year Badge */}
        {project.year && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {project.year}
          </div>
        )}

        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-muted-foreground text-sm">Image not available</span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className={`object-cover w-full h-full transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            
            {/* Floating Tech Stack */}
            {project.techStack && (
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <div key={tech} className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded backdrop-blur-sm">
                    {tech}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Featured Project</span>
        </div>
        
        <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 leading-tight">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, tagIndex) => (
            <div 
              key={tag} 
              className="relative group/tag px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 text-accent text-sm font-semibold rounded-full hover:from-accent/20 hover:to-accent/10 transition-all duration-300"
              style={{ 
                animationDelay: `${tagIndex * 100}ms`,
                animation: isHovered ? 'pulse 2s infinite' : 'none'
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span>View Live Site</span>
            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 delay-200" />
    </div>
  );
}