---
title: Get Started
---

# Get started

## Requirements

To get started you need to have a couple of things installed:

* [NodeJS](https://nodejs.org)
* [Git](https://git-scm.com)

### Installing Hexo

Once all the requirements are installed, you can install [Hexo](https://hexo.io/) with npm:

```
$ npm install -g hexo-cli
```

## Quick Start

To quickly bootstrap a documentation website, we have setup an [example seed project](https://github.com/zalando-incubator/hexo-theme-doc-seed) that can be **cloned** and used a starting point.

* Clone the seed project

```
$ git clone https://github.com/zalando-incubator/hexo-theme-doc-seed.git
```

* Go into the resulting directory and install the dependencies

```
$ cd hexo-theme-doc-seed && npm install
```

*  Start the preview server

```
$ hexo s
```

This command will run a built-in http server and watch for changes.

If you open your browser to http://localhost:4000 you should see the documentation website up and running.     
Nice! Now you can start [writing](./usage-and-configuration/writing.html) your content... have fun!


> To know more, please check [server](https://hexo.io/docs/server.html) and [generating](https://hexo.io/docs/generating.html) from the official Hexo documentation.


## Long Start

This section assumes that you are familiar with [Hexo](https://hexo.io) usage. For new starters we suggest you have a look at the [Quick Start](#Quick-Start) guide.

### Install via npm (recommended)

```
$ npm install git+ssh://git@github.com:zalando-incubator/hexo-theme-doc.git --save
```

Symlink the package in the `themes` folder. For Linux:

```
$ ln -s ./themes/doc ./node_modules/hexo-theme-doc
```

Install the required hexo plugins in your project:
```
$ npm install hexo-renderer-ejs hexo-renderer-marked --save
```

### Install via git (not recommended)

```
$ git clone git@github.com:zalando-incubator/hexo-theme-doc.git themes/doc
$ cd themes/doc && npm install --prod
```

Install the required hexo plugins in your project:
```
$ npm install hexo-renderer-ejs hexo-renderer-marked --save
```

### Activate the theme

Update your project `_config.yml`

```yaml
theme: doc

ignore:
  - '**/themes/**/*(node_modules|lib)' # improve performance while `hexo server` is running
```
