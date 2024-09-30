'use client'

import { FormEvent, useEffect, useState } from "react"
import Styles from "./page.module.css"

import Priority from "@/components/Priority"
import Task from "@/components/Task"
import Button from "@/components/Button"
import PrivateRoute from "@/components/PrivateRoute"
import { decodeAction } from "next/dist/server/app-render/entry-base"
import axios from "axios"
import router from "next/router"


interface Task {
    id: number;
    title: string;
    description: string;
    status: 'Em andamento';
    deadline?: Date | string | null;
    priority?: 'low' | 'medium' | 'high' | 'finished' | null;
    userId: number;
}

type PriorityType = 'low' | 'medium' | 'high' | 'finished' | null;

export default function Tasks() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [idCounter, setIdCounter] = useState(0)
    const [tasks, setTasks] = useState([] as Task[])
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'Em andamento',
        priority: 'low',
        deadline: new Date().toISOString(),
        userId: 1, // Defina o ID do usuário corretamente aqui
    } as unknown as Task);

    useEffect(() => {
        // Função para buscar dados do banco de dados
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('http://localhost:3001/api/tasks', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        // Chama a função para buscar dados do banco de dados ao montar o componente
        fetchData();
    }, []); // [] como segundo argumento para garantir que useEffect seja chamado apenas uma vez ao montar o componente

    async function handleAddNewTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        // Adicione aqui a lógica para obter o token de autenticação do localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }
    
        // Defina a URL da API
        const apiUrl = 'http://localhost:3001/api/task';
    
        // Crie a nova tarefa com os dados do estado
        const newTaskData = {
            ...newTask,
            userId: 1 // Defina o ID corretamente, se necessário
        };
    
        // Faça a solicitação POST para a API usando o Axios
        await axios.post(apiUrl, newTaskData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            // Se a solicitação for bem-sucedida, adicione a nova tarefa à lista de tarefas no estado
            setTasks([...tasks, response.data]);
    
            // Atualize o contador de ID e limpe os campos do formulário
            setIdCounter(idCounter + 1);
            setNewTask({
                title: '',
                description: '',
                status: 'Em andamento',
                priority: 'low',
                deadline: new Date(),
                userId: 1, // Defina o ID do usuário corretamente aqui
                id: idCounter,
            });
    
            // Feche o modal
            setModalIsOpen(false);
        })
        .catch(error => {
            // Se houver um erro na solicitação, imprima-o no console
            console.error('Error adding new task:', error.response.data);
        });
    }
           

    async function handleDeleteTask(id: number) {
        try {
            // Enviar solicitação DELETE para a API
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            const apiUrl = `http://localhost:3001/api/task/${id}`;
            await axios.delete(apiUrl, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    
            // Atualizar o estado local removendo a tarefa excluída
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return (
        <PrivateRoute>
            {modalIsOpen && (
                <div className={Styles.modal}>
                    <div className={Styles.modalContent}>

                        <form
                            onSubmit={(e) => handleAddNewTask(e)}
                            className={Styles.form}
                        >

                            <div className={Styles.modalHeader}>
                                <input
                                    type="text"
                                    placeholder="Título"
                                    onChange={(e) => setNewTask({
                                        ...newTask,
                                        title: e.target.value
                                    })}
                                />

                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => setModalIsOpen(false)}
                                >
                                    X
                                </Button>
                            </div>

                            <div>
                                <p className={Styles.modalLineH}></p>
                            </div>

                            <div className={Styles.modalSelect}>

                            <select
                                value={newTask.priority || "no"}
                                onChange={(e) =>
                                    setNewTask({
                                        ...newTask,
                                        priority: (e.target.value === "" ?
                                            null : e.target.value) as PriorityType
                                    })
                                }
                            >
                                <option value="low">Baixa Prioridade</option>
                                <option value="medium">Média Prioridade</option>
                                <option value="high">Alta Prioridade</option>
                            </select>

                                <input
                                    type="date"
                                    className={Styles.inputDate}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            deadline: e.target.value ? new Date(e.target.value) : null
                                        })
                                    }
                                />
                            </div>

                            <textarea
                                placeholder="Descrição"
                                onChange={(e) =>
                                    setNewTask({
                                        ...newTask,
                                        description: e.target.value
                                    })
                                }
                            />
                            <div className={Styles.modalButton}>
                                <Button
                                    size="lg"
                                    variant="primary"
                                >
                                    Adicionar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className={Styles.container}>

                <div className={Styles.titleContainer}>
                    <header>
                        <h1>My To Do List</h1>
                    </header>
                </div>

                <div className={Styles.tasksContainer}>

                    <header className={Styles.header}>
                        <h2>Tarefas</h2>
                        <Button
                            size="md"
                            variant="primary"
                            onClick={() => setModalIsOpen(true)}
                        >
                            + Nova Tarefa
                        </Button>
                    </header>

                    <div className={Styles.headerContainer}>
                        <p className={Styles.lineH}></p>
                    </div>

                    <main className={Styles.main}>
                    {tasks.map((task, index) => {
    const formattedDeadline: string | Date | undefined = task.deadline instanceof Date ? task.deadline : (task.deadline ? new Date(task.deadline) : undefined);
    return (
        <Task
            key={index} // Use index como key, já que os IDs não estão disponíveis
            title={task.title}
            description={task.description}
            priority={task.priority}
            deadline={formattedDeadline}
            id={task.id}
            onDelete={() => handleDeleteTask(task.id)}
        />
    )
})}

                    </main>

                </div>
            </div>
        </PrivateRoute>
    )
}

