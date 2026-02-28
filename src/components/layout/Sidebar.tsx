import { LayoutDashboard, Activity, TrendingUp, ShieldCheck } from "lucide-react";

export type TabType = "dashboard" | "activity" | "trending" | "settings";

const TABS: { id: TabType; label: string; Icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "activity", label: "Activity", Icon: Activity },
  { id: "trending", label: "Trending", Icon: TrendingUp },
  { id: "settings", label: "Settings", Icon: ShieldCheck },
];

interface SidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export default function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#141414] bg-[#0A0A0B]/95 backdrop-blur-md z-50 flex flex-col">
      <div className="p-6 border-b border-[#141414]">
        <h2 className="text-lg font-bold text-white tracking-tight">Nexus</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Web3 Terminal</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onChangeTab(id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              activeTab === id
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-zinc-600 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={20} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
