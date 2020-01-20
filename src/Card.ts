import {FaceValue, Suite} from "./CardEnums";

export default class Card {
  constructor(public readonly value: FaceValue, public readonly suite: Suite) {}

  compareTo(card: Card): number {
    return this.value - card.value;
  }
}