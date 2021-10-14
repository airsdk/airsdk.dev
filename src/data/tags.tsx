import React from 'react';

export type TagType =
  | 'highlight'
  | 'game'
  | 'utility'
  | 'entertainment'
  | 'social'
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
    icon: <>★</>,
  },

  game: {
    label: 'Game',
    description: 'A game application',
    icon: <>🎮</>,
  },

  utility: {
    label: 'Utility',
    description: 'A utility application, handy tools like a weather application',
    icon: <>🔧</>,
  },

  entertainment: {
    label: 'Entertainment',
    description: 'A media, music or video application designed to entertain',
    icon: <>🎶</>,
  },

  social: {
    label: 'Social',
    description: 'A social application that users use to communicate with other people',
    icon: <>😀</>,
  },

  commandline: {
    label: 'Command Line',
    description: 'An application used on the command line or terminal',
    icon: (
      <>
        <svg viewBox="0 0 512 512" width="19px" height="19px">
          <path
            fill="black"
            d="M475.4285583,36.5714302H36.5714302C16.3714294,36.5714302,0,52.942852,0,73.1428604v365.7142944c0,20.1999817,16.3714275,36.5714111,36.5714302,36.5714111h438.8571167C495.6285706,475.4285583,512,459.0571289,512,438.8571472V73.1428604C512,52.942852,495.6285706,36.5714302,475.4285583,36.5714302z M73.1428604,292.5714417l73.1428604-73.142868l-73.1428604-73.1428528l36.5714264-36.571434l109.7142868,109.7142868L109.7142868,329.1428528L73.1428604,292.5714417z M365.7142944,329.1428528H219.4285736v-36.5714111h146.2857208V329.1428528z"
          />
        </svg>
      </>
    ),
  },

  mobile: {
    label: 'Mobile',
    description: 'A mobile application for iOS, Android etc',
    icon: <>📱</>,
  },

  desktop: {
    label: 'Desktop',
    description: 'A desktop application for Windows or macOS',
    icon: <>🖥</>,
  },
  tv: {
    label: 'TV',
    description:
      'An application that targets the TV platforms (such as AppleTV or AndroidTV)',
    icon: <>📺</>,
  },
};

export const TagList = Object.keys(Tags) as TagType[];
