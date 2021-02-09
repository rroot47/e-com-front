import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { ProductModel } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public currentProduct:any;
  public timestemp:number=0;
  public editPhoto: boolean = false;
  public selectedFiles:any;
  public progress:number|any;
  public currentFileUpload:any;
  public mode: number=0;

  constructor(
    public catalogueService: CatalogueService,
    public route: ActivatedRoute,
    public authService:AuthenticationService,
    private router: Router 
    ) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url)
    //console.log(url)
    this.catalogueService.getProduct(url).subscribe(data =>{
        this.currentProduct = data;
    });
  }

  getTs(){
    return this.timestemp;
  }

  isAdmin(){
    return this.authService.isAdmin()
  }

  onEditProduct() {
    this.mode=1;
  }
  
  onEditPhoto(p:ProductModel){
    this.currentProduct=p;
    this.editPhoto=true;
  }

  // onProductDetails(product:ProductModel) {
  //   let url = btoa(product._links.product.href);
  //   this.router.navigateByUrl("product-detail/"+url);
  // }
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
        this.editPhoto=false;
      }
    },err =>{
      alert("Problème de chargement");
    });
    this.selectedFiles = undefined
  }

  onUpdateProduct(data:any) {
    
  }
}
