import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, MenuItem } from "@/components/Menu";
import { Kbd } from "@/components/Kbd";
import { cn } from "@/lib/utils";

// Context Menu (Navigation page, Figma v1.3): the Menu opened by a right
// click (or the keyboard's Menu key / Shift+F10) on an area — a table row, a
// chart, a canvas — at the point where it was opened.
//
// Why — context menus are fast for people who know they exist and invisible
// to everyone else, so they are a shortcut, never the only route: every item
// here must also be reachable from a visible control (a row's ⋯ button, a
// toolbar). It reuses Menu and Menu Item unchanged, so it looks and behaves
// like every other menu; shortcuts are shown with Kbd. Destructive items go
// last, after a separator, in text/error.
//
// Keyboard — focus moves to the first item; ↑ ↓ move, Home / End jump, Enter
// runs, Escape or Tab closes and returns focus to where it was.

export interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  shortcut?: string[];
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  /** Draws a separator above this item. */
  separator?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  /** The area that opens the menu. */
  children: ReactNode;
  /** Accessible name of the menu. */
  label?: string;
  className?: string;
}

export function ContextMenu({
  items,
  children,
  label = "Actions",
  className,
}: ContextMenuProps) {
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const openAt = (x: number, y: number) => {
    returnTo.current = document.activeElement as HTMLElement | null;
    setAt({ x, y });
  };
  const close = () => {
    setAt(null);
    returnTo.current?.focus?.();
  };

  useEffect(() => {
    if (!at) return;
    const menu = menuRef.current;
    if (!menu) return;
    // Keep the menu inside the viewport.
    const r = menu.getBoundingClientRect();
    const x = Math.min(at.x, window.innerWidth - r.width - 8);
    const y = Math.min(at.y, window.innerHeight - r.height - 8);
    if (x !== at.x || y !== at.y)
      setAt({ x: Math.max(8, x), y: Math.max(8, y) });
    menu.querySelector<HTMLElement>("[role=menuitem]:not(:disabled)")?.focus();
    const outside = (e: MouseEvent) =>
      !menu.contains(e.target as Node) && setAt(null);
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [at]);

  const onMenuKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const list = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        "[role=menuitem]:not(:disabled)",
      ) ?? [],
    );
    const i = list.indexOf(document.activeElement as HTMLElement);
    const go = (n: number) => list[(n + list.length) % list.length]?.focus();
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(list.length - 1);
    else if (e.key === "Escape" || e.key === "Tab") close();
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={areaRef}
      className={className}
      onContextMenu={(e) => {
        e.preventDefault();
        openAt(e.clientX, e.clientY);
      }}
      onKeyDown={(e) => {
        if (e.key === "ContextMenu" || (e.shiftKey && e.key === "F10")) {
          e.preventDefault();
          const r = (e.target as HTMLElement).getBoundingClientRect();
          openAt(r.left + 8, r.bottom + 4);
        }
      }}
    >
      {children}
      {at ? (
        <div
          ref={menuRef}
          className="fixed z-[var(--z-index-dropdown)]"
          style={{ left: at.x, top: at.y }}
        >
          <Menu aria-label={label} onKeyDown={onMenuKey}>
            {items.map((item) => (
              <div
                key={item.label}
                role="none"
                className={cn(
                  item.separator &&
                    "mt-4px border-t border-border-subtle pt-4px",
                )}
              >
                <MenuItem
                  icon={item.icon}
                  leadingIcon={!!item.icon}
                  disabled={item.disabled}
                  className={cn(item.destructive && "text-text-error")}
                  onClick={() => {
                    item.onSelect?.();
                    close();
                  }}
                >
                  <span className="flex items-center justify-between gap-16px">
                    {item.label}
                    {item.shortcut ? (
                      <Kbd keys={item.shortcut} aria-hidden />
                    ) : null}
                  </span>
                </MenuItem>
              </div>
            ))}
          </Menu>
        </div>
      ) : null}
    </div>
  );
}
