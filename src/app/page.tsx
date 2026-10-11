import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { Hero } from "@/components/Hero";
import { Masthead } from "@/components/Masthead";
import { Principles } from "@/components/Principles";
import { Profile } from "@/components/Profile";
import { SelectedWork } from "@/components/SelectedWork";
import { StackCreds } from "@/components/StackCreds";
import { SystemFacts } from "@/components/SystemFacts";

export default function Page() {
  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>
      <Masthead />
      <main id="top" tabIndex={-1}>
        <Hero />
        <SystemFacts />
        <SelectedWork />
        <Principles />
        <Profile />
        <StackCreds />
        <Contact />
      </main>
      <Footer />
      <Grain />
    </>
  );
}
