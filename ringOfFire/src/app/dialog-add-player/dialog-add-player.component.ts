import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameComponent } from '../game/game.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [ MatDialogModule, MatFormField, MatLabel, FormsModule, MatInputModule, GameComponent ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);

  name: string = '';

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
