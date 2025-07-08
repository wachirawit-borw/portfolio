import HeroSection from '@/components/Hero'
import dynamic from 'next/dynamic'

const DynamicAbout = dynamic(() => import('@/components/About'));
const DynamicExperienceSection = dynamic(() => import('@/components/Exp'));
const DynamicSkillsSection = dynamic(() => import('@/components/Skills'));
const DynamicProjectsSection = dynamic(() => import('@/components/Project'));
const DynamicContact = dynamic(() => import('@/components/Contact'));

export default function Home() {
  return (
    <main className="text-foreground">
      <HeroSection />
      <DynamicAbout />
      <DynamicExperienceSection />
      <DynamicSkillsSection />
      <DynamicProjectsSection />
      <DynamicContact />
    </main>
  )
}