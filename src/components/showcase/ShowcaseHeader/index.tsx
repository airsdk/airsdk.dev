import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function ShowcaseHeader({ title, description, linkText, linkUrl }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.showcaseHeader)}>
      <div className="container">
        <div className="text--center">
          <h1 className="hero__title">{title}</h1>

          <div>
            <img src="/images/air_showcase.png" />
          </div>

          <p className="hero__subtitle">{description}</p>

          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to={linkUrl}>
              {linkText} &#10132;
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
