import React from 'react';
import {useLocation} from '@docusaurus/router'
import clsx from 'clsx';
import styles from './ASDocsFrame.module.css';
import ExternalLink from '@theme/Icon/ExternalLink';
import Link from '@docusaurus/Link';
import StaticFrame from '../general/IFrame';

export default function ASDocsFrame(props) {
  const { pathname } = useLocation();
  const components = pathname.split('/');
  let requestedContent = "/reference/actionscript/3.0/";
  for (var i = components.length-1; i >= 0; --i) {
    if (components[i].length > 0) {
      if (components[i] !== 'reference')
        requestedContent = '/reference/actionscript/' + components[i] + '/';
      break;
    }
  }
  return (
    <>
      <Link to={'pathname://'+requestedContent} className={clsx(styles.newWindowLink)}>open in new window <ExternalLink/></Link>
      <StaticFrame src={requestedContent} className={clsx(styles.fullwidthFrame)} />
    </>
  );
}
