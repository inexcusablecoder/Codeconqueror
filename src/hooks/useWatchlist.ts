import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { WatchlistItem } from "../types/market";
import { Coin } from "../types/market";

export function useWatchlist() {
  const queryClient = useQueryClient();

  const { data: watchlist = [] } = useQuery<WatchlistItem[]>({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const res = await axios.get("/api/watchlist");
      return res.data;
    },
  });

  const addToWatchlist = useMutation({
    mutationFn: (coin: Coin) =>
      axios.post("/api/watchlist", {
        item: { id: coin.id, symbol: coin.symbol, name: coin.name },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  const removeFromWatchlist = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/watchlist/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  return { watchlist, addToWatchlist, removeFromWatchlist };
}
