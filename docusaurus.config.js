/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'AIR SDK',
  tagline: 'Develop beautiful cross-platform applications from a single code base using the AIR SDK and ActionScript',
  url: 'https://airsdk.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  organizationName: 'airsdk', // Usually your GitHub org/user name.
  projectName: 'airsdk.dev', // Usually your repo name.
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Noto+Sans+JP&family=Open+Sans&family=Roboto&family=Lato&display=swap',
      type: 'text/css',
    },
  ],
  themeConfig: {
    announcementBar: {
      id: 'support_us', // Any value that will identify this message.
      content:
        'This site is under construction. We need your <a target="_blank" rel="noopener noreferrer" href="https://github.com/airsdk/airsdk.dev/blob/main/CONTRIBUTING.md">contributions</a> to fill out the documentation.',
      backgroundColor: '#8BE8CB', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
      isCloseable: false, // Defaults to `true`.
    },

    prism: {
      theme: require('prism-react-renderer/themes/vsLight'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['actionscript', 'csharp'],
      // defaultLanguage: 'actionscript'
    },
    
    navbar: {
      title: 'AIR SDK',
      logo: {
        alt: 'AIR SDK',
        src: 'images/logo.svg',
      },
      items: [
        { to: '/docs', label: 'Docs', position: 'left' },
        // {
        //   type: 'doc',
        //   docId: 'index',
        //   position: 'left',
        //   label: 'Docs',
        // },
        { to: '/reference', label: 'Reference', position: 'left' },
        { to: '/news', label: 'News', position: 'left' },
        {
          href: 'https://github.com/airsdk/airsdk.dev',
          'aria-label': 'GitHub repository',
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },
    // algolia: {
    //   apiKey: 'YOUR_API_KEY',
    //   indexName: 'YOUR_INDEX_NAME',
    //   // Optional: see doc section below
    //   contextualSearch: true,
    //   // Optional: see doc section below
    //   appId: 'YOUR_APP_ID',
    //   // Optional: Algolia search parameters
    //   searchParameters: {},
    // },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    footer: {
      logo: {
        alt: 'AIR',
        src: 'images/logo.svg',
        href: '/',
      },
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/basics/getting-started',
              className: 'footer__link-item',
            },
            {
              label: 'Tutorials',
              to: '/docs/tutorials',
            },
            {
              label: 'Reference',
              to: '/reference',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussions',
              href: 'https://github.com/airsdk/Adobe-Runtime-Support/discussions',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/actionscript-3',
            },
            {
              label: 'Starling',
              href: 'https://forum.starling-framework.org/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'News',
              to: '/news',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/airsdk/airsdk.dev',
            },
          ],
        },
      ],
      copyright: `Except as otherwise noted, this work is licensed under a Creative Commons Attribution 4.0 International License, and code samples are licensed under the MIT License.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'reference',
          routeBasePath: 'reference',
          sidebarPath: require.resolve('./reference-sidebars.js'),
          // editUrl: 'https://github.com/airsdk/airsdk.dev/edit/main/',
        },
        blog: {
          blogDescription: 'AIR SDK News',
          showReadingTime: true,
          routeBasePath: 'news',
          path: './news',
          // editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
          feedOptions: {
            type: 'all',
            // copyright: `Copyright © ${new Date().getFullYear()} distriqt Pty Ltd`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs',
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/airsdk/airsdk.dev/edit/main/',
      },
    ],
  ],
};
