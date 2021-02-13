import { Injectable } from '@angular/core';
import { ItemProduct } from '../model/item-product.model';
import { Panie } from '../model/panie.model';
import { ProductModel } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class PanieService {

  public currentPanieName:string="panier_1";
  public panies:Map<string, Panie> | any = new Map();
  public my:boolean = false;

  constructor() { 
    // let mypanie = localStorage.getItem("myPanie");
    // if(mypanie){
    //   this.panies = JSON.parse(mypanie);
    // }else{
      let panie:any = new Panie(this.currentPanieName);
      this.panies.set(this.currentPanieName, panie);
      //this.panies[this.currentPanieName] = mypanie;
    //}
    
    
  }

  public addProductToPanie(product:ProductModel):void{
    let panie:any = this.panies.get(this.currentPanieName);
    let itemProduct:ItemProduct = panie.items.get(product.id);
    if(itemProduct){
      itemProduct.quantity+=product.quantity;
    }else{
      itemProduct = new ItemProduct();
      itemProduct.price = product.currentPrice;
      itemProduct.quantity = product.quantity;
      itemProduct.product = product;
      panie.items.set(product.id, itemProduct);
      this.savePanies();
    }
  }

  public getCurrentPanie():Panie{
    return this.panies.get(this.currentPanieName);
    // let caddy=this.panies[this.currentPanieName].get();
    // return caddy;
  }
  public getTotal():number{
    let total =0;
    let items:IterableIterator<ItemProduct>|any=this.getCurrentPanie().items.values();
    
    for(let item of items){
      total+=item.price * item.quantity;
    }
    // let panie:any = this.panies[this.currentPanieName];
    // for(let key in panie.items.values){
    //   total+= panie.items[key].price * panie.items[key].quantity;
    // }
    return total;
  }

  public savePanies(){
    localStorage.setItem("myPanie", JSON.stringify(this.panies));
  }
}
