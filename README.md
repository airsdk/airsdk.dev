
<p align="center">
    <a href="https://airsdk.dev" rel="noopener" target="_blank"><img width="150" src="https://raw.githubusercontent.com/airsdk/airsdk.dev/main/public/images/air-logo.png" alt="AIR SDK logo"></a></p>
</p>

<h1 align="center">airsdk.dev</h1>

<div align="center">
    Source for the airsdk.dev site. Site for developer news, information, tutorials, guides and reference for using the AIR SDK.
</div>




---



## Contributing

Read the [contributing guide](CONTRIBUTING.md) to learn about how you can contribute to the air sdk developer site.


## Building

### Requirements

- [Node.js](https://nodejs.org/en/download/) version >= 12.13.0 or above (which can be checked by running `node -v`). You can use [`nvm`](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed



### Project structure

```
├── news
│   ├── 2021-05-25-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
├── reference
│   ├── reference1.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock
```

- `news` contains news articles. Generally these will only be published by Harman.
- `docs` contains the documentation markdown. This includes tutorials, guides and the developer articles. 
- `reference` contains the AIR and ActionScript reference materials. 
- `src` contains the site source.


### Installing packages 

When you start developing you should ensure you have all the node packages installed on your machine by running:

```
npm install
```

This will download and install the packages required for the site.



### Running the development server

To preview your changes as you edit the files, you can run a local development server that will serve your website and reflect the latest changes.

```
npm run start
```

By default, a browser window will open at `http://localhost:3000`.


