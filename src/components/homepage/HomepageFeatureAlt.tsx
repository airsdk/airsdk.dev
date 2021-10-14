import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatureAlt.module.css';

export default function HomepageFeatureAlt({ id, img, title, description }) {
  return (
    <div className={clsx('row', styles.feature, 'box')}>
      <div className={clsx('col col--6', styles.content)}>
        <div className="text--center padding-horiz--md">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{description}</p>
        </div>
      </div>
      <div className={clsx('col col--6')}>
        <div className="text--center">
          {/* <Svg className={styles.featureSvg} alt={title} /> */}
          <img src={img} />
        </div>
      </div>
    </div>
  );
}
