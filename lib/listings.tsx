import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Listing = {
  id: string;
  title: string;
  price: number;
  description: string;
  city: string;
  condition: string;
  sellerEmail: string;
  createdAt: string;
};

type ListingInput = Omit<Listing, "id" | "createdAt">;

type ListingContextValue = {
  listings: Listing[];
  createListing: (input: ListingInput) => void;
};

const LISTINGS_KEY = "naijamarket_listings";

const ListingContext = createContext<ListingContextValue | undefined>(undefined);

export function ListingProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(LISTINGS_KEY) : null;
    if (!raw) return;
    try {
      setListings(JSON.parse(raw) as Listing[]);
    } catch {
      setListings([]);
    }
  }, []);

  const value = useMemo<ListingContextValue>(
    () => ({
      listings,
      createListing: (input) => {
        const next: Listing = {
          ...input,
          id: `lst_${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        const updated = [next, ...listings];
        setListings(updated);
        window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
      }
    }),
    [listings]
  );

  return <ListingContext.Provider value={value}>{children}</ListingContext.Provider>;
}

export function useListings() {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error("useListings must be used inside ListingProvider");
  }
  return context;
}
