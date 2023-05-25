import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CarritoPage implements OnInit {

  productes: any[] = [];
  tmpProductes: any[] = [];
  idsProductes: any[] = [];

  constructor(public apiService: ApiService, private storage:StorageService) { }

  remove(id: number): void {
    console.log('Índice del elemento a eliminar:', id);
    // Agrega aquí el código para eliminar el elemento de la lista o realizar otras acciones
  }

  async getData(){
    if (await this.storage.get('productes')) {

      this.tmpProductes = JSON.parse(await this.storage.get('productes') || '[]'); 
      console.log(this.tmpProductes)

      this.idsProductes = this.tmpProductes.map((producte) => producte.id);
      console.log(this.idsProductes);

      let filter = this.idsProductes.join('|');
     
      this.apiService.getProductsFav(filter).subscribe((response:any) => {

        this.productes = response.products;
        this.productes = this.productes.map((product) => {

          let tmpProduct = this.tmpProductes.find(tmpProduct => Number(tmpProduct.id) === product.id);
          if(tmpProduct) {
              product.qty = tmpProduct.qty;
          }
          return product;
        });
        console.log(this.productes)
      });
    }
  } 

  ngOnInit() {
    this.getData();
  }

}
