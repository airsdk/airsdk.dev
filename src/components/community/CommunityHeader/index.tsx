import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function CommunityHeader({ title, description }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.communityHeader)}>
      <div className="container">
        <div className="text--center">
          <h1 className="hero__title">{title}</h1>

          <div className={styles.communityContent}>{description}</div>
        </div>
      </div>
    </header>
  );
}
