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
              <img src="/images/airsdk_box.png" />
            </div>
            <div className={clsx('col col--7', styles.heroBannerRight)}>
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link className="button button--secondary button--lg" to="/docs/basics/getting-started">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }