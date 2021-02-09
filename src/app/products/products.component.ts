import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CatalogueService } from './../catalogue.service';
import { ProductModel } from './../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: any;
  public editPhoto: boolean = false;
  public currentProduct:any;
  public selectedFiles:any;
  public progress:number|any;
  public currentFileUpload:any;
  public title: string | any;
  public timestemp:number=0;

  constructor(
     public catalogueService: CatalogueService,
     public route: ActivatedRoute, 
     private router: Router,
     public authService:AuthenticationService
     ) {
  
  }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params.id);
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        //let url = data.url;
        //console.log(url)
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.title = "Produit Selectionnée";
          this.getproducts("/products/search/selectedProduct");
        } else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.title = "Produits de la catégories: " +idCat;
         // console.log(idCat)
          this.getproducts('/categories/' + idCat + '/product');
        }else if (p1 == 3) {
          this.title = "Produits par promotion";
         // console.log(idCat)
          this.getproducts("/products/search/promoProduct");
        }else if (p1 == 4) {
          this.title = "Produits disponible";
         // console.log(idCat)
          this.getproducts("/products/search/dispoProduct");
        }
        // else if (p1 == 5) {
        //   let idCat = this.route.snapshot.params.p2;
        //  // console.log(idCat)
        //   this.getproducts("/products/search/dispoProduct");
        // }
      }
    });
    let p1 = this.route.snapshot.params.p1;
    if (p1 == 1) {
        this.getproducts("/products/search/selectedProduct");
      }
  }
  getproducts(url: string) {
    this.catalogueService.getRessource(url).subscribe(data => {
      this.products = data;
    }, err => {
      console.log(err);
    });
  }

  onEditPhoto(p:any){
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event:any){
    this.selectedFiles= event.target.files;
  }
  uploadPhoto(){
    this.progress =0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
    .subscribe(event => {
      if (event.type===HttpEventType.UploadProgress){
        this.progress=Math.round(100* event.loaded / event.loaded);
      }else if(event instanceof HttpResponse){
        //alert("Fin du Téléchargement...");
        //this.getproducts("/products/search/selectedProduct");
        this.timestemp = Date.now();
      }
    });
  }
  getTs(){
    return this.timestemp;
  }
  isAdmin(){
    return this.authService.isAdmin()
  }
  onProductDetails(product:ProductModel){
    let url = btoa(product._links.product.href);
    this.router.navigateByUrl("product-detail/"+url);
  }

  onAddProductToCaddy(p:any){}
}
