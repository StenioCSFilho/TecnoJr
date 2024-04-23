import Style from "./page.module.css"
import Priority from "../Priority";
import { FiTrash } from "react-icons/fi";
import { useState } from "react";

interface TaskProps {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date;
    onDelete?: () => void;
}

export default function Task({ title, description, priority, deadline, onDelete }: TaskProps) {
    const [isChecked, setIsChecked] = useState(
        priority === 'finished' ? true : false
    )

    return (
        <>
            <div className={`${Style.taskContainer} ${isChecked && Style.finished}`}>
                <header>
                    <h3>{title}</h3>
                    <div className={Style.options}>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <button
                            onClick={onDelete}
                        >
                            <FiTrash />
                        </button>
                    </div>
                </header>

                <div className={Style.taskInfo}>
                    {priority && !isChecked ? (
                        <Priority type={priority} />
                    ) : (
                        isChecked && <Priority type="finished" />
                    )
                    }

                    {deadline && (
                        <p>Prazo: {deadline?.toLocaleDateString()}</p>
                    )}
                </div>

                {description && <p className={Style.description}>{description}</p>}

            </div>
        </>
    )
}