import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero';
import { HeroService } from '../../service/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../../components/confim-dialog/confim-dialog.component';

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
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
          this.showSnackbar(`${hero.superhero} updated`)

        }
      );
      return;
    }
    this.heroService.addHero(this.currentHero).subscribe( hero=>
      {
        this.router.navigate(['/heroes/edit',hero.id]);
        this.showSnackbar(`${hero.superhero} created`);
      }
    )

  }
  onConfirmDeleteHero(){
      if (!this.currentHero.id) throw Error('Hero Id is required');
      let dialogRef = this.dialog.open(ConfimDialogComponent, {
        width: '300px',
        data: this.heroForm.value
      });

      dialogRef.afterClosed()
      .pipe(
        filter((result:boolean)=> result),
        switchMap(()=>this.heroService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted:boolean)=> wasDeleted),

      )
      .subscribe(()=>{
        this.router.navigate(['/heroes']);
      })
      /*dialogRef.afterClosed().subscribe(result => {
            //todo
            if(!result) return;
            this.heroService.deleteHeroById(this.currentHero.id).subscribe(
              wasDeleted =>
                 {if(wasDeleted) this.router.navigate(['/heroes']);}
            )

      });*/


  }
  showSnackbar(message: string):void{
    this.snackbar.open(message, 'done',
      {
        duration: 2500,
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
