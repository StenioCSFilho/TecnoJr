'use client'

import { FormEvent, useState } from "react"
import Styles from "./page.module.css"

import Priority from "@/components/Priority"
import Task from "@/components/Task"
import Button from "@/components/Button"
import { decodeAction } from "next/dist/server/app-render/entry-base"

interface Task {
    id: number;
    title: string;
    description: string;
    priority?: 'going' | 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date | null;
}

type PriorityType = 'going' | 'low' | 'medium' | 'high' | 'finished' | null;

export default function Tasks() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [idCounter, setIdCounter] = useState(0)
    const [tasks, setTasks] = useState([] as Task[])
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'going',
        deadline: null,
    } as Task);

    function handleAddNewTask(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setNewTask({
            ...newTask,
            id: idCounter
        })
        setTasks([...tasks, newTask])
        setIdCounter(idCounter + 1)
        setNewTask({
            id: idCounter,
            title: '',
            description: '',
            priority: 'going',
            deadline: null,
        })
        setModalIsOpen(false)
    }

    function handleDeleteTask(id: number) {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <>
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
                                            priority: (e.target.value === "no" ?
                                                null : e.target.value) as
                                                PriorityType
                                        })
                                    }
                                >
                                    <option value="no">
                                        <Priority type="going" />
                                    </option>
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

                        {tasks.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    title={task.title}
                                    description={task.description}
                                    {...task.priority && { priority: task.priority }}
                                    {...task.deadline && { deadline: task.deadline }}
                                    onDelete={() => handleDeleteTask(task.id)}
                                />
                            )
                        })}

                    </main>

                </div>
            </div>
        </>

    )
}