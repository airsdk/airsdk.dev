import React, { useEffect } from "react";
import clsx from 'clsx';
import styles from './HomepageCodeBlock.module.css';
import Prism from 'prismjs';
import "../css/prism.css"

export default function HomepageCodeBlock( { id, code, language, title, description } ) {
  useEffect(() => {
    Prism.languages.actionscript=Prism.languages.extend("javascript",{keyword:/\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,operator:/\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/}),Prism.languages.actionscript["class-name"].alias="function",Prism.languages.markup&&Prism.languages.insertBefore("actionscript","string",{xml:{pattern:/(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,lookbehind:!0,inside:Prism.languages.markup}});
    Prism.highlightAll();
  }, []);
  return (
    <div className={clsx('row', styles.feature, 'box')}>
      <div className={clsx('col col--7')}>
        <div>
          <pre>
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </div>
      <div className={clsx('col col--5', styles.content)}>
        <div className="text--center padding-horiz--md">
          <h2 className={styles.title}>{title}</h2>
          <p  className={styles.subtitle}>{description}</p>
        </div>
      </div>
    </div>
  );
}


