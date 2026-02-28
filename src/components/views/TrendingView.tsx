import { useState } from "react";
import { Filter } from "lucide-react";
import { GainersLosersGrid, GainerLoser } from "../ui/GainersLosersGrid";
import { SectorHeatmap, Sector } from "../ui/SectorHeatmap";
import { TrendingTable, TrendingToken } from "../ui/TrendingTable";
import { Card } from "../ui/Card";

const generateSparkline = (trend: "up" | "down" | "flat"): number[] => {
  let current = 100;
  return Array.from({ length: 20 }).map(() => {
    const change = (Math.random() - 0.5) * 10;
    const direction = trend === "up" ? 2 : trend === "down" ? -2 : 0;
    current = current + change + direction;
    return Math.max(0, current);
  });
};

const MOCK_GAINERS: GainerLoser[] = [
  { id: "g1", symbol: "PEPE", name: "Pepe", price: 0.00001234, change: 45.2 },
  { id: "g2", symbol: "WIF", name: "dogwifhat", price: 2.34, change: 32.1 },
  { id: "g3", symbol: "BONK", name: "Bonk", price: 0.000028, change: 28.5 },
  { id: "g4", symbol: "FLOKI", name: "Floki", price: 0.00018, change: 22.3 },
  { id: "g5", symbol: "MEME", name: "Memecoin", price: 0.025, change: 18.7 },
];

const MOCK_LOSERS: GainerLoser[] = [
  { id: "l1", symbol: "APT", name: "Aptos", price: 8.45, change: -12.4 },
  { id: "l2", symbol: "ARB", name: "Arbitrum", price: 1.02, change: -9.8 },
  { id: "l3", symbol: "OP", name: "Optimism", price: 2.15, change: -8.2 },
  { id: "l4", symbol: "SUI", name: "Sui", price: 3.45, change: -7.1 },
  { id: "l5", symbol: "SEI", name: "Sei", price: 0.52, change: -5.9 },
];

const MOCK_SECTORS: Sector[] = [
  { id: "s1", name: "DeFi", marketCap: 45e9, change: 5.2 },
  { id: "s2", name: "Layer 2", marketCap: 28e9, change: -2.1 },
  { id: "s3", name: "Meme", marketCap: 22e9, change: 18.4 },
  { id: "s4", name: "AI", marketCap: 15e9, change: 8.7 },
  { id: "s5", name: "Gaming", marketCap: 12e9, change: -1.3 },
  { id: "s6", name: "Infrastructure", marketCap: 8e9, change: 3.2 },
];

const MOCK_TRENDING_TOKENS: TrendingToken[] = [
  { id: "t1", symbol: "SOL", name: "Solana", price: 145.20, volChange: 45.2, sentiment: 88, sparkline: generateSparkline("up") },
  { id: "t2", symbol: "DOGE", name: "Dogecoin", price: 0.154, volChange: 124.5, sentiment: 92, sparkline: generateSparkline("up") },
  { id: "t3", symbol: "LINK", name: "Chainlink", price: 18.40, volChange: 12.4, sentiment: 65, sparkline: generateSparkline("flat") },
  { id: "t4", symbol: "ARB", name: "Arbitrum", price: 1.15, volChange: -15.4, sentiment: 45, sparkline: generateSparkline("down") },
  { id: "t5", symbol: "AVAX", name: "Avalanche", price: 38.50, volChange: 5.2, sentiment: 58, sparkline: generateSparkline("up") },
  { id: "t6", symbol: "TON", name: "Toncoin", price: 6.80, volChange: 84.1, sentiment: 75, sparkline: generateSparkline("up") },
];

export default function TrendingView() {
  const [sortField, setSortField] = useState<"volChange" | "sentiment">("volChange");

  const sortedTokens = [...MOCK_TRENDING_TOKENS].sort((a, b) => {
    return b[sortField] - a[sortField];
  });

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[400px]">
        <GainersLosersGrid gainers={MOCK_GAINERS} losers={MOCK_LOSERS} />

        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Sector Heatmap</h2>
          </div>
          <div className="flex-1">
            <SectorHeatmap sectors={MOCK_SECTORS} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Trending Assets</h2>
            <p className="text-sm text-zinc-500 mt-1">Based on volume momentum and social sentiment</p>
          </div>

          <div className="flex bg-[#151619] p-1 rounded-lg border border-[#1A1B1E]">
            <button
              onClick={() => setSortField("volChange")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${sortField === "volChange"
                ? "bg-[#1A1B1E] text-white shadow-sm border border-[#2A2B2E]"
                : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <Filter size={14} /> By Volume
            </button>
            <button
              onClick={() => setSortField("sentiment")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${sortField === "sentiment"
                ? "bg-[#1A1B1E] text-white shadow-sm border border-[#2A2B2E]"
                : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <Filter size={14} /> By Sentiment
            </button>
          </div>
        </div>

        <Card>
          <TrendingTable tokens={sortedTokens} />
        </Card>
      </div>
    </div>
  );
}
