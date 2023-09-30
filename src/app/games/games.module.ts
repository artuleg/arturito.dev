import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeInARowComponent } from './three-in-a-row/three-in-a-row.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ClickerComponent } from './clicker/clicker.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MemoryGameComponent } from './memory-game/memory-game.component';



@NgModule({
  declarations: [
    ThreeInARowComponent,
    ClickerComponent,
    AhorcadoComponent,
    MemoryGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,

    RouterModule.forChild([
      { path: 'three-row', component: ThreeInARowComponent },
      { path: 'clicker', component: ClickerComponent },
      { path: 'hangman', component: AhorcadoComponent },
      { path: 'memory', component: MemoryGameComponent }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamesModule { }
