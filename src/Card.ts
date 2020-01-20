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
   }
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
}