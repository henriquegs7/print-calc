import type { ButtonHTMLAttributes, ReactNode } from "react"
import "./styles.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: "default" | "outline"
  className?: string
}

export const Button = ({ children, variant = "default", className = "", ...props }: ButtonProps) => {
  const buttonClass = `button ${variant} ${className}`

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}
