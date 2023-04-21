import Money from "./money";

describe("money", () => {

  it("does minor conversion", () => {
    const m = Money.fromMinorUnit(123);
    expect(m.toMinorUnit()).toBe(123)
  })

  it("has correct minor unit", () => {
    const m = new Money(1_122_334)
    expect(m.toMinorUnit()).toBeCloseTo(1122)
  })

  it("calculates addition", () => {
    const m = new Money(1234)
    const n = new Money(1111)
    const result = m.add(n)
    const expected = new Money(2345)
    expect(result).toStrictEqual(expected)
  })

  it("calculates multiplication", () => {
    const m = new Money(41)
    const expected = new Money(82);
    expect(m.multiply(2)).toStrictEqual(expected)
  })

  it("does implicit rounding correctly", () => {
    // the labels are in terms of minor money units
    const shouldBeZero = [
      0,
      1,
      499
    ]
    const shouldBeOne = [
      500,
      1000,
      1499
    ]
    for (const d of shouldBeZero) {
      expect(new Money(d).toMinorUnit()).toBeCloseTo(0, 5)
    }
    for (const d of shouldBeOne) {
      expect(new Money(d).toMinorUnit()).toBeCloseTo(1)
    }
  })

  it("rounds up correctly", () => {
    const roundToZero = 0;
    const roundToTen = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]
    const roundToTwenty = [
      11, 12
    ]
    // expect(Money.fromMinorUnit(roundToZero).roundUp().toMinorUnit()).toBe(0)
    for (const d of roundToTen) {
      console.log(d)
      expect(Money.fromMinorUnit(d).roundUp().toMinorUnit()).toBe(10)
    }
    for (const d of roundToTwenty) {
      expect(Money.fromMinorUnit(d).roundUp().toMinorUnit()).toBe(20)
    }
  })

  it("does locale formatting", () => {
    const m = Money.fromMinorUnit(123)
    const expected = "1,23 €" // includes non-breaking space character
    expect(m.toString("de-DE", "EUR")).toBe(expected)
  })
})