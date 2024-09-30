import { ButtonHTMLAttributes } from "react";
import styles from "./page.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: "sm" | "md" | "lg" ;
    variant: "primary" | "secondary";
}

export default function Button({ children, size, variant, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`${styles.button} ${styles[size]} ${styles[variant]}`}
        >
            {children}
        </button>
    )
}