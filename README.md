# social-ui

> Basic UI application template for a hypothetical social network.

## Overview

This project uses [VueJS](https://vuejs.org/) and [Bulma.io](http://bulma.io) as its core.

[Vuex](https://github.com/vuejs/vuex/) and [Vue-Router](https://github.com/vuejs/vue-router/) are used for local state management and client-side routing respectively.

Data presented is completely randomised using [ChanceJS](http://chancejs.com) and [Placehold.it](http://placehold.it/)


## Details

The idea behind this project was to create a bunch of templates, layout and component ideas for prototyping.
In order to have some 'vision' and purpose for interactions, I decided to base it on social network applications.
There are a couple of main pages;
- Home page with typical layouts of content
- Login and Registration pages
- Profile for viewing photos, lists of things and people (and following!)
    - There's also different layouts you can view and play around with :)
- Creating a post with hypothetical attachments
- Messages including a chatroom

The whole application is client-side and has no communication with any backend. As such, login details, messaging, following and other actions are all achieved through memory (via Vuex). It is also not persisted to any browser storage.

The architecture powering the application is designed such that switching to a real API could be achieved with relative ease.

The project can also be deployed to [GitHub Pages](https://pages.github.com/), using a script I've written for myself. It might work out-of-the box, or you may need to tweak it and adjust some webpack setting to suit your needs.
Have a look at [/scripts/deploy.sh](https://github.com/aaron-tay/social.ui/blob/master/scripts/deploy.sh) for more details.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Feedback

If there's any bugs, feature requests, or if you have any questions, feel free to ask via [GitHub issues](https://github.com/aaron-tay/social.ui/issues).

## License

Copyright (c) 2017 [aaron-tay](https://github.com/aaron-tay) under [MIT Lcense](https://opensource.org/licenses/MIT)
