import HoldemRound from "./HoldemRound";
import HandPlayer from "./HandPlayer";
import Deck from "./Deck";

describe('HoldemRound', () => {
  describe('play', () => {
    test('it runs without error', () => {
      const players = [
        new HandPlayer(110, 'Player 1', true, false),
        new HandPlayer(90, 'Player 2', false, true),
        new HandPlayer(100, 'Player 3', false, false),
      ];
      const deck = new Deck();
      const round = new HoldemRound(players, deck, 2, 1);

      round.play();
    });
  });
});