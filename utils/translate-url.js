const {getPathLocale} = require("./get-path-locale")
const {removeLocaleFromPath} = require("./remove-locale-from-path")
const {removeTrailingSlash} = require("./remove-trailing-slash")

const translateUrl = ({
  path,
  locale,
  translations,
  prefix = "",
  defaultLocale,
}) => {
  if (!path) {
    return "/" + (locale || "")
  }

  if (
    !locale ||
    !translations ||
    !translations[locale] ||
    path.startsWith("/dev-404-page")
  ) {
    return path
  }
  const isDefaultLocale = defaultLocale && defaultLocale === locale
  const pathLocale = getPathLocale(path)

  // a path locale is set, but unequal to the provided locale
  if (pathLocale && pathLocale !== locale) {
    const newPath = "/" + locale

    if (isDefaultLocale) {
      return removeLocaleFromPath(newPath, defaultLocale)
    }

    return newPath
  }

  let translatedPath = path
    .split("/")
    .map((key) => translations[locale][prefix + key] || key)
    .join("/")

  // a path locale is set, but equal to the provided locale
  if (pathLocale) {
    if (isDefaultLocale) {
      translatedPath = removeLocaleFromPath(translatedPath, pathLocale)
    }

    return removeTrailingSlash(translatedPath)
  }

  // no path locale is set
  if (isDefaultLocale) {
    return removeTrailingSlash(translatedPath)
  }

  const localizedPath = `/${locale}${translatedPath}`
  return removeTrailingSlash(localizedPath)
}

module.exports = {
  translateUrl,
}
