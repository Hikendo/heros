import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{

  public heroes: Hero[] = [];
  constructor(private heroService:HeroService){}

  ngOnInit(): void {
      this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
