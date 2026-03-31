"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Palette, Sun, Moon, Zap } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu quando clicado fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100]" ref={menuRef}>
      {/* Menu dropdown/dropup de temas */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-48 bg-surface border border-border-subtle/20 rounded-xl shadow-2xl p-2 flex flex-col gap-1 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          <button
            onClick={() => { setTheme("system"); setIsOpen(false); }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              theme === "system" 
                ? "bg-primary/20 text-primary" 
                : "text-secondary-text hover:bg-surface-elevated hover:text-primary-text"
            }`}
          >
            <Sun className="w-4 h-4 opacity-0" />
            Sistema Auto
          </button>
          
          <div className="h-px bg-border-subtle/20 my-1 w-full"></div>

          <button
            onClick={() => { setTheme("dark"); setIsOpen(false); }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              theme === "dark" || (theme === "system" && resolvedTheme === "dark")
                ? "bg-primary/20 text-primary" 
                : "text-secondary-text hover:bg-surface-elevated hover:text-primary-text"
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark (Orange)
          </button>
          
          <button
            onClick={() => { setTheme("dark-purple"); setIsOpen(false); }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              theme === "dark-purple" 
                ? "bg-primary/20 text-primary" 
                : "text-secondary-text hover:bg-surface-elevated hover:text-primary-text"
            }`}
          >
            <Zap className="w-4 h-4" />
            Dark (Purple)
          </button>

          <button
            onClick={() => { setTheme("light"); setIsOpen(false); }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              theme === "light" || (theme === "system" && resolvedTheme === "light")
                ? "bg-primary/20 text-primary" 
                : "text-secondary-text hover:bg-surface-elevated hover:text-primary-text"
            }`}
          >
            <Sun className="w-4 h-4" />
            Light Mode
          </button>
        </div>
      )}

      {/* Botão de Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary text-surface rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_24px_rgba(255,122,0,0.5)] transform hover:scale-105 transition-all focus:outline-none"
        aria-label="Trocar de Tema"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
}
