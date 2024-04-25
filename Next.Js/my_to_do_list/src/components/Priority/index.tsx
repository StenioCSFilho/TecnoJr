import styles from './page.module.css'

interface PriorityProps {
    type: 'going' | 'low' | 'medium' | 'high' | 'finished';
}

export default function Priority({ type }: PriorityProps) {

    function getPriorityText() {
        switch (type) {
            case 'going':
                return '▶️ Em Andamento';
            case 'low':
                return '▶️ Baixa Prioridade';
            case 'medium':
                return '▶️ Média Prioridade';
            case 'high':
                return '⚠️ Alta Prioridade';
            case 'finished':
                return '✅ Concluído';
            default:
                return '▶️ Em Andamento';
        }
    }

    return (
        <span className={styles[type]}>
            {getPriorityText()}
        </span>
    )
}
