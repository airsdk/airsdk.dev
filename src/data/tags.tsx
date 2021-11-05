import React from 'react';

export type TagType =
  | 'highlight'
  | 'game'
  | 'utility'
  | 'entertainment'
  | 'social'
  | 'education'
  | 'commandline'
  | 'mobile'
  | 'desktop'
  | 'tv';

export type Tag = {
  label: string;
  description: string;
  icon: JSX.Element;
};

// LIST OF AVAILABLE TAGS
// Available tags to assign to your site
// Please choose widely, we'll remove unappropriate tags
export const Tags: Record<TagType, Tag> = {
  // DO NOT USE THIS TAG: we choose sites to add to highlight
  highlight: {
    label: 'Highlight',
    description: 'Amazong applications that you should check-out!',
    icon: (
      <>
        <img src="/images/tags/highlight.png" alt="highlight" />
      </>
    ),
  },

  game: {
    label: 'Game',
    description: 'A game application',
    icon: (
      <>
        <img src="/images/tags/game.png" alt="game" />
      </>
    ),
  },

  utility: {
    label: 'Utility',
    description: 'A utility application, handy tools like a weather application',
    icon: (
      <>
        <img src="/images/tags/utility.png" alt="utility" />
      </>
    ),
  },

  entertainment: {
    label: 'Entertainment',
    description: 'A media, music or video application designed to entertain',
    icon: (
      <>
        <img src="/images/tags/entertainment.png" alt="entertainment" />
      </>
    ),
  },

  social: {
    label: 'Social',
    description: 'A social application that users use to communicate with other people',
    icon: (
      <>
        <img src="/images/tags/social.png" alt="social" />
      </>
    ),
  },

  education: {
    label: 'Education',
    description: 'An application that is used for learning and educational purposes',
    icon: (
      <>
        <img src="/images/tags/education.png" alt="education" />
      </>
    ),
  },

  commandline: {
    label: 'Command Line',
    description: 'An application used on the command line or terminal',
    icon: (
      <>
        <img src="/images/tags/commandline.png" alt="commandline" />
      </>
    ),
  },

  mobile: {
    label: 'Mobile',
    description: 'A mobile application for iOS, Android etc',
    icon: (
      <>
        <img src="/images/tags/mobile.png" alt="mobile" />
      </>
    ),
  },

  desktop: {
    label: 'Desktop',
    description: 'A desktop application for Windows or macOS',
    icon: (
      <>
        <img src="/images/tags/desktop.png" alt="desktop" />
      </>
    ),
  },

  tv: {
    label: 'TV',
    description:
      'An application that targets the TV platforms (such as AppleTV or AndroidTV)',
    icon: (
      <>
        <img src="/images/tags/tv.png" alt="tv" />
      </>
    ),
  },
};

export const TagList = Object.keys(Tags) as TagType[];
