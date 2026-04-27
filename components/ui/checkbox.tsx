"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}
function Checkbox({ className, onCheckedChange, onChange, checked, ...props }: CheckboxProps) {
  return (
    <div
      data-slot="checkbox"
      className={cn("flex size-4 cursor-pointer items-center justify-center rounded border border-input", className)}
      style={{background: checked ? 'var(--primary)' : 'transparent'}}
      onClick={() => onCheckedChange?.(!checked)}
    >
      {checked && <Check size={12} style={{color:'var(--primary-foreground)'}}/>}
      <input type="checkbox" className="sr-only" checked={checked} readOnly {...props}/>
    </div>
  )
}
export { Checkbox }
