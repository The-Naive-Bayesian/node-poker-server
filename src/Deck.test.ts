import Deck from "./Deck";

describe('Deck', () => {
  test('it builds with 52 cards', () => {
    const deck = new Deck();
    expect(deck.cards).toHaveLength(52);
  });
});