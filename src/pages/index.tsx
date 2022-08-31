import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageCodeBlock from '@site/src/components/homepage/HomepageCodeBlock';
import HomepageFeature from '@site/src/components/homepage/HomepageFeature';
import HomepageFeatureAlt from '@site/src/components/homepage/HomepageFeatureAlt';
import HomepageHeader from '@site/src/components/homepage/HomepageHeader';
import HomepageLink from '@site/src/components/homepage/HomepageLink';
import styles from './index.module.css';

/*
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ed1c23">
<meta name="msapplication-TileColor" content="#ed1c23">
<meta name="theme-color" content="#ffffff">
*/

const FeatureList = [
  {
    title: 'Cross Platform',
    img: '/images/crossplatform.svg',
    // img: '/images/feature_a.jpg',
    // Svg: require('../../static/images/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        AIR enables developers to create and package cross platform games and applications
        for major platforms like iOS, Android, Windows and macOS all from a single code
        base.
        <br />
        <br />
        <code>Less code = faster development!</code>
      </>
    ),
  },
  {
    title: 'Mature Environment',
    img: '/images/expanse.svg',
    // img: '/images/feature_b.jpg',
    // Svg: require('../../static/images/airsdk_box.png').default,
    description: (
      <>
        AIR was originally released in 2008 so has a wealth of examples, tutorials and
        guides providing a vast resource for developers. Tooling is also mature and
        readily available including tight integration with animation tools such as Animate
        which make animation and asset creation easy.
      </>
    ),
  },
  {
    title: 'Develop Locally',
    img: '/images/simulation.png',
    // img: '/images/air-for.png',
    // Svg: require('../../static/images/undraw_docusaurus_react.svg').default,
    description: (
      <>
        While developing you can use the local AIR simulator for fast development and
        quick iteration testing. This speeds up development time not requiring to deploy
        to devices or even processor-heavy device simulators.
      </>
    ),
  },
  {
    title: 'Native Extensions',
    img: '/images/ane-icon-black-border.png',
    // img: '/images/air-for.png',
    // Svg: require('../../static/images/undraw_docusaurus_react.svg').default,
    description: (
      <>
        AIR has the ability to implement native functionality simply and there are a
        wealth of native extensions available to AIR developers providing everything from
        in-app billing to processing complex algorithms.
      </>
    ),
  },
];

const LinksList = [
  {
    title: "Beginner's Guide",
    Svg: require('../../static/images/get-started.svg').default,
    description: <>Get started using AIR.</>,
    link: '/docs/basics/getting-started',
  },
  {
    title: 'Tutorials',
    Svg: require('../../static/images/tutorial.svg').default,
    description: (
      <>Find tutorials from novice to expert to help you expand your skills.</>
    ),
    link: '/docs/tutorials',
  },
  {
    title: 'Reference',
    Svg: require('../../static/images/reference.svg').default,
    description: <>Detailed reference documentation and step-by-step instructions.</>,
    link: '/reference/latest',
  },
];

const CodeBlocks = [
  {
    title: (
      <>
        <img src="/images/actionscript_icon.png" height="30px" /> Hello World!{' '}
      </>
    ),
    description: (
      <>
        The code here represents a basic application that displays a text field with the
        text "Hello World!". It demonstrates extending the base <code>Sprite</code>{' '}
        display object and uses the <code>TextField</code> object to display the text.
      </>
    ),
    language: 'actionscript',
    codesrc: 'simple-example.as',
    code: `package 
{
    import flash.display.Sprite;
    import flash.text.TextField;

    public class MyApp extends Sprite
    {
        private var textField : TextField;
        
        public function MyApp():void 
        {
            textField = new TextField();
            textField.text = "Hello World!";
            addChild( textField );
        }
    }
}`,
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.description}>
      <HomepageHeader />

      <main>
        <section className={styles.features}>
          <div className="container">
            <div>
              {FeatureList.map((props, idx) => {
                return (
                  <HomepageFeature key={idx} id={idx} reverse={idx % 2 == 0} {...props} />
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.codeExamples}>
          <div className="container">
            <div>
              {CodeBlocks.map((props, idx) => {
                if (idx % 2 == 0) {
                  return <HomepageCodeBlock key={idx} id={idx} {...props} />;
                } else {
                  return <HomepageCodeBlock key={idx} id={idx} {...props} />;
                }
              })}
            </div>
          </div>
        </section>

        <section className={styles.links}>
          <div className="container">
            <div className={clsx('box', 'row')}>
              {LinksList.map((props, idx) => (
                <HomepageLink key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
