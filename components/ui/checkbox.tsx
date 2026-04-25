"use client"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" className={cn("flex size-4 items-center justify-center rounded border border-input data-checked:bg-primary data-checked:text-primary-foreground",className)} {...props}>
      <CheckboxPrimitive.Indicator className="grid place-content-center"><CheckIcon size={12}/></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
export { Checkbox }
