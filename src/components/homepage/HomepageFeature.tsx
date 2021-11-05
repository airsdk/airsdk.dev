import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeature.module.css';

export default function HomepageFeature({ id, img, title, description, reverse }) {
  return (
    <div
      className={clsx(
        'row',
        styles.feature,
        'box',
        reverse ? styles.featureReverse : styles.featureForward
      )}
    >
      <div className={clsx('col col--6', styles.image)}>
        <div className="text--center">
          <img src={img} />
        </div>
      </div>
      <div className={clsx('col col--6', styles.content)}>
        <div className="text--center padding-horiz--md">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{description}</p>
        </div>
      </div>
    </div>
  );
}
