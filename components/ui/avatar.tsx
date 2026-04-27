import * as React from "react"
import { cn } from "@/lib/utils"
function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="avatar" className={cn("relative flex size-8 shrink-0 rounded-full overflow-hidden",className)} {...props}/>
}
function AvatarImage({ className, src, alt="", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [err, setErr] = React.useState(false)
  if (err || !src) return null
  return <img src={src} alt={alt} onError={()=>setErr(true)} className={cn("aspect-square size-full rounded-full object-cover",className)} {...props}/>
}
function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="avatar-fallback" className={cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground",className)} {...props}/>
}
export { Avatar, AvatarImage, AvatarFallback }
