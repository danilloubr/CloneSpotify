import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artista-item',
  templateUrl: './artista-item.component.html',
  styleUrls: ['./artista-item.component.scss']
})
export class ArtistaItemComponent implements OnInit {

  @Input()
  imgSrc = ""

  @Input()
  nomeArtista = ""

  @Output()
  click = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit()
  }

}
