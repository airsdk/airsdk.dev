import React from 'react';
import clsx from 'clsx';
import styles from './HomepageLinks.module.css';
import Link from '@docusaurus/Link';

const LinksList = [
  {
    title: "Beginner's Guide",
    Svg: require('../../static/images/getstarted_desktop.svg').default,
    description: <>Get started using AIR.</>,
    link: '/docs/basics/getting-started',
  },
  {
    title: 'Tutorials',
    Svg: require('../../static/images/tutorial_desktop.svg').default,
    description: (
      <>Find tutorials from novice to expert to help you expand your skills.</>
    ),
    link: '/docs/tutorials',
  },
  {
    title: 'Reference',
    Svg: require('../../static/images/usermanual_desktop.svg').default,
    description: <>Detailed reference documentation and step-by-step instructions.</>,
    link: '/reference',
  },
];

function LinkItem({ Svg, title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
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

export default function HomepageLinks() {
  return (
    <section className={styles.links}>
      <div className="container">
        <div className="row">
          {LinksList.map((props, idx) => (
            <LinkItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
