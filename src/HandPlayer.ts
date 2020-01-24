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

    // Logging for dev work
    // TODO: remove
    console.log(`Player ${this.name} drew ${cards.map(card => card.toShortString()).join(', ')}`);
  }

  getHoleCards(): Card[] {
    return [...this.holeCards];
  }

  bet(amount: number): number {
    const bet = Math.min(amount, this.stack);
    this.stack -= bet;

    // Logging for dev work
    // TODO: remove
    console.log(`${this.name} bet ${bet}`);
    console.log(`${this.name} now has stack of ${this.stack}`);

    return bet;
  }

  receiveChips(amount: number): void {
    this.stack += amount;
    console.log(`${this.name} received ${amount} and now has stack ${this.stack}`);
  }

  getStack(): number {
    return this.stack;
  }
}