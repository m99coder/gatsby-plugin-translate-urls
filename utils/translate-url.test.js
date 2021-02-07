const util = require("./translate-url")

describe("translateUrl", () => {
  test("should return root path if nothing is set", () => {
    const result = util.translateUrl({})
    expect(result).toBe("/")
  })

  test("should return `locale` with no path is set", () => {
    const result = util.translateUrl({locale: "fr"})
    expect(result).toBe("/fr")
  })

  test("should return `path` if no locale is set", () => {
    const result = util.translateUrl({path: "/test"})
    expect(result).toBe("/test")
  })

  test("should return `path` if no translations were found", () => {
    const result = util.translateUrl({path: "/test", locale: "fr"})
    expect(result).toBe("/test")
  })

  test("should return `path` if no translations were found for given `locale`", () => {
    const result = util.translateUrl({
      path: "/test",
      locale: "fr",
      translations: {},
    })
    expect(result).toBe("/test")
  })

  test("should return `path` if it’s the dev 404 page", () => {
    const result = util.translateUrl({
      path: "/dev-404-page/foo-bar",
      locale: "fr",
      translations: {fr: {}},
    })
    expect(result).toBe("/dev-404-page/foo-bar")
  })
})
