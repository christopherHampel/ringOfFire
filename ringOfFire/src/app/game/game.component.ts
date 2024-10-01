import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, collection, collectionData, doc, onSnapshot, setDoc, addDoc, getDoc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, DialogAddPlayerComponent, GameInfoComponent, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  


  items$: Observable<any>;



  game: Game;
  gameId: string;

  constructor( private route: ActivatedRoute, public dialog: MatDialog ) {} 

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe( (params) => {
      this.gameId = params['id'];
      // console.log(params);

      // const gamesCollection = collection(this.firestore, 'games');
      const gameDocRef = doc(this.firestore, `games/${this.gameId}`);
            
      // Abrufen der Dokument-Daten als Observable
      this.items$ = docData(gameDocRef);
      // this.items$ = collectionData(gamesCollection, params['id']);
      this.items$.subscribe((game:any) => {
        console.log('Game update:', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })  
  }

  async newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || 'default_card.png';
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard as string);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame() {
    await setDoc(doc(this.firestore, `games/${this.gameId}`), this.game.toJson());
  }
}