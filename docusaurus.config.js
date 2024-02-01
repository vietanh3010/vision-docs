// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'FPT AI Vision Documentation',
    tagline: 'Get help with FPT AI Vision products and services',
    favicon: 'img/favicons.png',
    // themes: ['@docusaurus/theme-search-algolia'],
    // Set the production url of your site here
    url: 'https://docs-vision.fpt.ai',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',
    staticDirectories: ['public', 'static'],
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'vision', // Usually your GitHub org/user name.
    projectName: 'vision-docusaurus-react', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'vi'],
        localeConfigs: {
            en: {
                htmlLang: 'en-US',
            },
            vi: {
                htmlLang: 'vi-VN',
            },
        }
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    sidebarCollapsible: true,
                    breadcrumbs: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },

            }),
        ],
    ],
    // stylesheets: [
    //     "https://cdn.jsdelivr.net/npm/@docsearch/css@3"
    // ],
    // scripts: [
    //     "https://cdn.jsdelivr.net/npm/@docsearch/js@3",
    //     {
    //         type: "text/javascript",
    //         src: "undefined",
    //         async: true,
    //         innerHTML: `
    //             docsearch({
    //                 appId: VDI700ZHVE,
    //                 apiKey: f4aeb12b911a45b7c3ebba6e4c4d78ef,
    //                 indexName: fptai,
    //                 insights: true, // Optional, automatically send insights when user interacts with search results
    //                 container: '### REPLACE ME WITH A CONTAINER (e.g. div) ###'
    //                 debug: false // Set debug to true if you want to inspect the modal
    //             });
    //         `
    //     }
    // ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            colorMode: {
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            navbar: {
                hideOnScroll: false,
                style: 'dark',
                logo: {
                    alt: 'FPT.AI',
                    src: 'img/logo_mini.svg',
                },
                items: [
                    {
                        to: '/read',
                        // sidebarId: 'readSidebar',
                        label: 'FPT AI Read',
                        position: 'left'
                    },
                    {
                        to: '/ekyc/introduction/what-is-ekyc',
                        // sidebarId: 'eKYCSidebar',
                        label: 'FPT AI eKYC',
                        position: 'left'
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'FPT AI Read',
                        items: [
                            {
                                label: 'FPT AI Read Documentation',
                                to: '/read',
                            },
                        ],
                    },
                    {
                        title: 'FPT AI eKYC',
                        items: [
                            {
                                label: 'FPT AI eKYC Documentation',
                                to: '/ekyc/introduction/what-is-ekyc',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} FPT Corporation`,
            },
            prism: {
                theme: lightTheme,
                darkTheme: darkTheme,
                //https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/prism-react-renderer/src/themes/palenight.ts
                // theme: require('prism-react-renderer/themes/github'),
                additionalLanguages: ['bash', 'diff', 'json'],
            },
            docs: {
                sidebar: {
                    hideable: true
                },
            },
            // algolia: {
            //     // The application ID provided by Algolia
            //     appId: 'VDI700ZHVE',
            //     // Public API key: it is safe to commit it
            //     apiKey: 'f4aeb12b911a45b7c3ebba6e4c4d78ef',
            //     indexName: 'fptai',
            //     // Optional: see doc section below
            //     contextualSearch: false,
            //     // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
            //     // externalUrlRegex: 'external\\.com|domain\\.com',
            //     // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
            //     // replaceSearchResultPathname: {
            //     //     from: '/', // or as RegExp: /\/docs\//
            //     //     to: '/',
            //     // },
            //     // Optional: Algolia search parameters
            //     // searchParameters: {},
            //     // Optional: path for search page that enabled by default (`false` to disable it)
            //     searchPagePath: false//'search',
            // },

            scrollToTop: true,
        }),
};

module.exports = config;
