"use client"
import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props}/>
}
function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props}/>
}
function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props}/>
}
function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props}/>
}
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return <DialogPrimitive.Backdrop data-slot="dialog-overlay" className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",className)} {...props}/>
}
function DialogContent({ className, children, showCloseButton=true, ...props }: DialogPrimitive.Popup.Props & {showCloseButton?:boolean}) {
  return(<DialogPortal><DialogOverlay/><DialogPrimitive.Popup data-slot="dialog-content" className={cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-6 ring-1 ring-foreground/10",className)} {...props}>{children}{showCloseButton&&(<DialogPrimitive.Close render={<Button variant="ghost" className="absolute top-2 right-2" size="sm"/>}><XIcon size={16}/></DialogPrimitive.Close>)}</DialogPrimitive.Popup></DialogPortal>);
}
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2",className)} {...props}/>
}
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title className={cn("text-base font-medium",className)} {...props}/>
}
export { Dialog, DialogClose, DialogContent, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger }
