import { createContext, forwardRef, useContext } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Sidebar component set (Navigation page): State=Expanded (240px)
// / Collapsed (72px, icon-only). Collapsed hides labels rather than removing
// items, same as the Figma variant.
//
// `collapsed` goes through context instead of being passed to each item —
// callers set it once on <Sidebar>, and SidebarItem/SidebarBrand/
// SidebarFooter read it. Prop-drilling it through every child would make
// the collapsed state easy to get half-applied.
//
// Each nav item takes its own `icon` (Figma: one icon swap property per nav
// item — Resumen, Transacciones, Reportes, Clientes, Configuración). Collapsed is a 72px
// icon-only rail; labels are hidden, not removed.
// Hit area — each nav item row is 36 high; on touch the target extends to
// 48 x 48 without changing the visual.

const SidebarContext = createContext<{ collapsed: boolean }>({ collapsed: false })

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean
  brand?: ReactNode
  footer?: ReactNode
}

export function Sidebar({ className, collapsed = false, brand, footer, children, ...props }: SidebarProps) {
  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <aside
        className={cn(
          'flex h-full flex-col gap-8px bg-surface-container px-16px py-20px transition-[width]',
          collapsed ? 'w-[72px]' : 'w-[240px]',
          className,
        )}
        {...props}
      >
        {brand ? (
          <div className={cn('flex h-36px items-center gap-8px pb-12px', collapsed ? 'justify-center' : 'pl-8px')}>
            {brand}
          </div>
        ) : null}

        <div className="flex flex-col gap-8px">{children}</div>

        {/* Spacer — pins the footer to the bottom, matching the empty
            flex-fill frame Figma uses between the nav list and the footer. */}
        <div className="flex-1" />

        {footer ? (
          <div className={cn('flex items-center', collapsed ? 'justify-center' : 'justify-between pl-8px')}>
            {footer}
          </div>
        ) : null}
      </aside>
    </SidebarContext.Provider>
  )
}

/**
 * Header row: the workspace name as text. Figma (v0.90) — no logo in the
 * sidebar header; the product mark belongs to the page, not the nav. When
 * collapsed the row stays (36 high, empty) so the nav items keep their place.
 * `logo` is still accepted for products that need a mark, but is optional.
 */
export function SidebarBrand({ logo, name }: { logo?: ReactNode; name?: string }) {
  const { collapsed } = useContext(SidebarContext)
  return (
    <>
      {logo ? <span className="shrink-0">{logo}</span> : null}
      {!collapsed && name ? <span className="text-sm font-semibold text-text-primary">{name}</span> : null}
    </>
  )
}

export interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  active?: boolean
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, active, children, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext)
    return (
      <button
        ref={ref}
        type="button"
        aria-current={active ? 'page' : undefined}
        title={collapsed && typeof children === 'string' ? children : undefined}
        className={cn(
          'relative flex w-full items-center gap-10px rounded-sm px-10px py-8px text-sm font-medium outline-none transition-colors',
          'pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:top-1/2 pointer-coarse:after:h-48px pointer-coarse:after:-translate-y-1/2',
          'focus-visible:ring-1 focus-visible:ring-focus-ring',
          collapsed ? 'justify-center' : 'text-left',
          active ? 'bg-interactive-default text-text-primary' : 'text-text-secondary hover:text-text-primary',
          className,
        )}
        {...props}
      >
        {icon ? (
          <span className={cn('shrink-0 [&>svg]:size-5', active ? 'text-text-primary' : 'text-icon-muted')}>
            {icon}
          </span>
        ) : null}
        {!collapsed ? <span className="flex-1">{children}</span> : null}
      </button>
    )
  },
)
SidebarItem.displayName = 'SidebarItem'
