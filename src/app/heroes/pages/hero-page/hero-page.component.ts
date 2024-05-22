import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;

  constructor(private heroService : HeroService
    , private activatedRoute: ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.heroService.getHeroById(id) ),
    ).subscribe(hero =>{
      if(!hero) return this.router.navigate(['/heroes/list']);
      this.hero=hero;
      return;
    })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }
}
