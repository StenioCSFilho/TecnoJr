import styles from './page.module.css'

interface PriorityProps {
    type: 'low' | 'medium' | 'high' | 'finished';
}

export default function Priority({ type }: PriorityProps) {

    function getPriorityText() {
        switch (type) {
            case 'low':
                return '🟢 Baixa Prioridade';
            case 'medium':
                return '🟡 Média Prioridade';
            case 'high':
                return '🔴 Alta Prioridade';
            case 'finished':
                return '✅ Concluída';
            default:
                return '🟢 Baixa Prioridade';
        }
    }

    return (
        <span className={styles[type]}>
            {getPriorityText()}
        </span>
    )
}