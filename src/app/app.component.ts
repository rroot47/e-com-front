import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from './catalogue.service';
import { AuthenticationService } from './services/authentication.service';
import { PanieService } from './services/panie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public categories:any;
  public currentCat:any; //pour le categories selectionée
  constructor( 
              private catalogueService :CatalogueService, 
              private router:Router, 
              private authService:AuthenticationService,
              public panieService:PanieService
              ){}
  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFormLocalStorage();
    this.getCategories();
  }
  getCategories() {
    this.catalogueService.getRessource("/categories").subscribe(data => {
      this.categories = data;
    }, err=>{
      console.log(err);
    });
  }

  getproductbyCategory(c:any){
    this.currentCat = c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }
  onSelectedProducts(){
    this.currentCat = undefined;
    this.router.navigateByUrl("/products/1/0");
  }
  onProductsPromo(){
    this.currentCat = undefined;
    this.router.navigateByUrl("/products/3/0");
  }
  onProductsDispo(){
    this.currentCat = undefined;
    this.router.navigateByUrl("/products/4/0");
  }
  onLogout(){
    this.authService.removeTokenFormLocalStorage()
    this.router.navigateByUrl('/login');
  }
}
