export default class Money {
  constructor(
    readonly amount: number = 0
  ) {
  }

  // A cent is a thousandth of a minor currency unit
  private static readonly FACTOR = 1000

  add(summand: Money): Money {
    return new Money(this.amount + summand.amount)
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor)
  }

  /**
   * Rounds to the closest minor unit.
   */
  toMinorUnit(): number {
    return Math.round(this.amount / Money.FACTOR)
  }

  toMajorUnit(): number {
    return this.toMinorUnit() / 100;
  }

  /**
   * Rounds up to the next 10th minor unit.
   */
  roundUp(): Money{
    return Money.fromMinorUnit(Math.ceil(this.toMinorUnit() / 10) * 10)
  }

  static fromMinorUnit(minor: number): Money {
    return new Money(minor * this.FACTOR)
  }

  /**
   * This assumes a factor of 100 between "cents" and a major unit.
   */
  static fromMajorUnit(major: number): Money {
    return Money.fromMinorUnit(major * 100)
  }

  /**
   * Formatting for display purposes
   * @param locale An unicode locale identifier (e.g, "de-DE" or "en-EN").
   * @param currency An ISO 4217 currency (e.g., "EUR" or "USD").
   * @see https://www.xe.com/iso4217.php
   * @see https://unicode.org/reports/tr35/#Identifiers
   */
  toString(locale: string = "en-EN", currency: string = "EUR") {
    return new Intl.NumberFormat(locale, { style: "currency", currency })
      .format(this.toMajorUnit())
  }

}
