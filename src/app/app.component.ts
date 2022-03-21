import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KrowKaramel';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD3iBTX_PDTWhjKvHOr8yoTHftrA1qgMqk',
      authDomain: 'krowkaramel-9f3cb.firebaseapp.com',
      databaseURL: 'https://krowkaramel-9f3cb-default-rtdb.europe-west1.firebasedatabase.app/',
      projectId: 'krowkaramel-9f3cb',
      storageBucket: 'krowkaramel-9f3cb.appspot.com',
      messagingSenderId: '788486497056',
      appId: '1:788486497056:web:4e300820c2b193ed67ed45'
    };
    firebase.initializeApp(firebaseConfig);
  }

}

