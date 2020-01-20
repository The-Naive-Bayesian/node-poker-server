import Card from "./Card";

export default class HandPlayer {
  private holeCards: Card[];

  constructor(
    private stack: number,
    public readonly name: string,
    public readonly hasBigBlind: Boolean,
    public readonly hasSmallBlind: Boolean,
  ) {}

  setHoleCards(cards: Card[]): void {
    this.holeCards = cards;
  }

  getHoleCards(): Card[] {
    return [...this.holeCards];
  }
}