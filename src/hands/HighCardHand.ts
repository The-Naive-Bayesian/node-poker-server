import Card from "../Card";
import Hand from "./Hand";
import {Type} from "./HandEnums";

export default class HighCardHand implements Hand {
  public readonly size;
  public readonly type: Type;

  constructor(public readonly cards: Card[]) {
    this.size = this.cards.length;
    this.type = Type.HIGH_CARD;
  }

  compareTo(other: Hand): number {
    const typeCompareResult = this.type - other.type;
    if (typeCompareResult != 0) return typeCompareResult;

    return this.compareHighCardHands(other as HighCardHand);
  }

  private compareHighCardHands(other: HighCardHand): number {
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