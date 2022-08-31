import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function StaticFrame(props) {
  return (
    <>
      <iframe src={props.src} className={clsx(styles.fullwidthFrame)}>
      </iframe>
    </>
  );
}
