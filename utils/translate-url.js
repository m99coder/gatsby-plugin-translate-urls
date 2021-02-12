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

  let translatedPath = path
    .split("/")
    .map((key) => translations[locale][prefix + key] || key)
    .join("/")

  if (pathLocale) {
    const localePrefix = isDefaultLocale ? "" : "/" + locale
    const newPath =
      localePrefix + removeLocaleFromPath(translatedPath, pathLocale)
    return removeTrailingSlash(newPath)
  }
  return removeTrailingSlash(path)
}

module.exports = {
  translateUrl,
}
