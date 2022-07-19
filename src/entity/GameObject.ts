export class GameObject {
  value: number;
  moves: { [key: string]: number };
  private checker: boolean;
  private lifetime: number;
  private timerId: NodeJS.Timer;

  constructor(value: number) {
    this.value = value;
    this.checker = false;
    this.moves = {};
    this.lifetime = 0;

    this.timerId = setInterval(() => {
      this.lifetime = this.lifetime + 1;
    }, 1000);
  }

  get isChecker() {
    return this.checker;
  }

  get lifeTime() {
    return this.lifetime;
  }

  private stopTimer() {
    clearInterval(this.timerId);
  }

  saveMove(key: string) {
    if (!this.moves[key]) {
      this.moves[key] = 1;
      return;
    }
    // this.moves.push(key);
    this.moves[key] = this.moves[key]++;
  }

  raiseToCheckers() {
    this.checker = true;
  }

  destroySelf() {
    this.stopTimer();
  }
}
