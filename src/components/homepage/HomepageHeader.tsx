import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './HomepageHeader.module.css';

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--5', styles.heroBannerLeft)}>
            <img src="/images/air_showcase.png" />
          </div>
          <div className={clsx('col col--7', styles.heroBannerRight)}>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--info button--lg"
                to="/docs/basics/getting-started"
              >
                Get Started
              </Link>
              <Link className="button button--primary button--lg" to="/docs/tutorials">
                Learn more &#10132;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
