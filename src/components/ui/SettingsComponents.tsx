import React from "react";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SettingsSection = ({ title, description, children }: SettingsSectionProps) => (
  <div className="p-6 bg-[#151619] rounded-xl border border-[#1A1B1E]">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-zinc-500 mt-0.5">{description}</p>
    </div>
    {children}
  </div>
);

interface ToggleSwitchProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const ToggleSwitch = ({ label, description, enabled, onChange }: ToggleSwitchProps) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-medium text-white">{label}</div>
      <div className="text-xs text-zinc-500 mt-0.5">{description}</div>
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-[#2A2B2E]"}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? "left-7" : "left-1"}`} />
    </button>
  </div>
);

interface StyledInputProps {
  label: string;
  placeholder: string;
  type?: string;
  rightElement?: React.ReactNode;
}

export const StyledInput = ({ label, placeholder, type = "text", rightElement }: StyledInputProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-white">{label}</label>
    <div className="relative flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
      />
      {rightElement && <div className="absolute right-3">{rightElement}</div>}
    </div>
  </div>
);

interface ActionBtnProps {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  className?: string;
}

export const ActionBtn = ({ variant = "primary", children, className = "" }: ActionBtnProps) => {
  const base = "px-4 py-2 rounded-lg font-semibold text-sm transition-all";
  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    secondary: "bg-[#1A1B1E] text-white border border-[#2A2B2E] hover:bg-[#2A2B2E]",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
  };
  return <button className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
};

interface PillSelectorProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export const PillSelector = ({ options, selected, onChange }: PillSelectorProps) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          selected === opt
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "bg-[#1A1B1E] text-zinc-400 border border-[#2A2B2E] hover:text-white hover:border-[#3A3B3E]"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);
