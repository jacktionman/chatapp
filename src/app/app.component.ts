import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  items: FirebaseListObservable<any>;
  listItem: FirebaseListObservable<any>;

  constructor(af: AngularFire) {

    this.items = af.database.list('/chats');
    this.listItem = af.database.list('/chats', {
      query: {
        limitToLast: 1,
        orderByKey: true
      }
    });

  }


  
}
