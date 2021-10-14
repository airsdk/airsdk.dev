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
 * - Add a local image preview (decent screenshot of your application)
 * - Use relevant tags to qualify your site (read the tag descriptions below)
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
// prettier-ignore
const Applications: Application[] = [
   {
     title: 'AIR Package Manager',
     description: 'The AIR Package Manager is a command line utiltiy for managing AIR applications',
     preview: require('./showcase/airpackagemanager.png'),
     publishDate: new Date( 2021, 10, 14 ),
     tags: ['commandline', 'utility', 'highlight'],
     website: 'https://github.com/airsdk/apm',
   },
 
   {
    title: 'Dice Paradise',
    description: 'Dice Paradise is an addictive match-clear type game with stunning beach vaporwave themed art. Roll the dice and place them into the grid to make matches in rows and columns to clear them out and rack up the points.    ',
    preview: require('./showcase/diceparadise.png'),
    publishDate: new Date( 2021, 8, 1 ),
    tags: ['game', 'mobile'],
    website: 'https://www.bitty-world.com/dice-paradise',
    appStoreUrl: 'https://apps.apple.com/us/app/dice-paradise/id1579350454',
  },

  {
    title: 'KnockDown',
    description: 'KnockDown is an entertaining fun for children of all ages. The aim is to hit tin cans with a ball and clear them away.',
    preview: require('./showcase/knockdown.jpg'),
    publishDate: new Date( 2021, 4, 1 ),
    tags: ['game', 'desktop'],
    website: 'https://store.steampowered.com/app/1513330/KnockDown/',
  },

  {
    title: 'Rock Bunny',
    description: 'An invasion of plants from outer space has begun! Fortunately Rock Bunny knows the secret to defeat them…Vegetables! Help Rock Bunny stop the invasion by launching a good dose of vitamins with veggie missile. Combat the vicious plants in 5 post apocalyptic cities, beat 100 levels, and have fun testing your skills in this physics based game!',
    preview: require('./showcase/rockbunny.jpg'),
    publishDate: new Date( 2020,9,1 ),
    tags: ['game', 'mobile'],
    appStoreUrl: 'https://apps.apple.com/us/app/id547133232?mt=8',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=air.com.fluocode.rockbunnyvsplantsofthespace',
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
