"use client"

import { FormEvent } from 'react';
import Button from '../../components/Button'
import styles from "./page.module.css"

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push('/tasks')

  }

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <header className={styles.loginHeader}>
          <h1>📃 Gestor de Tarefas</h1>
          <p>Insira suas informações de Login</p>
        </header>

        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className={styles.formContainer}>
          <input
            type="text" className={styles.input}
            placeholder="Nome do usuário"
          />
          <input
            type="text" className={styles.input}
            placeholder="Senha"
          />
          <Button
            size='lg'
            variant='primary'
            type='submit'
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
}
