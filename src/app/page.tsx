import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { Hero } from "@/components/Hero";
import { Masthead } from "@/components/Masthead";
import { Motion } from "@/components/Motion";
import { Principles } from "@/components/Principles";
import { Profile } from "@/components/Profile";
import { Reader } from "@/components/Reader";
import { SelectedWork } from "@/components/SelectedWork";
import { StackCreds } from "@/components/StackCreds";
import { Tape } from "@/components/Tape";

export default function Page() {
  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>
      <Masthead />
      <main id="top" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <Principles />
        <Profile />
        <StackCreds />
        <Contact />
      </main>
      {/* The tape closes the sheet: it sits between the last section and the
          colophon, which is where a strip of standing facts belongs. */}
      <Tape />
      <Footer />
      <Grain />
      {/* The head is fixed to the window rather than to the document, so it
          goes with the other two overlays and not inside main. */}
      <Reader />
      <Motion />
    </>
  );
}
