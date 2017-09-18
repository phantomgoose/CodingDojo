import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Switchboard';
  button_array: Array<Button> = [];

  constructor() {
    for (let i = 0; i < 10; i++){
      this.button_array.push(new Button);
    }
  }
}

class Button {
  state: boolean = true;

  flip(): void {
    this.state ? this.state = false : this.state = true;
  }
}