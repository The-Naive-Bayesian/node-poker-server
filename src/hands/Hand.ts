import {Type} from "./HandEnums";
import Card from "../Card";

export default interface Hand {
  compareTo(other: Hand): number;
  toString(): string;
  cards: Card[]
  type: Type;
}