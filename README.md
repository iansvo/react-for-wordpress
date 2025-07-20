# React for WordPress

This repo contains the code we'll use for the React for WordPress workshop.

## Overview

This repo contains the code for a plugin called: React for WordPress, which we'll use to do various things using React. It comes pre-bundled with [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) so you can easily spin up a WordPress install without having to use a separate thing like LocalWP or similar, with a single command. 

The repo is automatically set up to work out of the box once everything is built. 

## Install & Setup

First, make sure you have the following installed on your computer:

- [Composer](https://getcomposer.org/)
- [NodeJS](https://nodejs.org/en) version 24
- [Docker](https://www.docker.com/products/docker-desktop/)

Once you have all of those things installed, open up a terminal in root project folder (i.e. the same folder this README is in) and run the following commands:

```bash
composer install
npm i
```

Next, run the project build to make sure all the files are in place.

```bash
npm run build
```

Once all of these have run successfully, make sure Docker is running, and then start up the local WordPress install with the following command:

```bash
npm run wp-env start
```

Once this completes, you'll be able to visit the WordPress install at http://localhost:8888. To login, you can use the following demo credentials:

u: admin
p: password
