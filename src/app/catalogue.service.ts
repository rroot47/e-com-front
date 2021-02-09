import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
public host:String="http://localhost:8080"
  constructor(private http:HttpClient) { }

  // une qui permet de chercher n'importe quel composant
  public getRessource(url:string){
    return this.http.get(this.host+url);
  }

  public getProduct(url:string):Observable<ProductModel>{
    return this.http.get<ProductModel>(url);
  }

  uploadPhotoProduct(file: File, idProduct:any):Observable<HttpEvent<{}>>{

    let formData:FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formData, {
      reportProgress:true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  patchResource(url:any,data:any){
    return ;
  }
}
