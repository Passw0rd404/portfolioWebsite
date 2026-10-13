import { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { EducationCerts } from "@/components/home/education-certs";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Abdullah Sameh, a DevOps engineer and Computer Science student focused on Kubernetes, GitOps, and cloud automation.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <Skills />
      <EducationCerts />
    </div>
  );
}
