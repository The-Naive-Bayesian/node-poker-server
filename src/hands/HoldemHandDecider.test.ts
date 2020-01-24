import Card from "../Card";
import {FaceValue, Suite} from "../CardEnums";
import HoldemHandDecider from "./HoldemHandDecider";
import {Type} from "./HandEnums";

describe('HoldemHandDecider', () => {
  test('getHand returns a hand with the right cards', () => {
    const jack = new Card(FaceValue.JACK, Suite.DIAMOND);
    const eight = new Card(FaceValue.EIGHT, Suite.DIAMOND);
    const ace = new Card(FaceValue.ACE, Suite.SPADE);
    const seven = new Card(FaceValue.SEVEN, Suite.CLUB);
    const queen = new Card(FaceValue.QUEEN, Suite.CLUB);

    const cards = [
      jack,
      new Card(FaceValue.THREE, Suite.DIAMOND),
      eight,
      ace,
      new Card(FaceValue.FOUR, Suite.HEART),
      seven,
      queen,
    ];

    const {cards: result} = HoldemHandDecider.getHand(cards);

    expect(result).toContain(jack);
    expect(result).toContain(ace);
    expect(result).toContain(eight);
    expect(result).toContain(seven);
    expect(result).toContain(queen);
  });

  test('getHand returns a hand with the type', () => {
    const cards = [
      new Card(FaceValue.JACK, Suite.DIAMOND),
      new Card(FaceValue.THREE, Suite.DIAMOND),
      new Card(FaceValue.EIGHT, Suite.DIAMOND),
      new Card(FaceValue.ACE, Suite.SPADE),
      new Card(FaceValue.FOUR, Suite.HEART),
      new Card(FaceValue.SEVEN, Suite.CLUB),
      new Card(FaceValue.QUEEN, Suite.CLUB),
    ];

    const {type} = HoldemHandDecider.getHand(cards);

    expect(type).toBe(Type.HIGH_CARD);
  });
});
