import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../service/hero.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-hero-page',
  templateUrl: './search-hero-page.component.html',
  styles: ``
})
export class SearchHeroPageComponent {

  public searchInput = new FormControl('');
  public heroes:Hero[]=[];
  public selectedHero?:Hero;

  constructor(private heroService:HeroService){

  }

  searchHero(){
    const value:string = this.searchInput.value || '';
    this.heroService.getSuggestions(value)
    .subscribe(heroes => this.heroes=heroes);
  }
  optionSelectedOption(event: MatAutocompleteSelectedEvent ):void{
    if(!event.option.value){
      this.selectedHero=undefined;
      return;
    }
    const hero:Hero = event.option.value;
    this.searchInput.setValue(hero.superhero)
    this.selectedHero= hero;

  }

}
