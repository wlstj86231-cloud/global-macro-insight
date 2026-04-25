import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const buttonVariants = cva("inline-flex items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/80",outline:"border-border bg-background hover:bg-muted",secondary:"bg-secondary text-secondary-foreground",ghost:"hover:bg-muted hover:text-foreground",destructive:"bg-destructive/10 text-destructive hover:bg-destructive/20",link:" text-primary underline-offset-4 hover:underline"},size:{default:"h-8 px-2.5 gap-1.5",sm:"h-7 px-2.5 text-[0.8rem]",lg:"h-9 px-2.5",icon:"size-8","xS":"size-6"}},defaultVariants:{variant:"default",size:"default"}})
function Button({ className, variant="default", size="default", ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({variant,size,className}))} {...props}/>
}
export { Button, buttonVariants }