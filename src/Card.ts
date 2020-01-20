import {FaceValue, Suite} from "./CardEnums";

export default class Card {
  constructor(public readonly value: FaceValue, public readonly suite: Suite) {}

  compareTo(other: Card): number {
    return this.value - other.value;
  }
}