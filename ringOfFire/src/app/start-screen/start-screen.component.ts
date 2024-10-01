import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { GameComponent } from '../game/game.component';
import { Firestore, getFirestore, collection, collectionData, doc, onSnapshot, setDoc, addDoc, getDoc, docData } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [ GameComponent ],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);


  constructor( private router: Router) {

  }

  async newGame() {
    let game = new Game();
    const gamesCollection = collection(this.firestore, 'games');

    await addDoc(gamesCollection, game.toJson()).then( (gameInfo) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });  
  

  }
}
