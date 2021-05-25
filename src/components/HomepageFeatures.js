import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';


const FeatureList = [
  {
    title: 'Cross Platform',
    Svg: require('../../static/images/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        AIR enables developers to create and package cross platform games and applications for major platforms like iOS, Android, Windows and macOS
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('../../static/images/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and
        move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('../../static/images/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can be
        extended while reusing the same header and footer.
      </>
    ),
  },
];




function Feature( { id, Svg, title, description } ) {
  return (
    <div className={clsx('row')}>
      <div className={clsx('col col--6')}>
        <div className="text--center">
          <Svg className={styles.featureSvg} alt={title} />
        </div>
      </div>
      <div className={clsx('col col--6')}>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}



export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} id={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
