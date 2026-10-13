import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { SkillsShowcase } from "@/components/home/skills-showcase";
import { EducationCerts } from "@/components/home/education-certs";
import { CvSection } from "@/components/home/cv-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
      <EducationCerts />
      <CvSection />
    </>
  );
}
