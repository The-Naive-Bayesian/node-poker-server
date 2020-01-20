import Card from "./Card";
import {FaceValue, Suite} from "./CardEnums";
import Hand from "./Hand";
import {Type} from "./HandEnums";

describe('Hand', () => {
  test('.compareTo returns <0 when hand is lower', () => {
    const cards1 = [
      new Card(FaceValue.THREE, Suite.DIAMOND),
      new Card(FaceValue.NINE, Suite.CLUB)
    ];
    const hand1 = new Hand(cards1, Type.HIGH_CARD);

    const cards2 = [
      new Card(FaceValue.TWO, Suite.SPADE),
      new Card(FaceValue.TEN, Suite.CLUB)
    ];
    const hand2 = new Hand(cards2, Type.HIGH_CARD);

    expect(hand1.compareTo(hand2)).toBeLessThan(0);
  });

  test('.compareTo returns >0 when hand is higher', () => {
    const cards1 = [
      new Card(FaceValue.FOUR, Suite.DIAMOND),
      new Card(FaceValue.NINE, Suite.CLUB)
    ];
    const hand1 = new Hand(cards1, Type.HIGH_CARD);

    const cards2 = [
      new Card(FaceValue.TWO, Suite.SPADE),
      new Card(FaceValue.NINE, Suite.DIAMOND)
    ];
    const hand2 = new Hand(cards2, Type.HIGH_CARD);

    expect(hand1.compareTo(hand2)).toBeGreaterThan(0);
  });

  test('.compareTo returns 0 when hands are equal', () => {
    const cards1 = [
      new Card(FaceValue.FOUR, Suite.DIAMOND),
      new Card(FaceValue.NINE, Suite.CLUB)
    ];
    const hand1 = new Hand(cards1, Type.HIGH_CARD);

    const cards2 = [
      new Card(FaceValue.FOUR, Suite.SPADE),
      new Card(FaceValue.NINE, Suite.DIAMOND)
    ];
    const hand2 = new Hand(cards2, Type.HIGH_CARD);

    expect(hand1.compareTo(hand2)).toBe(0);
  });
});
