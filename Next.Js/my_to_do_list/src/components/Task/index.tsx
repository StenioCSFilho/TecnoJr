import Style from "./page.module.css"
import Priority from "../Priority";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

interface TaskProps {
    title: string;
    description?: string;
    priority?: 'going' | 'low' | 'medium' | 'high' | 'finished' | null;
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

                    <div className={Style.options}>

                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />

                        <div className={Style.info}>

                            <h3 className={Style.lineTitle}>
                                {title}
                            </h3>

                            <div className={Style.taskInfo}>

                                {deadline && (
                                    <p>Prazo: {deadline?.toLocaleDateString()}</p>
                                )}

                                {priority && !isChecked ? (
                                    <Priority type={priority} />
                                ) : (
                                    isChecked && <Priority type="finished" />
                                )
                                }

                            </div>

                        </div>

                        <button onClick={onDelete}>
                            <FiTrash2 />
                        </button>

                    </div>

                </header>

                {description && <p className={Style.description}>{description}</p>}

            </div>

        </>
    )
}