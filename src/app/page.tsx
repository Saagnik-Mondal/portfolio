"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Modal } from "@/components/ui/modal";
import { Mascot } from "@/components/mascot";
import { ThemeToggle } from "@/components/theme-toggle";

// Icon components matching the original design
const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 6l-10 7L2 6"/>
  </svg>
);

// Social Icons
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface AppIcon {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const apps: AppIcon[] = [
  { id: "about", label: "about", icon: <UserIcon /> },
  { id: "links", label: "links", icon: <LinkIcon /> },
  { id: "work", label: "work", icon: <BriefcaseIcon /> },
  { id: "contact", label: "contact", icon: <MailIcon /> },
];

// About Modal Content
function AboutContent() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-5 pb-5 border-b border-zinc-200 dark:border-zinc-700">
        <div className="w-14 h-14 rounded-xl bg-[var(--primary)] flex items-center justify-center text-[22px] font-extrabold text-white">
          S
        </div>
        <div>
          <div className="text-lg font-bold text-zinc-900 dark:text-white">Saagnik Mondal</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Animator & AI/ML Developer</div>
        </div>
      </div>
      <p className="text-[13px] leading-relaxed mb-3 text-zinc-500 dark:text-zinc-400">
        hey there! i&apos;m saagnik, a creative who brings stories to life through animation while building intelligent systems with machine learning.
      </p>
      <p className="text-[13px] leading-relaxed mb-3 text-zinc-500 dark:text-zinc-400">
        i love exploring where art and technology meet — currently diving deep into generative AI and procedural animation.
      </p>
      <div className="text-[10px] font-bold uppercase tracking-wider mt-5 mb-2 text-[var(--primary)]">Currently</div>
      <div className="flex items-center gap-2.5 p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-1.5 text-[13px] text-zinc-700 dark:text-zinc-300">
        <span>🎬</span><span>working on an animated short film</span>
      </div>
      <div className="flex items-center gap-2.5 p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-1.5 text-[13px] text-zinc-700 dark:text-zinc-300">
        <span>🧠</span><span>learning diffusion models</span>
      </div>
      <div className="flex items-center gap-2.5 p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-1.5 text-[13px] text-zinc-700 dark:text-zinc-300">
        <span>🎧</span><span>listening to tycho & bonobo</span>
      </div>
    </div>
  );
}

// Links Modal Content
function LinksContent() {
  const links = [
    { name: "GitHub", url: "https://github.com/Saagnik-Mondal", icon: <GitHubIcon /> },
    { name: "YouTube", url: "https://youtube.com", icon: <YouTubeIcon /> },
    { name: "Twitter / X", url: "https://x.com/SaagnikMondal", icon: <TwitterIcon /> },
    { name: "Instagram", url: "https://www.instagram.com/saagnik_mondal/", icon: <InstagramIcon /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/saagnik-mondal", icon: <LinkedInIcon /> },
  ];

  return (
    <div className="space-y-2">
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3.5 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-900 dark:text-white font-semibold text-sm border border-transparent hover:border-[var(--primary)] hover:bg-white dark:hover:bg-zinc-900 transition-all"
        >
          <div className="w-9 h-9 bg-white dark:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-300">
            {link.icon}
          </div>
          <span>{link.name}</span>
        </motion.a>
      ))}
    </div>
  );
}

// Work Modal Content
function WorkContent() {
  const tools = ["After Effects", "Blender", "Python", "PyTorch", "Figma", "Clip Studio Paint"];

  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-[var(--primary)]">Tools</div>
      <div className="mb-5 flex flex-wrap">
        {tools.map((tool) => (
          <span
            key={tool}
            className="inline-block px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs font-semibold m-0.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
          >
            {tool}
          </span>
        ))}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-[var(--primary)]">Projects</div>
      <div className="grid grid-cols-2 gap-2.5">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow"
        >
          <Image
            src="/CharacterSheet.jpg"
            alt="Character Sheet"
            width={200}
            height={100}
            className="w-full h-[100px] object-cover"
          />
          <div className="p-2.5 text-xs font-bold text-zinc-900 dark:text-white">Character Design</div>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow"
        >
          <Image
            src="/Wallpaper copy.jpg"
            alt="Wallpaper"
            width={200}
            height={100}
            className="w-full h-[100px] object-cover"
          />
          <div className="p-2.5 text-xs font-bold text-zinc-900 dark:text-white">Digital Illustration</div>
        </motion.div>
      </div>
    </div>
  );
}

// Contact Modal Content
function ContactContent() {
  return (
    <div className="text-center py-4">
      <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6">want to reach out? i&apos;d love to hear from you!</p>
      <Image
        src="/Chibi_Mail-removebg-preview-2.png"
        alt="Mail Chibi"
        width={200}
        height={200}
        className="mx-auto my-5"
      />
      <p className="text-lg text-zinc-900 dark:text-white mb-3">email me at:</p>
      <p className="text-xl font-bold text-[var(--primary)] mb-7">sm2744@cse.jgec.ac.in</p>
      <p className="text-base text-zinc-500 dark:text-zinc-400 mb-6">or press the button below to open your mail app.</p>
      <motion.a
        href="mailto:sm2744@cse.jgec.ac.in"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block px-12 py-4 bg-[var(--primary)] text-white rounded-xl text-lg font-bold hover:opacity-90 transition-opacity"
      >
        Open Mail App
      </motion.a>
    </div>
  );
}

const modalContents: Record<string, { title: string; content: React.ReactNode }> = {
  about: { title: "about", content: <AboutContent /> },
  links: { title: "links", content: <LinksContent /> },
  work: { title: "work", content: <WorkContent /> },
  contact: { title: "contact", content: <ContactContent /> },
};

export default function Home() {
  const [openModals, setOpenModals] = useState<string[]>([]);

  const openModal = (id: string) => {
    if (!openModals.includes(id)) {
      setOpenModals([...openModals, id]);
    }
  };

  const closeModal = (id: string) => {
    setOpenModals(openModals.filter((m: string) => m !== id));
  };

  return (
    <AuroraBackground>
      <ThemeToggle />
      
      {/* Main content card - macOS app window style */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-5">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center w-[95%] max-w-[520px] bg-white/90 dark:bg-[#1f2335]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/80 dark:border-zinc-700/80"
          style={{ minHeight: '480px' }}
        >
          {/* Window bar - macOS style */}
          <div className="bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 px-5 py-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">home</span>
          </div>
          
          {/* Card body */}
          <div className="px-10 py-16 md:py-20 flex flex-col justify-center" style={{ minHeight: '420px' }}>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-semibold mb-3">hello, i&apos;m</p>
            <h1 className="text-5xl font-extrabold mb-2 text-zinc-900 dark:text-white">
              <span className="text-[var(--primary)]">saagnik mondal</span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium mb-12">animator & ai/ml developer</p>

            {/* Icon grid */}
            <nav className="grid grid-cols-4 gap-5 max-[380px]:grid-cols-2">
              {apps.map((app, index) => (
                <motion.button
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(app.id)}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-colors group"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="w-[72px] h-[72px] bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:shadow-lg transition-all"
                  >
                    {app.icon}
                  </motion.div>
                  <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                    {app.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {openModals.map((id: string, index: number) => {
          const modal = modalContents[id];
          return (
            <Modal
              key={id}
              isOpen={true}
              onClose={() => closeModal(id)}
              title={modal.title}
              initialPosition={{
                x: index * 20,
                y: index * 20,
              }}
            >
              {modal.content}
            </Modal>
          );
        })}
      </AnimatePresence>

      {/* Mascot */}
      <Mascot />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 text-center p-4 z-10">
        <div className="flex justify-center gap-2 mb-2">
          <a href="https://github.com/Saagnik-Mondal" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.instagram.com/saagnik_mondal/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
        </div>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">© 2025 Saagnik Mondal</span>
      </footer>
    </AuroraBackground>
  );
}
