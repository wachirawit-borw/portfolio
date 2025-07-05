"use client";

import Image from "next/image";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  if (!project) {
    return null;
  }

  return (
    <div className="bg-card-background/60 border border-card-border rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10">
      <div className="md:w-1/2 h-64 md:h-auto min-h-[250px] relative">
        {imageError ? (
          <div className="w-full h-full bg-neutral-800/50 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Image not available</span>
          </div>
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="md:w-1/2 p-8 flex flex-col">
        <h3 className="text-2xl font-bold mb-3 text-accent">{project.title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <div key={tag} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            View Live Site
          </a>
        </div>
      </div>
    </div>
  );
}