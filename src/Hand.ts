import Card from "./Card";
import {Type} from "./HandEnums";

export default class Hand {
  public readonly size;
  constructor(public readonly cards: Card[], public readonly type: Type) {
    this.size = this.cards.length;
  }

  /**
   * Currently assumes both hands are type HIGH_CARD
   */
  compareTo(other: Hand): number {
    if (this.size !== other.size) {
      throw Error(`hand size mismatch: hand 1 had ${this.size} cards while hand 2 had ${other.size}`);
    }

    // Sort in descending order of value
    this.sort();
    other.sort();

    for (let i = 0; i < this.size; i++) {
      const result = this.cards[i].compareTo(other.cards[i]);
      if (result < 0) return -1;
      else if (result > 0) return 1;
    }

    // If all cards of equal value, it's a tie
    return 0;
  }

  toString(): string {
    this.sort();
    return this.cards
      .map(card => card.toShortString())
      .join(', ');
  }

  sort(): void {
    const sortFn = (card1, card2) => card2.compareTo(card1);
    this.cards.sort(sortFn);
  }
}