import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';


const FeatureList = [
  {
    title: 'Cross Platform',
    img: 'https://plchldr.co/i/500x400?&bg=235889&fc=ffffff&text=PLACE-HOLDER',
    // img: '/images/feature_a.jpg',
    // Svg: require('../../static/images/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        AIR enables developers to create and package cross platform games and applications for 
        major platforms like iOS, Android, Windows and macOS all from a single code base
        decreasing development time. 
         
      </>
    ),
  },
  {
    title: 'Mature Environment',
    img: 'https://plchldr.co/i/500x400?&bg=235889&fc=ffffff&text=PLACE-HOLDER',
    // img: '/images/feature_b.jpg',
    // Svg: require('../../static/images/airsdk_box.png').default,
    description: (
      <>
        AIR was originally released in 2008 so has a wealth of examples, tutorials and guides providing 
        a vast resource for developers. Tooling is also mature and readily available including tight integration
        with animation tools such as Animate which make animation and asset creation easy.
      </>
    ),
  },
  {
    title: 'Develop Locally',
    img: 'https://plchldr.co/i/500x400?&bg=235889&fc=ffffff&text=PLACE-HOLDER',
    // img: '/images/air-for.png',
    // Svg: require('../../static/images/undraw_docusaurus_react.svg').default,
    description: (
      <>
        While developing you can use the local AIR simulator for fast development and quick iteration testing. 
        This speeds up development time not requiring to deploy to devices or even processor-heavy device simulators. 
      </>
    ),
  },
  {
    title: 'Native Extensions',
    img: 'https://plchldr.co/i/500x400?&bg=235889&fc=ffffff&text=PLACE-HOLDER',
    // img: '/images/air-for.png',
    // Svg: require('../../static/images/undraw_docusaurus_react.svg').default,
    description: (
      <>
        AIR has the ability to implement native functionality simply and there are a wealth of native extensions 
        available to AIR developers providing everything from in-app billing to processing complex algorithms.
      </>
    ),
  },
];




function Feature( { id, Svg, img, title, description } ) {
  return (
    <div className={clsx('row', styles.feature, 'box')}>
      <div className={clsx('col col--6')}>
        <div className="text--center">
          {/* <Svg className={styles.featureSvg} alt={title} /> */}
          <img src={img} />
        </div>
      </div>
      <div className={clsx('col col--6', styles.content)}>
        <div className="text--center padding-horiz--md">
          <h2 className={styles.title}>{title}</h2>
          <p  className={styles.subtitle}>{description}</p>
        </div>
      </div>
    </div>
  );
}



export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} id={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
