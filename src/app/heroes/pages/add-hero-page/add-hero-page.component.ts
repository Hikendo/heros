import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero';
import { HeroService } from '../../service/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styles: ``
})
export class AddHeroPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id:             new FormControl<string>(''),
  superhero:        new FormControl<string>('',{nonNullable: true}),
  publisher:        new FormControl<Publisher>(Publisher.DCComics),
  alter_ego:        new FormControl<string>(''),
  first_appearance: new FormControl<string>(''),
  characters:       new FormControl<string>(''),
  alt_img:          new FormControl<string>(''),
  });

  constructor(private heroService:HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  get currentHero():Hero{
    const hero= this.heroForm.value as Hero;
    return hero;
  }

  public publishers =[
    {id:'DC Comics', describe: 'Dc - Comics'},
    {id:'Marvel Comics', describe: 'Marvel - Comics'}

  ];
  onSubmit():void{
    if (this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero).subscribe(
        hero => {
          //ToDo : mostrar snackbar

        }
      );
      return;
    }
    this.heroService.addHero(this.currentHero).subscribe(
      {
        //ToDo: mostrar snackbar y navegar a /heroes/edit:id
      }
    )

  }
  ngOnInit(): void {

    if( !this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroService.getHeroById(id) ),
    ).subscribe(hero=> {
      if(!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset( hero );
      return;
    })

  }

}
