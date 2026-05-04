import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach the AI Student Insights team with questions, corrections, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contact</h1>
      <p className="mt-4 text-zinc-400">
        Share feedback on a guide, suggest a topic, or flag a broken link. This lightweight form opens
        your email client with a pre-filled message—no data is stored on our servers.
      </p>
      <ContactForm />
    </div>
  );
}
