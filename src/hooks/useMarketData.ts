import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Coin } from "../types/market";

export function useMarketData() {
  return useQuery<Coin[]>({
    queryKey: ["marketData"],
    queryFn: async () => {
      const res = await axios.get("/api/market");
      return Array.isArray(res.data) ? res.data : [];
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
