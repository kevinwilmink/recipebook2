import * as firebase from 'firebase';
import {catchError} from 'rxjs/operators';
import 'firebase/auth';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

/* Authentication met Firebase
  - in firebase enable bij authentication password/email
  - $npm install firebase --save
  - initieer firebase app (zie app.component) met apiKey en authDomain
  - nu kan je inloggen met firebase.auth().signInWithEmailAndPassword etc. Token word opgeslagen in storage (zie hieronder)
  - zorg ervoor dat op firebase read/write op auth != null staan!
  - de token kan opgehaald worden op elk moment, maar dit is een async call, daarom is het een goed practise dit gelijk naar login te doen
    - daar stuurt GetToken() direct de oude token terug, maar async ververst hij de deze
  - calls naar de DB moet je nu de token aan mee sturen, dmv: baseUrl/tabelNaam.json?auth=tokenString

  Authentication in SPA:
    - gebruiker stuurt authentication informatie,
    - Server checked dit en stuurt token terug (containing: auth info)
    - Komende verzoeken sturen de token mee (voorkomt meerdere keren moeten inloggen)
    - Bij SPA (angular) is de server NIET op de hoogte van de clients (bij traditionele webapps WEL (via server: Session, client: Cookie)

  Token
  - de token word standaard opgeslagen in storage, in chrome te vinden via:
        Application > indexedDB> firebaseLocalStorageDB> firebaseLocalStorage (key)
      - anders: Application > Storage > Local Storage > localhost
 */
@Injectable()
export class AuthService {
  // fire.auth() > access to auth functions
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch( // returns a promise, only catch errors for now
      error => console.log(error)
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password) // handle the promise
      .then(
        response => {
          this.router.navigate(['/']); // redirect na het inloggen
          // Gelijk na het inloggen de token ophalen is een good practise
            firebase.auth().currentUser.getIdToken()
              .then(
              (token: string) => {
                this.token = token;
              }
            );
        }
      )
      .catch(
        error => console.log(error)
      );
  }


  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  // get the token will return a promise. it will retrieve a token from the server if there is no token and it will be validaded
  getToken() {
    // haal opnieuw de token op en ververs hem, stuur echter de oude token terug.
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => {
        this.token = token;
      });
    // Het kan voorkomen dat de oude token nu net experired is, vang dit op dmv error handling
    return this.token;
  }


  isAuthenticated() {
    return this.token != null;
  }
}
