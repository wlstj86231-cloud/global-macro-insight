"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])
  return (
    <div data-slot="dropdown-menu" ref={ref} style={{position:"relative",display:"inline-block"}}>
      {React.Children.map(children, child => React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, { __open: open, __setOpen: setOpen })
        : child
      )}
    </div>
  )
}
function DropdownMenuTrigger({ children, __open, __setOpen, ...props }: any) {
  return <div onClick={() => __setOpen?.(!__open)} style={{cursor:"pointer"}} {...props}>{children}</div>
}
function DropdownMenuContent({ children, className, __open, __setOpen, align="end", ...props }: any) {
  if (!__open) return null
  return (
    <div data-slot="dropdown-menu-content" className={cn("absolute z-50 min-w-32 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10", align==="end"?"right-0":"left-0", className)} style={{top:"100%",marginTop:4}} {...props}>
      {React.Children.map(children, child => React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, { __setOpen })
        : child
      )}
    </div>
  )
}
function DropdownMenuItem({ children, className, onClick, __setOpen, ...props }: any) {
  return <div data-slot="dropdown-menu-item" className={cn("flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground", className)} onClick={() => { onClick?.(); __setOpen?.(false); }} {...props}>{children}</div>
}
function DropdownMenuLabel({ children, className, ...props }: any) {
  return <div className={cn("px-1.5 py-1 text-xs font-medium text-muted-foreground", className)} {...props}>{children}</div>
}
function DropdownMenuSeparator({ className, ...props }: any) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} {...props}/>
}
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator }
