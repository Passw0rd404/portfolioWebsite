import { Metadata } from "next";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Abdullah Sameh for DevOps and cloud infrastructure work.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen">
      <Contact />
    </div>
  );
}
