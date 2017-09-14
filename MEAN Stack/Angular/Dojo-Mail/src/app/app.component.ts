import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Dojo Mail';
  emails: Array<{ email: string, important: boolean, subject: string, content: string}> = [ 
    {
      email: 'bill@gates.com', important: true, subject: 'New Windows', content: 'Windows XI will launch in year 2100'
    },
    {
      email: 'ada@lovelace.com', important: true, subject: 'Programming', content: 'Enchantress of Numbers'
    },
    {
      email: 'john@carmac.com', important: false, subject: 'Updated Algo', content: 'New algorithm for shadow volumes.'
    },
    {
      email: 'test@test.com', important: false, subject: 'Some random game', content: 'NDAs are fun'
    },
  ];
}
