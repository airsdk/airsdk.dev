import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './HomepageCodeBlock.module.css';

import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';

export default function HomepageCodeBlock({ id, code, language, title, description }) {
  useEffect(() => {}, []);
  return (
    <div className={clsx('row', styles.feature, 'box')}>
      <div className={clsx('col col--7')}>
        <Highlight {...defaultProps} theme={vsDark} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
      <div className={clsx('col col--5', styles.content)}>
        <div className="text--center padding-horiz--md">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{description}</p>
        </div>
      </div>
    </div>
  );
}
