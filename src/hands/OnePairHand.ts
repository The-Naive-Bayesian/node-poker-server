import Hand from "./Hand";
import {Type} from "./HandEnums";
import Card from "../Card";
import {FaceValue} from "../CardEnums";

export default class OnePairHand implements Hand {
  public readonly size;
  public readonly type: Type;

  constructor(public readonly cards: Card[], public readonly pairValue: FaceValue) {
    this.size = this.cards.length;
    this.type = Type.PAIR;
  }

  compareTo(other: Hand): number {
    const typeCompareResult = this.type - other.type;
    if (typeCompareResult != 0) return typeCompareResult;

    return this.compareOnePairHands(other as OnePairHand);
  }

  private compareOnePairHands(other: OnePairHand): number {
    const pairCompareResult = this.pairValue - other.pairValue;
    if (pairCompareResult != 0) return pairCompareResult;

    const nonPairCards = this.cards.filter(card => card.value != this.pairValue);
    const nonPairCardsOther = other.cards.filter(card => card.value != this.pairValue);
    // Sort in descending order of value
    const sortFn = (card1, card2) => card2.compareTo(card1);
    nonPairCards.sort(sortFn);
    nonPairCardsOther.sort(sortFn);

    for (let i = 0; i < nonPairCards.length; i++) {
      const result = nonPairCards[i].compareTo(nonPairCardsOther[i]);
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