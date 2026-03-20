"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type SearchResult = {
  type: "chef" | "restaurant";
  id: string;
  name: string;
  signal: string;
  href: string;
};

type SearchIndex = {
  chefs: {
    id: string;
    name: string;
    cuisines: string;
    signal: string;
  }[];
  restaurants: {
    id: string;
    name: string;
    neighborhood: string;
    cuisines: string;
    signal: string;
  }[];
};

export default function Search({ index }: { index: SearchIndex }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const search = useCallback(
    (q: string) => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      const lower = q.toLowerCase();
      const chefResults: SearchResult[] = index.chefs
        .filter(
          (c) =>
            c.name.toLowerCase().includes(lower) ||
            c.cuisines.toLowerCase().includes(lower)
        )
        .slice(0, 5)
        .map((c) => ({
          type: "chef" as const,
          id: c.id,
          name: c.name,
          signal: c.signal,
          href: `/chefs/${c.id}`,
        }));

      const restaurantResults: SearchResult[] = index.restaurants
        .filter(
          (r) =>
            r.name.toLowerCase().includes(lower) ||
            r.neighborhood.toLowerCase().includes(lower) ||
            r.cuisines.toLowerCase().includes(lower)
        )
        .slice(0, 5)
        .map((r) => ({
          type: "restaurant" as const,
          id: r.id,
          name: r.name,
          signal: r.signal,
          href: `/restaurants/${r.id}`,
        }));

      setResults([...chefResults, ...restaurantResults]);
    },
    [index]
  );

  useEffect(() => {
    search(query);
    setActiveIndex(-1);
  }, [query, search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global keyboard shortcut: / to focus search
  useEffect(() => {
    function handleSlash(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          (e.target as HTMLElement).tagName
        )
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleSlash);
    return () => document.removeEventListener("keydown", handleSlash);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  function navigate(result: SearchResult) {
    setIsOpen(false);
    setQuery("");
    router.push(result.href);
  }

  const chefResults = results.filter((r) => r.type === "chef");
  const restaurantResults = results.filter((r) => r.type === "restaurant");
  let flatIndex = 0;

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search chefs, restaurants, cuisines..."
          className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-10 pr-8 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-300 focus:bg-white focus:outline-none transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {!query && (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-block rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-stone-400">
            /
          </kbd>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-stone-200 bg-white shadow-lg z-50 overflow-hidden">
          {chefResults.length > 0 && (
            <div>
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50">
                Chefs
              </div>
              {chefResults.map((result) => {
                const idx = flatIndex++;
                return (
                  <button
                    key={result.id}
                    onClick={() => navigate(result)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 flex items-start justify-between gap-3 transition-colors ${
                      activeIndex === idx
                        ? "bg-amber-50"
                        : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-stone-900 truncate">
                        {result.name}
                      </div>
                      {result.signal && (
                        <div className="text-xs text-stone-500 truncate mt-0.5">
                          {result.signal}
                        </div>
                      )}
                    </div>
                    <svg className="h-4 w-4 text-stone-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          )}
          {restaurantResults.length > 0 && (
            <div>
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50 border-t border-stone-100">
                Restaurants
              </div>
              {restaurantResults.map((result) => {
                const idx = flatIndex++;
                return (
                  <button
                    key={result.id}
                    onClick={() => navigate(result)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 flex items-start justify-between gap-3 transition-colors ${
                      activeIndex === idx
                        ? "bg-amber-50"
                        : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-stone-900 truncate">
                        {result.name}
                      </div>
                      {result.signal && (
                        <div className="text-xs text-stone-500 truncate mt-0.5">
                          {result.signal}
                        </div>
                      )}
                    </div>
                    <svg className="h-4 w-4 text-stone-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-stone-200 bg-white shadow-lg z-50 p-4 text-sm text-stone-500 text-center">
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
