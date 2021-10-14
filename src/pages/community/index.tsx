import React, { useState, useMemo, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import CommunityHeader from '../../components/community/CommunityHeader';
import FullWidthCard from '../../components/general/FullWidthCard';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const TITLE = 'AIR Community';
const DESCRIPTION =
  'AIR has been around for many years so you will find content in many places. Here we have listed the best ways to get involved in the AIR community as well as resources to answer your questions.';

function Community() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <CommunityHeader title={TITLE} description={DESCRIPTION} />
      <main className="container margin-vert--lg">
        {/* GITHUB - Discussions */}
        <FullWidthCard
          left={
            <div>
              <div>
                <img src="/images/discussions.svg" />
              </div>
              <h3>Discussions</h3>
              <p>
                Get involved with the AIR community in the discussion forum on GitHub.
                This space is used by AIR developers to ask questions about development
                with AIR.
              </p>
              <div>
                <Link
                  className="button button--primary button--md"
                  to="https://github.com/airsdk/Adobe-Runtime-Support/discussions"
                >
                  Get involved &#10132;
                </Link>
              </div>
            </div>
          }
          right={
            <div className={styles.screenshot}>
              <img src="/images/github_discussions_screen.png" />
            </div>
          }
        />

        {/* GITHUB - Issues */}
        <FullWidthCard
          left={
            <div>
              <div>
                <img src="/images/GitHub_Logo.png" />
              </div>
              <h3>Issue Tracker</h3>
              <p>
                Run into an issue or have a feature you would like to get added to AIR,
                head to the GitHub issue tracker.
              </p>
              <div>
                <Link
                  className="button button--primary button--md"
                  to="https://github.com/airsdk/Adobe-Runtime-Support/issues"
                >
                  See the issue tracker &#10132;
                </Link>
              </div>
            </div>
          }
          right={
            <div className={styles.screenshot}>
              <img src="/images/github_issuetracker_screen.png" />
            </div>
          }
        />

        {/* STARLING FORUM */}
        <FullWidthCard
          left={
            <div>
              <div>
                <img src="/images/starling_logo.png" />
              </div>
              <h3>Starling Forum</h3>
              <p>
                Starling is one of the widest used libraries for AIR and the forum is very
                active not only for support on Starling but anything related to AIR
                development.
              </p>
              <div>
                <Link
                  className="button button--primary button--md"
                  to="https://forum.starling-framework.org/"
                >
                  Forum &#10132;
                </Link>
              </div>
            </div>
          }
          right={
            <div className={styles.screenshot}>
              <img src="/images/starling_forum_screen.png" />
            </div>
          }
        />

        {/* STACK OVERFLOW */}
      </main>
    </Layout>
  );
}

export default Community;
