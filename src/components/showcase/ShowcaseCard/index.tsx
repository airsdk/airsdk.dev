import React, { memo } from 'react';

import styles from './styles.module.css';
import clsx from 'clsx';
import Image from '@theme/IdealImage';
import { Application } from '../../../data/applications';
import { Tag, TagType, Tags, TagList } from '../../../data/tags';
import { sortBy } from '../../../utils/jsUtils';

function TagIcon({ label, description, icon }: Tag) {
  return (
    <span className={styles.tagIcon} title={`${label}: ${description}`}>
      {icon}
    </span>
  );
}

function ShowcaseCardTagIcons({ tags }: { tags: TagType[] }) {
  const tagObjects = tags
    .map((tag) => ({ tag, ...Tags[tag] }))
    .filter((tagObject) => !!tagObject.icon);

  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag)
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => (
        <TagIcon key={index} {...tagObject} />
      ))}
    </>
  );
}

const ShowcaseCard = memo(function ({ application }: { application: Application }) {
  return (
    <div key={application.title} className="col col--4 margin-bottom--lg">
      <div className={clsx('card', styles.showcaseCard)}>
        <div className={clsx('card__image', styles.showcaseCardImage)}>
          <Image img={application.preview} alt={application.title} />
          {/* <img src={application.preview.default} alt={application.title} /> */}
          {/* <img src={require('@site/static/showcase/airpackagemanager.png').default} /> */}
        </div>
        <div className="card__body">
          <div className="avatar">
            <div className="avatar__intro margin-left--none">
              <div className={styles.titleIconsRow}>
                <div className={styles.titleIconsRowTitle}>
                  <div className="avatar__name">{application.title}</div>
                </div>
                <div className={styles.titleIconsRowIcons}>
                  <ShowcaseCardTagIcons tags={application.tags} />
                </div>
              </div>
              <small className="avatar__subtitle">{application.description}</small>
            </div>
          </div>
        </div>
        {(application.website || application.appStoreUrl || application.playStoreUrl) && (
          <div className="card__footer">
            <div className={clsx(styles.storeButtons)}>
              {application.appStoreUrl && (
                <a
                  className=""
                  href={application.appStoreUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src="/images/appstore.svg" alt="Download on the App Store" />
                </a>
              )}
              {application.playStoreUrl && (
                <a
                  className=""
                  href={application.playStoreUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src="/images/playstore.png" alt="Get it on Google Play" />
                </a>
              )}
            </div>

            <div className="button-group button-group--block">
              {application.website && (
                <a
                  className="button button--small button--info button--block"
                  href={application.website}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ShowcaseCard;
