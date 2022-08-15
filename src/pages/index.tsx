import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === '/') {
      Router.push('/login');
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>BBVS</title>
        <meta name="description" content="Blockchain based voting system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
