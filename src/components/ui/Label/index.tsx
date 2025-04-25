import type { LabelHTMLAttributes, ReactNode } from "react"
import "./styles.scss"

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
  className?: string
}

export const Label = ({ children, className = "", ...props }: LabelProps) => {
  return (
    <label className={`label ${className}`} {...props}>
      {children}
    </label>
  )
}