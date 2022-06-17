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
import { BuscasRecentesComponent } from 'src/app/components/buscas-recentes/buscas-recentes.component';
import { FormsModule } from '@angular/forms';
import { MelhoresArtistasComponent } from 'src/app/components/melhores-artistas/melhores-artistas.component';
import { ArtistaItemComponent } from 'src/app/components/artista-item/artista-item.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistasComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    MelhoresArtistasComponent,
    ArtistaItemComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas),
    FontAwesomeModule,
    FormsModule
  ]
})
export class PlayerModule { }
