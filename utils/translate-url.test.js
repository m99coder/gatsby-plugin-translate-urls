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

  // TODO: Why is this piece of code written like that and what’s the purpose of
  // it?
  test("should process input where the path locale is unequal to the provided locale", () => {
    // pathLocale (en) !== locale (fr): `/en/english` > `/fr`
    expect(util.translateUrl(pathLocaleNotEqualLocale)).toBe("/fr")

    // pathLocale (en) !== locale (fr)
    //   && defaultLocale (fr) === locale (fr): `/en/english` > `/`
    expect(
      util.translateUrl({...pathLocaleNotEqualLocale, defaultLocale: "fr"})
    ).toBe("/")
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
})
