import Card from "./Card";
import {FaceValue, Suite} from "./CardEnums";

describe('Card', () => {
  test('.compareTo returns <0 when card is lower', () => {
    const card1 = new Card(FaceValue.THREE, Suite.DIAMOND);
    const card2 = new Card(FaceValue.NINE, Suite.CLUB);

    expect(card1.compareTo(card2)).toBeLessThan(0);
  });

  test('.compareTo returns >0 when card is higher', () => {
    const card1 = new Card(FaceValue.ACE, Suite.HEART);
    const card2 = new Card(FaceValue.KING, Suite.SPADE);

    expect(card1.compareTo(card2)).toBeGreaterThan(0);
  });

  test('.compareTo returns 0 when cards are equal', () => {
    const card1 = new Card(FaceValue.JACK, Suite.CLUB);
    const card2 = new Card(FaceValue.JACK, Suite.SPADE);

    expect(card1.compareTo(card2)).toBe(0);
  });
});
