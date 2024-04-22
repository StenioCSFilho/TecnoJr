'use client'

import { useState } from "react"
import Styles from "./page.module.css"

import Button from "@/components/Button"
import Task from "@/components/Task"
import Priority from "@/components/Priority"
import { decodeAction } from "next/dist/server/app-render/entry-base"

interface Task {
    id: number;
    title: string;
    description: string;
    priority?: 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date | null;
}

type PriorityType = 'low' | 'medium' | 'high' | 'finished' | null;

export default function Tasks() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [tasks, setTasks] = useState([] as Task[])
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: null,
        deadline: null,
    } as Task);

    return (
        <>
            {modalIsOpen && (
                <div className={Styles.modal}>
                    <div className={Styles.modalContent}>
                        <header>
                            <h2>Nova Tarefa</h2>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => setModalIsOpen(false)}
                            >
                                X
                            </Button>
                        </header>

                        <form className={Styles.form}>
                            <input
                                type="text"
                                placeholder="Título"
                                onChange={(e) => setNewTask({
                                    ...newTask,
                                    title: e.target.value
                                })}
                            />

                            <div>
                                <select
                                    value={newTask.priority || "no"}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            priority: (e.target.value === "no" ?
                                                null : e.target.value) as
                                                PriorityType
                                        })
                                    }
                                >
                                    <option value="no">Sem Prioridade</option>
                                    <option value="low">
                                        <Priority type="low" />
                                    </option>
                                    <option value="medium">
                                        <Priority type="medium" />
                                    </option>
                                    <option value="high">
                                        <Priority type="high" />
                                    </option>
                                </select>

                                <input
                                    type="date"
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

                            <Button
                                size="lg"
                                variant="primary"
                            >
                                Adicionar
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            <div className={Styles.container}>
                <p>Bem Vindo, usuário</p>

                <header className={Styles.header}>
                    <h1>Tarefas</h1>
                    <Button
                        size="md"
                        variant="secondary"
                        onClick={() => setModalIsOpen(true)}
                    >
                        + Nova Tarefa
                    </Button>
                </header>

                <main className={Styles.main}>
                    <Task
                        title="Título 01"
                        deadline={new Date()}
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet magna dui. Morbi vulputate blandit tellus, sed pellentesque justo gravida accumsan. Quisque auctor consequat turpis, nec condimentum sem tempus vel. Mauris vitae dignissim dolor. Phasellus vitae est dui. Praesent nec leo lobortis, imperdiet lacus at, rutrum risus. Maecenas ut urna at dolor sollicitudin sodales."
                        priority='low'
                    />
                </main>
            </div>
        </>

    )
}