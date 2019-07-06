import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private data = {
    user: null,
    computer: null,
    result: null,
    count: 0,
    win: 0,
    loose: 0,
    draw: 0
  };

  private click(user: string) {
    this.data.user = user;

    this.play()
      .then(computer => {
        if (user === computer) this.draw();
        else if (user === 'rock') computer === 'scissors' ? this.win() : this.loose();
        else if (user === 'paper') computer === 'rock' ? this.win() : this.loose();
        else if (user === 'scissors') computer === 'paper' ? this.win() : this.loose();
    });
 }

  private play() {
    return new Promise(resolve => {
      let count = 0;

      const interval = setInterval(() => {
        if (this.data.computer === 'rock') this.data.computer = 'paper';
        else if (this.data.computer === 'paper') this.data.computer = 'scissors';
        else this.data.computer = 'rock';

        count++;
        if (count > 10) {
          clearInterval(interval);

          const play = Math.floor(Math.random() * 3) + 1;

          switch (play) {
            case 1:
              this.data.computer = 'rock';
              break;

            case 2:
              this.data.computer = 'paper';
              break;

            case 3:
              this.data.computer = 'scissors';
              break;

            default:
              this.data.computer = 'broken';
              break;
          }

          resolve(this.data.computer);
        }
      }, 100);
    });
  }

  private draw() {
    this.data.result = 'draw';
    this.data.count++;
    this.data.draw++;
  }

  private win() {
    this.data.result = 'win';
    this.data.count++;
    this.data.win++;
  }

  private loose() {
    this.data.result = 'loose';
    this.data.count++;
    this.data.loose++;
  }
}
