import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "./Card";

export interface GainerLoser {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface GainersLosersGridProps {
  gainers: GainerLoser[];
  losers: GainerLoser[];
}

const TokenList = ({ title, tokens, isGainer }: { title: string; tokens: GainerLoser[]; isGainer: boolean }) => (
  <Card className="p-6 h-full flex flex-col">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      <div className={`px-2 py-1 rounded bg-[#1A1B1E] text-xs font-mono border border-[#2A2B2E] ${isGainer ? 'text-emerald-500' : 'text-red-500'}`}>
        24h Top 5
      </div>
    </div>

    <div className="flex flex-col gap-3 flex-1">
      {tokens.map((token, i) => (
        <motion.div
          key={token.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex justify-between items-center p-3 bg-[#1A1B1E] rounded-lg border border-[#2A2B2E]"
        >
          <div>
            <div className="font-medium text-white">{token.name}</div>
            <div className="text-xs text-zinc-500 uppercase">{token.symbol}</div>
          </div>
          <div className="text-right">
            <div className="text-white">${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
            <div className={`text-xs flex items-center justify-end gap-1 ${isGainer ? 'text-emerald-400' : 'text-red-400'}`}>
              {isGainer ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(token.change).toFixed(2)}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </Card>
);

export const GainersLosersGrid = ({ gainers, losers }: GainersLosersGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <TokenList title="Top Gainers" tokens={gainers} isGainer={true} />
      <TokenList title="Top Losers" tokens={losers} isGainer={false} />
    </div>
  );
};
