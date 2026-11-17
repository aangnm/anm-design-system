import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Search, Sparkles } from "lucide-react";
import { Kbd } from "@/components/Kbd";
import { useDialogFocus } from "@/lib/useDialogFocus";
import { cn } from "@/lib/utils";

// Command Menu (Feedback & Overlays page, Figma v1.3): the ⌘K palette — a
// search field over grouped commands and destinations, run from the keyboard.
// With `onAsk`, the first row hands the typed text to an AI agent instead.
//
// Why — reopened from the Roadmap's Accepted list (2026-11-17): AI elements
// are the system's focus, and a command entry is the usual way to reach an
// agent from anywhere; the analytics set now has enough surfaces to need a
// way to jump between them. It is a modal dialog over the scrim, 560 wide,
// placed high (15% from the top) so results grow downward without the field
// moving. Groups have headings; matching is by label and keywords, in order.
// The footer teaches the keys with Kbd. "Ask AI" is always the first row when
// there is text, so the fallback for "no match" is never a dead end.
//
// Accessibility — the field is a combobox that owns the listbox; ↑ ↓ move the
// active option (aria-activedescendant), Enter runs it, Escape closes and
// returns focus to whatever opened it. ⌘K / Ctrl+K toggles it from anywhere.

export interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Extra words that should match (synonyms, ids). */
  keywords?: string[];
  shortcut?: string[];
  onSelect: () => void;
}

export interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
  /** Adds an "Ask AI" row that receives the typed text. */
  onAsk?: (query: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  /** Toggle with ⌘K / Ctrl+K anywhere on the page (default on). */
  shortcut?: boolean;
  /** Render inline instead of in a portal (stories and screenshots). */
  inline?: boolean;
  /** Starting text (stories). */
  defaultQuery?: string;
}

const matches = (item: CommandItem, q: string) => {
  if (!q) return true;
  const hay = [item.label, ...(item.keywords ?? [])].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((w) => hay.includes(w));
};

export function CommandMenu({
  open,
  onOpenChange,
  groups,
  onAsk,
  placeholder = "Type a command or search…",
  emptyMessage = "No results.",
  shortcut = true,
  inline = false,
  defaultQuery = "",
}: CommandMenuProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [active, setActive] = useState(0);
  const dialogRef = useDialogFocus<HTMLDivElement>(open && !inline);
  const uid = useId();

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut, open, onOpenChange]);

  useEffect(() => {
    if (!open) setQuery(defaultQuery);
  }, [open, defaultQuery]);

  const filtered = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          items: g.items.filter((i) => matches(i, query.trim())),
        }))
        .filter((g) => g.items.length),
    [groups, query],
  );
  const ask: CommandItem | null =
    onAsk && query.trim()
      ? {
          id: "ask",
          label: `Ask AI: “${query.trim()}”`,
          icon: <Sparkles />,
          onSelect: () => onAsk(query.trim()),
        }
      : null;
  const flat = [...(ask ? [ask] : []), ...filtered.flatMap((g) => g.items)];
  const current = Math.min(active, Math.max(0, flat.length - 1));
  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const run = (item: CommandItem) => {
    item.onSelect();
    onOpenChange(false);
  };
  const optionId = (item: CommandItem) => `${uid}-${item.id}`;
  const row = (item: CommandItem) => {
    const i = flat.indexOf(item);
    const on = i === current;
    return (
      <li
        key={item.id}
        id={optionId(item)}
        role="option"
        aria-selected={on}
        onMouseMove={() => setActive(i)}
        onClick={() => run(item)}
        className={cn(
          "flex cursor-pointer items-center gap-10px rounded-sm px-10px py-8px text-sm leading-5 text-text-primary [&_svg]:size-4",
          on && "bg-interactive-default",
        )}
      >
        {item.icon ? (
          <span className="shrink-0 text-icon-muted" aria-hidden>
            {item.icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        {item.shortcut ? <Kbd keys={item.shortcut} aria-hidden /> : null}
      </li>
    );
  };

  const panel = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal={!inline || undefined}
      aria-label="Command menu"
      className="flex w-[560px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-lg bg-surface-container-high shadow-lg"
      onKeyDown={(e) => {
        if (e.key === "ArrowDown")
          setActive((current + 1) % Math.max(1, flat.length));
        else if (e.key === "ArrowUp")
          setActive((current - 1 + flat.length) % Math.max(1, flat.length));
        else if (e.key === "Home") setActive(0);
        else if (e.key === "End") setActive(flat.length - 1);
        else if (e.key === "Enter" && flat[current]) run(flat[current]);
        else if (e.key === "Escape") onOpenChange(false);
        else return;
        e.preventDefault();
      }}
    >
      <div className="flex items-center gap-10px border-b border-border-subtle px-16px">
        <Search className="size-4 shrink-0 text-icon-muted" aria-hidden />
        <input
          data-autofocus
          role="combobox"
          aria-expanded={flat.length > 0}
          aria-controls={flat.length ? `${uid}-list` : undefined}
          aria-activedescendant={
            flat[current] ? optionId(flat[current]) : undefined
          }
          aria-label="Search commands"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-48px min-w-0 flex-1 bg-transparent text-base text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>
      {flat.length === 0 ? (
        <p
          role="status"
          className="m-0 px-16px py-32px text-center text-sm text-text-secondary"
        >
          {emptyMessage}
        </p>
      ) : (
        <ul
          id={`${uid}-list`}
          role="listbox"
          aria-label="Commands"
          className="m-0 max-h-[360px] list-none overflow-y-auto p-6px [scrollbar-width:thin]"
        >
          {ask ? row(ask) : null}
          {filtered.map((g) => (
            <li key={g.heading} role="presentation">
              <p
                className="m-0 px-10px pb-4px pt-10px text-text-xxs font-medium uppercase leading-4 tracking-wide text-text-secondary"
                aria-hidden
              >
                {g.heading}
              </p>
              <ul
                role="group"
                aria-label={g.heading}
                className="m-0 list-none p-0"
              >
                {g.items.map(row)}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <div
        className="flex items-center gap-16px border-t border-border-subtle px-16px py-8px text-text-xxs leading-4 text-text-secondary"
        aria-hidden
      >
        <span className="flex items-center gap-6px">
          <Kbd keys={["↑", "↓"]} /> Navigate
        </span>
        <span className="flex items-center gap-6px">
          <Kbd>↵</Kbd> Run
        </span>
        <span className="flex items-center gap-6px">
          <Kbd>esc</Kbd> Close
        </span>
      </div>
    </div>
  );

  if (inline) return panel;
  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[var(--z-index-scrim)] bg-surface-scrim opacity-scrim"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-[var(--z-index-modal)] flex justify-center px-16px pt-[15vh]">
        <div className="pointer-events-auto h-fit">{panel}</div>
      </div>
    </>,
    document.body,
  );
}
