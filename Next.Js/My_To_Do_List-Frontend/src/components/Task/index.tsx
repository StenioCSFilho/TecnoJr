import Style from "./page.module.css";
import Priority from "../Priority";
import { FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from 'axios';
import PrivateRoute from "../PrivateRoute";

interface TaskProps {
    id: number; // Adicione a propriedade id
    title: string;
    description?: string;
    priority?: 'going' | 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date | string;
    onDelete?: () => void;
}

export default function Task({ id, title, description, priority, deadline, onDelete }: TaskProps) {
    const [isChecked, setIsChecked] = useState(false); // Inicialize isChecked como false
    const [tasks, setTasks] = useState([]);

    // Função para concluir a tarefa
    const handleTaskCompletion = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const newStatus = isChecked ? 'going' : 'finished'; // Alterne entre 'going' e 'finished' com base no estado isChecked
                const response = await axios.patch(`http://localhost:3001/api/task/${id}`, { status: newStatus }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Atualize o estado local das tarefas após a conclusão bem-sucedida
                setTasks(response.data);
                // Alterne o estado isChecked
                setIsChecked(!isChecked);
            }
        } catch (error: any) {
            // Se houver um erro na solicitação, imprima-o no console
            console.error("Error completing task:", error.response?.data);
        }
    };

    // Verifique se a tarefa está concluída ao carregar a página
    useEffect(() => {
        const fetchTaskStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`http://localhost:3001/api/task/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // Verifique se a tarefa está marcada como concluída no backend
                    setIsChecked(response.data.status === 'finished');
                }
            } catch (error: any) {
                console.error("Error fetching task status:", error.response?.data);
            }
        };
        fetchTaskStatus();
    }, [id]); // Execute apenas quando o ID da tarefa mudar

    return (
        <PrivateRoute>
            <div className={`${Style.taskContainer} ${isChecked && Style.finished}`}>

                <header>

                    <div className={Style.options}>

                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                                setIsChecked(!isChecked);
                                // Chame a função para concluir a tarefa quando o checkbox for alterado
                                handleTaskCompletion();
                            }}
                        />

                        <div className={Style.info}>

                            <h3 className={Style.lineTitle}>
                                {title}
                            </h3>

                            <div className={Style.taskInfo}>

                                {deadline instanceof Date && (
                                    <p>Prazo: {deadline.toLocaleDateString()}</p>
                                )}

                                {priority && !isChecked ? (
                                    <Priority type={priority} />
                                ) : (
                                    isChecked && <Priority type="finished" />
                                )}

                            </div>

                        </div>

                        <button onClick={onDelete}>
                            <FiTrash2 />
                        </button>

                    </div>

                </header>

                {description && <p className={Style.description}>{description}</p>}

            </div>
        </PrivateRoute>
    )
}
