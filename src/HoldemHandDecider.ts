import Hand from "./Hand";
import Card from "./Card";
import {Type} from "./HandEnums";

export default class HoldemHandDecider {
  /**
   * Currently only gets HIGH_CARD hands
   */
  static getHand(cards: Card[]): Hand {
    if (cards.length < 5) {
      throw Error(`need at least 5 cards to form a hand in Texas Hold 'em, but only ${cards.length} provided`);
    }

    // Sort in descending order of value
    const sortFn = (card1, card2) => card2.compareTo(card1);
    cards.sort(sortFn);

    const type = Type.HIGH_CARD;
    const handCards = cards.slice(0, 5);
    return new Hand(handCards, type);
  }
}