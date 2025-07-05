import HeroSection from '@/components/Hero'
import dynamic from 'next/dynamic'

const DynamicExperienceSection = dynamic(() => import('@/components/Exp'));
const DynamicSkillsSection = dynamic(() => import('@/components/Skills'));
const DynamicProjectsSection = dynamic(() => import('@/components/Project'));

export default function Home() {
  return (
    <main className="text-foreground">
      <HeroSection />
      <DynamicExperienceSection />
      <DynamicSkillsSection />
      <DynamicProjectsSection />
    </main>
  )
}