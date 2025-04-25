import type { InputHTMLAttributes } from "react"
import "./styles.scss"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export const Input = ({ className = "", ...props }: InputProps) => {
  return <input className={`input ${className}`} {...props} />
}
