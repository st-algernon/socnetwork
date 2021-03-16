import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  products: Tag[];                // массив товаров
  tableMode: boolean = true;          // табличный режим

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadProducts();    // загрузка данных при старте компонента  
  }
  // получаем данные через сервис
  loadProducts() {
    this.dataService.getProducts()
      .subscribe((data: Tag[]) => {
        this.products = data;
        console.log(this.products);
      });
  }
}
