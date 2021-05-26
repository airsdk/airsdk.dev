import React from 'react';
import clsx from 'clsx';
import styles from './HomepageLink.module.css';
import Link from '@docusaurus/Link';

export default function HomepageLink({ Svg, title, description, link }) {
  return (
    <div className={clsx('col col--4', styles.linkItem)}>
      <Link to={link}>
        <div className={styles.linkItemHeader}>
          <Svg className={styles.linkItemSvg} alt={title} />
        </div>
      </Link>
      <div className={styles.linkItemContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
