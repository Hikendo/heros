import { Component } from '@angular/core';

@Component({
  selector: 'app-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styles: ``
})
export class AddHeroPageComponent {
  public publishers =[
    {id:'DC Comics', describe: 'Dc - Comics'},
    {id:'Marvel Comics', describe: 'Marvel - Comics'}

  ]

}
