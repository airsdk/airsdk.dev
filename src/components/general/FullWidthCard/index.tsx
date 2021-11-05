import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function FullWidthCard(props) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={clsx('card', 'margin-bottom--lg', styles.fullwidthCard)}>
      <div className={clsx('row')}>
        <div className={clsx('col', 'col--4', styles.fullwidthLeft)}>{props.left}</div>
        <div className={clsx('col', 'col--8', styles.fullwidthRight)}>{props.right}</div>
      </div>
    </div>
  );
}
