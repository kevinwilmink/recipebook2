import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase'; // Importeer alles van firebase

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    // de apiKey/authDomain zijn op te halen vanaf de firebase website> authentication > web setup
    firebase.initializeApp({
      apiKey: 'AIzaSyCSkL9ijGPp9qRZqJfcj0wfU_qkfyo56TY',
      authDomain: 'ng-recipe-book-a58e9.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
