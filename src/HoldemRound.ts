import HandPlayer from "./HandPlayer";
import Deck from "./Deck";
import Card from "./Card";
import HoldemHandDecider from "./hands/HoldemHandDecider";
import HighCardHand from "./hands/HighCardHand";
import Hand from "./hands/Hand";

export default class HoldemRound {
  private readonly boardCards: Card[];
  pot: Pot;

  constructor(public readonly players: HandPlayer[], private deck: Deck, private bigBlind: number, private smallBlind: number) {
    this.boardCards = [];
    this.pot = new Pot();
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

    this.pot.settleBets();
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
    this.takePlayerBet(player, this.bigBlind);
  }

  private handlePlayerSmallBlind(player: HandPlayer): void {
    console.log(`${player.name} has the small blind`);
    this.takePlayerBet(player, this.smallBlind);
  }

  // TODO: remember player bets until next stage (e.g. flop --> turn, turn --> river, etc)
  private takePlayerBet(player: HandPlayer, amount: number): void {
    const bet = player.bet(amount);
    this.pot.contributeToPot(player.name, bet);

    // Logging for dev work
    // TODO: remove
    console.log(`Pot is now ${this.pot.getPot()}`);
  }

  private assignPlayerHoleCards(player: HandPlayer): void {
    const holeCards = this.deck.drawCards(2);
    player.setHoleCards(holeCards);
  }

  private handlePlayerPreFlop(player: HandPlayer): void {}

  flop(): void {
    this.drawBoardCards(3);

    // Logging for dev work
    // TODO: remove
    console.log(`Flop was ${this.boardCards[0].toShortString()}, ${this.boardCards[1].toShortString()}, ${this.boardCards[2].toShortString()}`);

    for (let i=0; i<this.players.length; i++) {
      this.handlePlayerFlop(this.players[i]);
    }

    this.pot.settleBets();
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
    console.log(`Turn was ${this.boardCards[3].toShortString()}`);

    for (let i=0; i<this.players.length; i++) {
      this.handlePlayerTurn(this.players[i]);
    }

    this.pot.settleBets();
  }

  private handlePlayerTurn(player: HandPlayer): void {}

  river(): void {
    this.drawBoardCards(1);

    // Logging for dev work
    // TODO: remove
    console.log(`River was ${this.boardCards[4].toShortString()}`);

    for (let i=0; i<this.players.length; i++) {
      this.handlePlayerRiver(this.players[i]);
    }

    this.pot.settleBets();
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

    this.distributeWinnings(winners, playerHands);
  }

  private distributeWinnings(winners: HandPlayer[], playerHands: Hand[]): void {
    let chipsToDistribute = this.pot;

    // Logging for dev work
    // TODO: remove
    if (winners.length == 1) {
      console.log(`Player ${winners[0].name} won with: ${playerHands[0]}`);
      winners[0].receiveChips(this.pot.getPot());
    } else {
      console.log(`${winners.length} players tied:`);

      const distributions = this.pot.distributePot(winners.length);
      winners.forEach((winner, i) => {
        console.log(`${winner.name} with ${playerHands[i]}`);
        winner.receiveChips(distributions[i]);
      });
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

class Pot {
  private pot: number;
  private liveBets: {[playerId: string]: number};

  constructor() {
    this.pot = 0;
    this.liveBets = {};
  }

  contributeToPot(playerId: string, amount: number): void {
    if (!this.liveBets[playerId]) {
      this.liveBets[playerId] = 0;
    }
    this.liveBets[playerId] += amount;
    this.pot += amount;
  }

  settleBets(): void {
    this.liveBets = {};
  }

  distributePot(winnerCount: number): number[] {
    const distributions = [];

    // TODO: distribute pot more fairly
    let chipsToDistribute = this.pot;
    const potFraction = Math.floor(chipsToDistribute / winnerCount);

    for (let i=0; i<winnerCount - 1; i++) {
      distributions.push(potFraction);
      chipsToDistribute -= potFraction;
    }

    distributions.push(chipsToDistribute);

    return distributions;
  }

  getPot(): number {
    return this.pot;
  }
}