# gatsby-plugin-translate-urls

[![npm package][npm-badge]][npm]

`gatsby-plugin-translate-urls` is a [Gatsby](https://www.gatsbyjs.org/) plugin to translate urls

## Usage

1. Download `gatsby-plugin-translate-urls` from the NPM registry:

```shell
yarn add gatsby-plugin-translate-urls
```

2. Create translations files (`.js` or `.json`)

`en.json`:

```JSON
{
  "urls.about": "about",
  "urls.posts": "posts"
}
```

`fr.json`:

```JSON
{
  "urls.about": "a-props",
  "urls.posts": "articles"
}
```

3. Add the plugin in your `gatsby-config.js` file

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-translate-urls",
      options: {
        translations: {
          // import JS or JSON files
          en: require("./src/translations/en.js"),
          fr: require("./src/translations/fr.json"),
        },
        // OPTIONAL
        // default: ""
        prefix: "urls.",
      },
    },
  ],
}
```

4. Translate urls in your pages

`src/pages/about.js`:

```js
import React, {useContext} from "react"
import {Link} from "gatsby"
import {TranslateUrlsContext} from "gatsby-plugin-translate-urls"

export default () => {
  const {
    locale, // fr
    locales, // ["en", "fr"]
    originalUrl, // "/about"
    translateUrl // (url(, locale)) => translatedUrl
  } = useContext(TranslateUrlsContext)
  return (
    <>
      <Link to={translateUrl("/")}>Home FR</Link>
      <Link to={translateUrl("/posts")}>Posts FR</Link>
      <Link to={translateUrl(originalUrl)}>About FR</Link>
      <Link to={translateUrl(originalUrl, "en")}>About EN</Link>
      {"All localized /about pages"}
      {locales.map(lang => <Link key={lang}to={translateUrl(originalUrl, lang)}>About {lang}<)}
      /Link>
    </>
  )
}
```

## Contributing

- ⇄ Pull/Merge requests and ★ Stars are always welcome.
- For bugs and feature requests, please [create an issue][github-issue].

## Changelog

See [CHANGELOG](./CHANGELOG.md)

## License

This project is licensed under the MIT License - see the
[LICENCE](./LICENCE.md) file for details

[npm-badge]: https://img.shields.io/npm/v/gatsby-plugin-translate-urls.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-plugin-translate-urls
[github-issue]: https://github.com/cedricdelpoux/gatsby-plugin-translate-urls/issues/new
