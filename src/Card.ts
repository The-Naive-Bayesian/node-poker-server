import {FaceValue, Suite} from "./CardEnums";

export default class Card {
  constructor(public readonly value: FaceValue, public readonly suite: Suite) {}

  compareTo(other: Card): number {
    return this.value - other.value;
  }

  toString(): string {
    const suites = {
      [Suite.CLUB]: 'club',
      [Suite.DIAMOND]: 'diamond',
      [Suite.HEART]: 'heart',
      [Suite.SPADE]: 'spade',
   };
   const values = {
      [FaceValue.TWO]: 'two',
      [FaceValue.THREE]: 'three',
      [FaceValue.FOUR]: 'four',
      [FaceValue.FIVE]: 'five',
      [FaceValue.SIX]: 'six',
      [FaceValue.SEVEN]: 'seven',
      [FaceValue.EIGHT]: 'eight',
      [FaceValue.NINE]: 'nine',
      [FaceValue.TEN]: 'ten',
      [FaceValue.JACK]: 'jack',
      [FaceValue.QUEEN]: 'queen',
      [FaceValue.KING]: 'king',
      [FaceValue.ACE]: 'ace',
   };

   return `${values[this.value]} of ${suites[this.suite]}s`
  }

  toShortString(): string {
    const suites = {
      [Suite.CLUB]: 'c',
      [Suite.DIAMOND]: 'd',
      [Suite.HEART]: 'h',
      [Suite.SPADE]: 's',
   };
   const values = {
      [FaceValue.TWO]: '2',
      [FaceValue.THREE]: '3',
      [FaceValue.FOUR]: '4',
      [FaceValue.FIVE]: '5',
      [FaceValue.SIX]: '6',
      [FaceValue.SEVEN]: '7',
      [FaceValue.EIGHT]: '8',
      [FaceValue.NINE]: '9',
      [FaceValue.TEN]: 'T',
      [FaceValue.JACK]: 'J',
      [FaceValue.QUEEN]: 'Q',
      [FaceValue.KING]: 'K',
      [FaceValue.ACE]: 'A',
   };

   return values[this.value] + suites[this.suite];
  }
}