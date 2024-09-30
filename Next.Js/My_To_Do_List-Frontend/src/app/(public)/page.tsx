"use client"

import { FormEvent, useState } from 'react';
import styles from "./page.module.css"
import Button from '../../components/Button'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState(
    {
      email: '',
      password: '',
    }
  )

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios.post('http://localhost:3001/api/login', credentials)
    .then((response) => {
      localStorage.setItem('token', response.data.accessToken);
      router.push('/tasks');
    })
    .catch((error) => {
      console.log(error);
    });
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
          
          <input 
          type="text" 
          className={styles.input} 
          onChange={(e) => setCredentials(
            {
              ...credentials,
              email: e.target.value,
            }
          )} 
          />

          <header className={styles.titleInput}>
            <p>
              Senha
            </p>
          </header>
          <input 
          type="password" 
          className={styles.input} 
          onChange={(e) => setCredentials(
            {
              ...credentials,
              password: e.target.value,
            }
          )} 
          />

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
