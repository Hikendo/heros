import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent implements OnInit{
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
      if(!this.hero)throw Error('Hero property is required');

  }

}
