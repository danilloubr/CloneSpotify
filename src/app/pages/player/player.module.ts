import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routers';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeUsuarioComponent } from 'src/app/components/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistasComponent } from 'src/app/components/top-artistas/top-artistas.component';
import { PainelDireitoComponent } from 'src/app/components/painel-direito/painel-direito.component';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistasComponent,
    PainelDireitoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas),
    FontAwesomeModule
  ]
})
export class PlayerModule { }
