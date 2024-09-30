"use client"

import { FormEvent } from 'react';
import styles from "./page.module.css"
import Button from '../../components/Button'

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push('/tasks')

  }

  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <h1>My To Do List</h1>
      </header>

      <div className={styles.loginContainer}>
        <header className={styles.loginHeader}>
          <h1>
            Login
          </h1>
        </header>

        <form 
        onSubmit={(e) => handleFormSubmit(e)}
        className={styles.formContainer}>

          <header className={styles.titleInput}>
            <p>
              Usuário
            </p>
          </header>
          
          <input type="text" className={styles.input} />

          <header className={styles.titleInput}>
            <p>
              Senha
            </p>
          </header>
          <input type="text" className={styles.input} />

          <Button 
          size='lg'
          variant='primary'
          type='submit'
          >
            Entrar
          </Button>

        </form>

      </div>
    </div >
  );
}
