import HandPlayer from "./HandPlayer";
import Deck from "./Deck";
import Card from "./Card";
import HoldemHandDecider from "./HoldemHandDecider";

export default class HoldemRound {
  private readonly boardCards: Card[];

  constructor(public readonly players: HandPlayer[], private deck: Deck) {
    this.boardCards = [];
  }

  play(): void {
    this.preFlop();
    this.flop();
    this.turn();
    this.river();
  }

  preFlop(): void {
    this.handleBlinds();
    this.assignHoleCards();

    for (let i=0; i<this.players.length; i++) {
      this.handlePlayerPreFlop(this.players[i]);
    }
  }

  private handleBlinds(): void {
    for (let i=0; i<this.players.length; i++) {
      const player = this.players[i];
      if (player.hasBigBlind) {
        this.handlePlayerBigBlind(player);
      }
      if (player.hasSmallBlind) {
        this.handlePlayerSmallBlind(player);
      }
    }
  }

  private assignHoleCards(): void {
    for (let i=0; i<this.players.length; i++) {
      const player = this.players[i];
      this.assignPlayerHoleCards(player);
    }
  }

  private handlePlayerBigBlind(player: HandPlayer): void {
    console.log(`${player.name} has the big blind`);
  }

  private handlePlayerSmallBlind(player: HandPlayer): void {
    console.log(`${player.name} has the small blind`);
  }

  private assignPlayerHoleCards(player: HandPlayer): void {
    const holeCards = this.deck.drawCards(2);
    player.setHoleCards(holeCards);
  }

  private handlePlayerPreFlop(player: HandPlayer): void {
    // Logging for dev work
    // TODO: remove
    const [card1, card2] = player.getHoleCards();
    console.log(`Player ${player.name} drew ${card1} and ${card2}`);
  }

  flop(): void {
    this.drawBoardCards(3);

    // Logging for dev work
    // TODO: remove
    console.log(`Flop was ${this.boardCards[0]}, ${this.boardCards[1]}, ${this.boardCards[2]}`);

    for (let i=0; i<this.players.length; i++) {
      this.handlePlayerFlop(this.players[i]);
    }
  }

  private handlePlayerFlop(player: HandPlayer): void {}

  private drawBoardCards(count: number): void {
    const drawnCards = this.deck.drawCards(count);
    this.boardCards.push(...drawnCards);
  }

  turn(): void {
    this.drawBoardCards(1);

    // Logging for dev work
    // TODO: remove
    console.log(`Turn was ${this.boardCards[3]}`);

    for (let i=0; i<this.players.length; i++) {
      this.handlePlayerTurn(this.players[i]);
    }
  }

  private handlePlayerTurn(player: HandPlayer): void {}

  river(): void {
    this.drawBoardCards(1);

    // Logging for dev work
    // TODO: remove
    console.log(`River was ${this.boardCards[4]}`);

    for (let i=0; i<this.players.length; i++) {
      this.handlePlayerRiver(this.players[i]);
    }

    this.handleShowdown(this.players);
  }

  private handlePlayerRiver(player: HandPlayer): void {}

  private handleShowdown(players: HandPlayer[]): void {
    this.sortPlayersByHandValue(players);
    const playerHands = players.map(player => {
      const playerCards = [...player.getHoleCards(), ...this.boardCards];
      return HoldemHandDecider.getHand(playerCards);
    });

    const winners: HandPlayer[] = [players[0]];
    let i = 1;
    while(playerHands[i-1].compareTo(playerHands[i]) == 0) {
      winners.push(players[i]);
      i++;
    }

    // Logging for dev work
    // TODO: remove
    if (winners.length == 1) {
      console.log(`Player ${winners[0].name} won with: ${playerHands[0].cards.join(', ')}`);
    } else {
      console.log(`${winners.length} players tied:`);
      winners.forEach(
        (winner, index) => console.log(`${winner.name} with ${playerHands[index].cards.join(', ')}`)
      );
    }
  }

  private sortPlayersByHandValue(players: HandPlayer[]): void {
    // Sort in descending hand value order
    const sortFunction = (p1: HandPlayer, p2: HandPlayer): number => {
      const p1Cards = [...p1.getHoleCards(), ...this.boardCards];
      const p1Hand = HoldemHandDecider.getHand(p1Cards);

      const p2Cards = [...p2.getHoleCards(), ...this.boardCards];
      const p2Hand = HoldemHandDecider.getHand(p2Cards);

      return p2Hand.compareTo(p1Hand);
    };

    players.sort(sortFunction);
  }
}