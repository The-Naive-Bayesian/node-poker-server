import Card from "./Card";
import {FaceValue, Suite} from "./CardEnums";

export default class Deck {
  cards: Card[];

  constructor() {
    this.setInitialCards();
    this.shuffleFisherYates();
  }

  private setInitialCards(): void {
    const suites = [
      Suite.CLUB,
      Suite.DIAMOND,
      Suite.HEART,
      Suite.SPADE,
    ];
    const values = [
      FaceValue.TWO,
      FaceValue.THREE,
      FaceValue.FOUR,
      FaceValue.FIVE,
      FaceValue.SIX,
      FaceValue.SEVEN,
      FaceValue.EIGHT,
      FaceValue.NINE,
      FaceValue.TEN,
      FaceValue.JACK,
      FaceValue.QUEEN,
      FaceValue.KING,
      FaceValue.ACE,
    ];

    this.cards = [];

    suites.forEach(suite => {
      values.forEach(value => {
        this.cards.push(new Card(value, suite));
      });
    });
  }

  /**
   * Randomly shuffle an array using Fisher-Yates algorithm
   * https://stackoverflow.com/a/2450976/1293256
   */
  private shuffleFisherYates(): void {
    let currentIndex = this.cards.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  drawCards(count: number): Card[] {
    const cards: Card[] = [];
    for (let i=0; i<count; i++) {
      cards.push(this.drawCard());
    }

    return cards;
  }

  drawCard(): Card {
    return this.cards.pop();
  }
}