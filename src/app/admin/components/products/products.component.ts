import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    /*
    this.showSpinner(SpinnerType.BallAtom);

    this.httpClientService.get<Create_Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));

    
    this.httpClientService.post({
      controller: "products"
    }, {
      name: "Kalem",
      stock: 100,
      price: 15
    }).subscribe();
    */

    /*
    this.httpClientService.put({
      controller: "products",
    }, {
      id: "0197fa9d-52c0-7fba-8c10-845a9ed084fa",
      name: "Silgi 2",
      price: 3.50,
      stock: 75,
    }).subscribe();
    */
    /*
    this.httpClientService.delete({
      controller: "products"
    }, "0197fa9d-52c0-7fba-8c10-845a9ed084fa").subscribe();
    */
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }

}
