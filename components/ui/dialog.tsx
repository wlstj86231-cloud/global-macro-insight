"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
interface DialogProps { open?: boolean; onOpenChange?: (open: boolean) => void; children?: React.ReactNode }
function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null
  return <div data-slot="dialog">{children}</div>
}
function DialogTrigger({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <span onClick={onClick}>{children}</span>
}
function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
function DialogOverlay({ className, onClick, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dialog-overlay" className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className)} onClick={onClick} {...props}/>
}
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> { showCloseButton?: boolean; onClose?: () => void }
function DialogContent({ className, children, showCloseButton=true, onClose, ...props }: DialogContentProps) {
  return (
    <>
      <DialogOverlay onClick={onClose}/>
      <div data-slot="dialog-content" className={cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-6 ring-1 ring-foreground/10", className)} {...props}>
        {children}
        {showCloseButton && <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded hover:bg-muted"><X size={16}/></button>}
      </div>
    </>
  )
}
function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2", className)} {...props}/>
}
function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-base font-medium", className)} {...props}/>
}
function DialogClose({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) {
  return <button onClick={onClick}>{children}</button>
}
export { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogClose }
