import { PersonJsonLd } from "@/components/json-ld";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { Expertise } from "@/components/sections/expertise";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { SignatureData } from "@/components/sections/signature-data";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <ProofStrip />
      <Expertise />
      <SelectedProjects />
      <SignatureData />
      <Testimonials />
      <FinalCta />
    </>
  );
}
