/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MAIN PAGE — src/app/page.jsx                               ║
 * ║                                                              ║
 * ║  This file composes all sections in order.                  ║
 * ║  To hide a section: comment it out here.                    ║
 * ║  To reorder sections: move the component line.              ║
 * ║  To add content: edit the data files in src/data/           ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import Navbar       from '@/components/Navbar';
import Hero         from '@/sections/Hero';
import About        from '@/sections/About';
import Skills       from '@/sections/Skills';
import Projects     from '@/sections/Projects';
import CaseStudy    from '@/sections/CaseStudy';
import Timeline     from '@/sections/Timeline';
import ConceptVault from '@/sections/ConceptVault';
import Contact      from '@/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1. Landing */}
        <Hero />

        {/* 2. Researcher Profile */}
        <About />

        {/* 3. Tech Arsenal */}
        <Skills />

        {/* 4. Experiments (Projects) */}
        <Projects />

        {/* 5. Case Studies */}
        <CaseStudy />

        {/* 6. Evolution Log */}
        <Timeline />

        {/* 7. Concept Vault — comment out to hide */}
        <ConceptVault />

        {/* 8. Contact */}
        <Contact />
      </main>
    </>
  );
}
