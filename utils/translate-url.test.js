const util = require("./translate-url")

describe("translateUrl", () => {
  const pathLocaleNotEqualLocale = {
    path: "/en/english",
    locale: "fr",
    translations: {en: {english: "english"}, fr: {english: "français"}},
  }
  const pathLocaleEqualLocale = {
    path: "/fr/français",
    locale: "fr",
    translations: {en: {english: "english"}, fr: {english: "français"}},
  }
  const noPathLocale = {
    path: "/english",
    locale: "fr",
    translations: {en: {english: "english"}, fr: {english: "français"}},
  }

  test("should process input which is invalid or has to be ignored", () => {
    expect(util.translateUrl({})).toBe("/")
    expect(util.translateUrl({locale: "fr"})).toBe("/fr")
    expect(util.translateUrl({path: "/test"})).toBe("/test")
    expect(util.translateUrl({path: "/test", locale: "fr"})).toBe("/test")
    expect(
      util.translateUrl({
        path: "/test",
        locale: "fr",
        translations: {},
      })
    ).toBe("/test")
    expect(
      util.translateUrl({
        path: "/dev-404-page/foo-bar",
        locale: "fr",
        translations: {fr: {}},
      })
    ).toBe("/dev-404-page/foo-bar")
  })

  test.only("should process input where the path locale is unequal to the provided locale", () => {
    // /en/english → /fr/français for locale: fr, defaultLocale: null
    expect(util.translateUrl(pathLocaleNotEqualLocale)).toBe("/fr/français")
    // /en/english → /fr/français for locale: fr, defaultLocale: fr
    expect(
      util.translateUrl({...pathLocaleNotEqualLocale, defaultLocale: "fr"})
    ).toBe("/français")
  })

  test("should process input where the path locale is equal to the provided locale", () => {
    expect(util.translateUrl(pathLocaleEqualLocale)).toBe("/fr/français")
    expect(
      util.translateUrl({...pathLocaleEqualLocale, defaultLocale: "fr"})
    ).toBe("/français")
  })

  test("should process input where no path locale is set", () => {
    expect(util.translateUrl(noPathLocale)).toBe("/fr/français")
    expect(util.translateUrl({...noPathLocale, defaultLocale: "fr"})).toBe(
      "/français"
    )
  })

  test("should respect `prefix`", () => {
    expect(
      util.translateUrl({
        path: "/en/english",
        locale: "fr",
        translations: {
          en: {"urls.english": "english"},
          fr: {"urls.english": "français"},
        },
        prefix: "urls",
      })
    ).toBe("/fr")
  })
})
