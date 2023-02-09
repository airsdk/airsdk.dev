import React from 'react';
import { difference, sortBy } from '../utils/jsUtils';

/*
 * ADD YOUR APPLICATION TO THE SHOWCASE:
 *
 * Requirements for adding your site to our showcase:
 * - It is a production application
 * - It is NOT a work in progress
 * - It has some publicly available content (this could simply be a blog about the app if it is a private application)
 *
 * Instructions:
 * - Add your site in the json array below
 * - Add a local image preview (decent screenshot of your application, ideally 800x400 pixels)
 * - Use relevant tags to qualify your site (read the tag descriptions in `tags.tsx`)
 * - The image MUST be added to the GitHub repository, and use `require("image")`
 * - Open a PR and check for reported CI errors
 *
 * If you edit this file through the Github interface, you can:
 * - Submit first your applications.tsx edit PR
 * - This will create a branch on your fork (usually "patch-1")
 * - Go to https://github.com/<username>/airsdk.dev/tree/<branch>/src/data/showcase
 * - Drag-and-drop an image here to add it to your existing PR
 *
 * Please help us maintain this showcase page data:
 * - Update applications with wrong data
 * - Ensure application tags remains correct over time
 * - Remove applications not available or no longer using AIR
 * - Add missing AIR applications (if the site owner agreed)
 *
 *
 * {
 *   title: 'Application Title',
 *   description: 'A description',
 *   preview: require('./showcase/yourimage.jpg'),
 *   publishDate: new Date( 2020,9,1 ),
 *   tags: ['game', 'mobile'],
 *   appStoreUrl: 'https://apps.apple.com/us/app/idXXXXXXXXX?mt=8',
 *   playStoreUrl: 'https://play.google.com/store/apps/details?id=air.com.app',
 *   website: 'https://www.app-url.com',
 * },
 *
 */

import { Tag, TagType, Tags, TagList } from './tags';

export type Application = {
  title: string;
  description: string;
  preview: any;
  publishDate: Date;
  tags: TagType[];
  website?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
};

// Add your application to this list
const Applications: Application[] = [
  {
    title: 'GameVelvet - Online Card Games and Board Games',
    description:
      'More than 25 board and card games available for Android, iPhone, iPad, Windows Store. The app is available in 5 languages: English, Portuguese, Italian, French, and Spanish and has more than 800,000 monthly active users in all platforms. Users can choose to play traditional card and board games with online players around the world or train with bots (AI).',
    preview: require('./showcase/megajogos.png'),
    publishDate: new Date(2012, 9, 27),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://www.megajogos.com.br',
    appStoreUrl: 'https://apps.apple.com/br/app/megajogos-cartas-e-tabuleiro/id570050950',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=air.br.com.megajogos.mobile',
  },
  {
    title: 'Summoners Fate',
    description:
      'Summoners Fate is a tabletop inspired roguelike that fuses traditional turn-based combat with tactical card combat. Choose your Summoner and embark on ever-changing adventures in the Multiverse in search of hidden secrets, powerful cards and mutated rabbits.',
    preview: require('./showcase/summonersFate_800x400.png'),
    publishDate: new Date(2022, 6, 6),
    tags: ['game', 'desktop'],
    website: 'https://store.steampowered.com/app/1681840/Summoners_Fate/',
  },
  {
    title: '20 000 Cogs under the Sea',
    description:
      'Start your awesome underwater steampunk adventure. Build underwater factory, connect the cogwheels ⚙ for the most efficient work in the idle game 🎮 mode. Tap volcanoes 🌋 for oxygen, drill the seabed and mine ⛏ the ore.',
    preview: require('./showcase/20000cogs.png'),
    publishDate: new Date(2018, 5, 15),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://airapport.itch.io/20-000-cogs-under-the-sea',
    appStoreUrl: 'https://itunes.apple.com/us/app/20000-cogs-under-the-sea/id1441246412',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=air.com.airapport.A20000.cogs.under.sea.nemo.steampunk',
  },
  {
    title: 'AIR Package Manager',
    description:
      'The AIR Package Manager is a command line utiltiy for managing AIR applications',
    preview: require('./showcase/airpackagemanager.png'),
    publishDate: new Date(2021, 10, 14),
    tags: ['commandline', 'utility', 'highlight'],
    website: 'https://github.com/airsdk/apm',
  },
  {
    title: 'Bonza Jigsaw',
    description:
      'Solve jigsaw puzzles that feature stunning images from around the globe. Austrian alps, Canadian creatures, Danish dance and Brazilian beaches. Explore exotic regions and discover new cultures, embrace the diversity that makes our world unique and preserve the values that bring us together.',
    preview: require('./showcase/bonzajigsaw.jpg'),
    publishDate: new Date(2018, 10, 14),
    tags: ['game', 'mobile'],
    website: 'http://bonzapuzzles.com/',
    appStoreUrl: 'https://apps.apple.com/us/app/bonza-jigsaw/id1212690976',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.au.com.minimega.bonzajigsaw',
  },
  {
    title: 'Bonza Planet',
    description:
      'Combine word search, jigsaw and trivia to solve puzzles as you explore the world of Bonza Planet. This edition of Bonza highlights themes like Animals, Travel, Planet Earth, Humanity and Science.',
    preview: require('./showcase/bonzaplanet.png'),
    publishDate: new Date(2016, 10, 14),
    tags: ['game', 'mobile'],
    website: 'http://bonzapuzzles.com/',
    appStoreUrl: 'https://apps.apple.com/us/app/bonza-planet/id908187161',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.au.com.minimega.bonzanatgeo',
  },
  {
    title: 'Bonza Word Puzzle',
    description:
      "Bonza is a new type of crossword that has become an instant classic. It mixes word search, jigsaw and trivia to create something completely fresh. If you like a word challenge and you enjoy pushing boxes around with your fingers, then you'll love Bonza Word Puzzle.",
    preview: require('./showcase/bonzawordpuzzle.png'),
    publishDate: new Date(2014, 10, 14),
    tags: ['game', 'mobile'],
    website: 'http://bonzapuzzles.com/',
    appStoreUrl: 'https://apps.apple.com/us/app/bonza-word-puzzle/id662053009',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.au.com.minimega.bonza',
  },
  {
    title: 'Bullet Heaven 2',
    description:
      'A mesmerizing bullet-hell shoot-em-up. Shoot at cute enemies, while dodging hundreds of bullets per second! This game was made with Starling, has full controller and leaderboard support, and supports up to 4 players locally.',
    preview: require('./showcase/bulletheaven2.png'),
    publishDate: new Date(2015, 12, 8),
    tags: ['game', 'desktop'],
    website: 'https://store.steampowered.com/app/412670/Bullet_Heaven_2/',
  },
  {
    title: 'Dallmeier HEMISPHERE® SeMSy®',
    description:
      'The HEMISPHERE® SeMSy® video and alarm management system is one of the most comprehensive solutions on the market for video management systems (VMS). The application portfolio goes far beyond classic video management tasks and offers the comprehensive integration of third-party systems via various interfaces and industry modules.',
    preview: require('./showcase/hemispheresemsy.png'),
    publishDate: new Date(2021, 11, 5),
    tags: ['utility', 'desktop', 'highlight'],
    website: 'https://www.dallmeier.com/technology/software',
  },
  {
    title: 'Engineer Millionaire',
    description:
      'Cogs, money and mad science! All what you have at start is a machine which produces coins out of nothing, but it’s all what you need to build your factory, mine coal, construct drones and become a millionaire!',
    preview: require('./showcase/engineer.png'),
    publishDate: new Date(2018, 1, 1),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://airapport.itch.io/engineer-millionaire',
    appStoreUrl: 'https://itunes.apple.com/us/app/engineer-millionaire/id1437172358',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=air.com.airapport.engineer',
  },

  {
    title: 'Epic Battle Fantasy 5',
    description:
      'A 30-hour turn-based RPG adventure, full of video game references, juvenile dialogue, and anime fanservice... and also strategic combat, monster catching, and tons of treasure hunting! Made with AIR and the classic Flash display list, it took over 4 years of work and sold over 100,000 copies!',
    preview: require('./showcase/epicbattlefantasy5.png'),
    publishDate: new Date(2018, 12, 1),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://store.steampowered.com/app/432350/Epic_Battle_Fantasy_5/',
    appStoreUrl: 'https://apps.apple.com/mm/app/epic-battle-fantasy-5-rpg/id6443990313',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=air.EpicBattleFantasy5',
  },
  {
    title: 'Epic Battle Fantasy 4',
    description:
      'A light-hearted turn-based RPG, inspired by 2D classics. You will battle through waves of enemies, grow your characters, read cringey dialogue, explore a diverse world, solve puzzles, and of course, save the world. Originally packaged with MDM Zinc, it has been updated to use AIR in the latest version.',
    preview: require('./showcase/epicbattlefantasy4.png'),
    publishDate: new Date(2014, 2, 26),
    tags: ['game', 'desktop'],
    website: 'https://store.steampowered.com/app/265610/Epic_Battle_Fantasy_4/',
  },
  {
    title: 'Epic Battle Fantasy Collection',
    description:
      'A collection of short and silly games from the early days of the internet. There\'s turn-based RPGs, shoot-em-ups, platformers, and more - updated with new quality-of-life features. This is an AIR application that launches .swf files, both ActionScript 3 and ActionScript 2, and adds Steam features!',
    preview: require('./showcase/epicbattlefantasycollection.png'),
    publishDate: new Date(2009, 5, 1),
    tags: ['game', 'desktop'],
    website: 'https://store.steampowered.com/app/1469620/Epic_Battle_Fantasy_Collection/',
  },
  {
    title: 'Farm and Mine',
    description:
      'Farm and mine idle tycoon combines the most fun features from idle farm tycoon games and clicker mine factory simulators. You have a vegetable farm at start. But as you grow more food, build a house, hire a farmer, drill for idle coal mining and oil pumping, you can create a farming empire and become a millionaire tycoon',
    preview: require('./showcase/farm.png'),
    publishDate: new Date(2021, 8, 14),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://airapport.itch.io/farm-and-mine',
    appStoreUrl: 'https://apps.apple.com/us/app/farm-and-mine-deep-idle-ld48/id1564694016',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.airapport.farm.mine.idle.ludumdare48',
  },
  {
    title: 'HD Poker',
    description:
      'HD Poker is the place for you to Unlock your Happy Within™, with an awesome community and the best vibes! Invite your friends and family and enjoy the most awesome and fun poker game in the world.\n\nAvailable on Steam for Windows and macOS',
    preview: require('./showcase/hdpoker.jpg'),
    publishDate: new Date(2018, 9, 14),
    tags: ['game', 'social', 'desktop'],
    website: 'https://store.steampowered.com/app/797430/HD_Poker_Texas_Holdem/',
  },
  {
    title: 'Idle Tower Builder',
    description:
      'You are in charge of building the world highest tower. Gather or produce the necessary resources and fulfill your aim!',
    preview: require('./showcase/tower.png'),
    publishDate: new Date(2020, 8, 13),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://airapport.itch.io/idle-tower-builder',
    appStoreUrl: 'https://apps.apple.com/us/app/idle-tower-builder/id1527621990',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.airapport.idletowerbuilder',
  },
  {
    title: 'Shapik: the Quest',
    description:
      'This is a story of Shapik, traveling through magic forest in search of his missing sister. Explore a beautiful world, full of mystery, magic and danger and find your missing sister, solving puzzles on your way.',
    preview: require('./showcase/shapik.jpg'),
    publishDate: new Date(2020, 4, 22),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://store.steampowered.com/app/1073810/Shapik_The_Moon_Quest/',
    appStoreUrl: 'https://apps.apple.com/app/shapik-the-quest/id1543882120',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=air.questshapikapk',
  },
  {
    title: 'SimsUshare',
    description:
      'SimsUshare is the easiest way to create compelling Fire & Safety training simulations using your own photos. It is the #1 fire simulator training application in the Fire Service, used by tens of thousands customers',
    preview: require('./showcase/simsushare.png'),
    publishDate: new Date(2019, 5, 20),
    tags: ['education', 'desktop', 'mobile'],
    website: 'https://simsushare.com',
  },
  {
    title: 'Smart Heat',
    description: 'With an easy and intuitive interface, Smart Heat will assist you in managing your CAOS Bluetooth heater. Smart Heat can manage the entire weekly program and settings of your exclusive heater. Manage your time slots of activity, heating speed and temperature, eco settings, and led colour and intensity.',
    preview: require('./showcase/smartheat.jpg'),
    publishDate: new Date(2022, 7, 6),
    tags: ['utility', 'mobile'],
    appStoreUrl: 'https://apps.apple.com/us/app/smart-heat/id1630947067?uo=4&at=11l6hc&app=itunes&ct=fnd',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.it.caossrl.bluetooth',
  },
  {
    title: 'Steampunk Idle Spinner',
    description:
      'Steampunk Idle Spinner is the game in which you can build incredible mad science contraptions and spectate them spin and earn money! The game has mines, cogwheels, balloons, electric field generators, vapor collector, portal and generates awesome vibes of exploration, construction and discovery.',
    preview: require('./showcase/steampunk.png'),
    publishDate: new Date(2017, 6, 12),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://airapport.itch.io/steampunk-idle-spinner',
    appStoreUrl: 'https://itunes.apple.com/us/app/id1445575882',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.com.airapport.steampunkidlespinner',
  },
  {
    title: 'Transmutation',
    description:
      'You are the alchemist: medieval mad scientist! All what you have at the start is Air. But then you discover, how to get other elements: Water, Slime, Earth, Rock, Fire and so on!',
    preview: require('./showcase/transmutation.png'),
    publishDate: new Date(2019, 10, 12),
    tags: ['game', 'mobile', 'desktop'],
    website: 'https://airapport.itch.io/transmutation',
    appStoreUrl: 'https://itunes.apple.com/us/app/transmutation-lab/id1475150795',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.com.airapport.transmutation',
  },
  {
    title: 'VoltLab',
    description: 'A fun study of the physics of electricity with VoltLab',
    preview: require('./showcase/voltlab.png'),
    publishDate: new Date(2019, 5, 20),
    tags: ['education', 'mobile'],
    appStoreUrl: 'https://apps.apple.com/ru/app/voltlab/id1461701360',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.ru.sever.ElectricalEngineering',
  },
  {
    title: 'WYQS - West Yorkshire Queer Stories',
    description: 'Use the interactive map to follow our history trail and discover Leeds’s hidden queer past. From Pride to squats, from 1840s court cases to 1990s raves, you can listen to voices from across the West Yorkshire queer community and see the city and its past in a new light.',
    preview: require('./showcase/wyqs.jpg'),
    publishDate: new Date(2020, 2, 13),
    tags: ['education', 'mobile'],
    // appStoreUrl: 'https://apps.apple.com/us/app/wyqs/id1488373705', - Not sure why today apple url does not work
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=air.uk.co.wyqs.app',
  },
  /*
   Pro Tip: add your site in alphabetical order.
   Appending your application here (at the end) is more likely to produce Git conflicts.
    */
];

function sortApplications() {
  let result = Applications;
  // Sort by application name
  result = sortBy(result, (app) => app.title.toLowerCase());
  // Sort by highlight tag, highlighted first
  result = sortBy(result, (app) => !app.tags.includes('highlight'));
  return result;
}

export const SortedApplications = sortApplications();

// Fail-fast on common errors
function ensureApplicationValid(application: Application) {
  function checkFields() {
    const keys = Object.keys(application);
    const validKeys = [
      'title',
      'description',
      'preview',
      'website',
      'appStoreUrl',
      'playStoreUrl',
      'tags',
      'publishDate',
    ];
    const unknownKeys = difference(keys, validKeys);
    if (unknownKeys.length > 0) {
      throw new Error(`Site contains unknown attribute names=[${unknownKeys.join(',')}]`);
    }
  }

  function checkTitle() {
    if (!application.title) {
      throw new Error('Site title is missing');
    }
  }

  function checkDescription() {
    if (!application.description) {
      throw new Error('Site description is missing');
    }
  }

  function checkWebsite() {
    if (application.website) {
      const isHttpUrl =
        application.website.startsWith('http://') ||
        application.website.startsWith('https://');
      if (!isHttpUrl) {
        throw new Error(
          `Site website does not look like a valid url: ${application.website}`
        );
      }
    }
  }

  function checkPreview() {
    if (
      !application.preview ||
      (application.preview instanceof String &&
        (application.preview.startsWith('http') || application.preview.startsWith('//')))
    ) {
      throw new Error(
        `Site has bad image preview=[${application.preview}].\nThe image should be hosted on Docusaurus site, and not use remote HTTP or HTTPS URLs`
      );
    }
  }

  function checkTags() {
    if (
      !application.tags ||
      !(application.tags instanceof Array) ||
      (application.tags as string[]).includes('')
    ) {
      throw new Error(`Bad showcase tags=[${JSON.stringify(application.tags)}]`);
    }
    const unknownTags = difference(application.tags, TagList);
    if (unknownTags.length > 0) {
      throw new Error(
        `Unknown tags=[${unknownTags.join(',')}\nThe available tags are ${TagList.join(
          ','
        )}`
      );
    }
  }

  try {
    checkFields();
    checkTitle();
    checkDescription();
    checkWebsite();
    checkPreview();
    checkTags();
  } catch (e) {
    throw new Error(
      `Showcase application with title=${application.title} contains errors:\n${e.message}`
    );
  }
}

Applications.forEach(ensureApplicationValid);
