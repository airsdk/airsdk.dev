import React, { Component } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>airsdk</title>
        <meta name="description" content="AIR SDK developer site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/images/air-logo.png" height={180} width={180} alt="AIR Logo" />

        <h1>airsdk developer portal</h1>
        <h2>coming soon</h2>

        <br />
        <div>
          Go to the{' '}
          <a className="title" href="https://airsdk.harman.com">
            Harman AIR SDK site
          </a>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
