"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Modal } from "@/components/ui/modal";
import { Mascot } from "@/components/mascot";
import { ThemeToggle } from "@/components/theme-toggle";

// Icon components
const UserIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

interface AppIcon {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const apps: AppIcon[] = [
  { id: "about", label: "About", icon: <UserIcon />, color: "from-blue-400 to-blue-600" },
  { id: "links", label: "Links", icon: <LinkIcon />, color: "from-purple-400 to-purple-600" },
  { id: "work", label: "Work", icon: <BriefcaseIcon />, color: "from-amber-400 to-orange-500" },
  { id: "contact", label: "Contact", icon: <MailIcon />, color: "from-emerald-400 to-teal-500" },
];

// Modal content components
function AboutContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          SM
        </div>
        <div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Saagnik Mondal</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Developer & Designer</p>
        </div>
      </div>
      <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
        <p>
          Hey there! I&apos;m Saagnik, a passionate developer who loves building beautiful and functional web experiences.
        </p>
        <p>
          I specialize in modern web technologies and enjoy creating interfaces that are both intuitive and visually appealing.
        </p>
        <div className="pt-2">
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {["TypeScript", "React", "Next.js", "Node.js", "Python", "Tailwind CSS"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinksContent() {
  const links = [
    { name: "GitHub", url: "https://github.com", icon: "🐙" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
    { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { name: "Instagram", url: "https://instagram.com", icon: "📷" },
    { name: "Discord", url: "https://discord.com", icon: "💬" },
  ];

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors"
        >
          <span className="text-2xl">{link.icon}</span>
          <span className="font-medium text-zinc-900 dark:text-white">{link.name}</span>
          <svg className="w-4 h-4 ml-auto text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </motion.a>
      ))}
    </div>
  );
}

function WorkContent() {
  const projects = [
    {
      title: "Project Alpha",
      description: "A modern web application built with Next.js and TypeScript",
      tags: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "Project Beta",
      description: "Mobile-first design system with component library",
      tags: ["React", "Storybook", "CSS-in-JS"],
    },
    {
      title: "Project Gamma",
      description: "Real-time collaboration platform with WebSocket",
      tags: ["Node.js", "Socket.io", "Redis"],
    },
  ];

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 space-y-2"
        >
          <h4 className="font-semibold text-zinc-900 dark:text-white">{project.title}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-4">
      <p className="text-zinc-600 dark:text-zinc-400">
        Feel free to reach out! I&apos;m always open to discussing new projects or opportunities.
      </p>
      <form className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-zinc-900 dark:text-white placeholder-zinc-400"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-zinc-900 dark:text-white placeholder-zinc-400"
        />
        <textarea
          rows={4}
          placeholder="Your message"
          className="w-full px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-zinc-900 dark:text-white placeholder-zinc-400 resize-none"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Send Message
        </motion.button>
      </form>
    </div>
  );
}

const modalContents: Record<string, { title: string; content: React.ReactNode }> = {
  about: { title: "About Me", content: <AboutContent /> },
  links: { title: "Social Links", content: <LinksContent /> },
  work: { title: "My Work", content: <WorkContent /> },
  contact: { title: "Get in Touch", content: <ContactContent /> },
};

export default function Home() {
  const [openModals, setOpenModals] = useState<string[]>([]);

  const openModal = (id: string) => {
    if (!openModals.includes(id)) {
      setOpenModals([...openModals, id]);
    }
  };

  const closeModal = (id: string) => {
    setOpenModals(openModals.filter((m) => m !== id));
  };

  return (
    <AuroraBackground>
      <ThemeToggle />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Saagnik Mondal
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Developer • Designer • Creator
          </p>
        </motion.div>

        {/* App icons grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {apps.map((app, index) => (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(app.id)}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}
              >
                {app.icon}
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {app.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {openModals.map((id, index) => {
          const modal = modalContents[id];
          return (
            <Modal
              key={id}
              isOpen={true}
              onClose={() => closeModal(id)}
              title={modal.title}
              initialPosition={{
                x: 100 + index * 30,
                y: 100 + index * 30,
              }}
            >
              {modal.content}
            </Modal>
          );
        })}
      </AnimatePresence>

      {/* Mascot */}
      <Mascot />
    </AuroraBackground>
  );
}
