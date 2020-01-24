import HighCardHand from "./HighCardHand";
import Card from "../Card";
import Hand from "./Hand";
import {FaceValue} from "../CardEnums";
import OnePairHand from "./OnePairHand";

export default class HoldemHandDecider {
  /**
   * Currently only gets HIGH_CARD hands
   */
  static getHand(cards: Card[]): Hand {
    if (cards.length < 5) {
      throw Error(`need at least 5 cards to form a hand in Texas Hold 'em, but only ${cards.length} provided`);
    }

    // One pair
    let hasPair = false;
    const valueCount = {};
    cards.forEach(card => {
      if (!valueCount[card.value]) {
        valueCount[card.value] = 0;
      }
      valueCount[card.value] += 1;
      if (valueCount[card.value] > 1) {
        hasPair = true;
      }
    });

    if (hasPair) {
      let maxPairValue: FaceValue = FaceValue.TWO;
      for (let valueStr in valueCount) {
        const value = Number(valueStr);
        if (valueCount[value] < 2) continue;

        if (value > maxPairValue) {
          maxPairValue = value;
        }
      }

      const pairHandCards: Card[] = [];

      const sortFn = (card1, card2) => card2.compareTo(card1);
      cards.sort(sortFn);

      const pairCardIndex = cards.findIndex(card => card.value == maxPairValue);
      pairHandCards.push(...cards.splice(pairCardIndex, 2));
      pairHandCards.push(...cards.slice(0, 3));

      return new OnePairHand(pairHandCards, maxPairValue);
    }


    // High card
    // Sort in descending order of value
    const sortFn = (card1, card2) => card2.compareTo(card1);
    cards.sort(sortFn);

    const handCards = cards.slice(0, 5);
    return new HighCardHand(handCards);
  }
}