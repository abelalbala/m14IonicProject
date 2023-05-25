import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service'

@Component({
  selector: 'app-llistat',
  templateUrl: './llistat.page.html',
  styleUrls: ['./llistat.page.scss'],
  providers: [ApiService],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LlistatPage implements OnInit {
  productes: any[] = [];

  constructor(public apiService: ApiService, private storage:StorageService) { }

  async addProductToCart(id: number) {
    console.log('Índice del elemento a eliminar:', id);
    await this.storage.set('products', id);
  }

  getData(){
    this.apiService.getProducts().subscribe((response:any) => {
      this.productes = response.products;   
      console.log(this.productes)
    });
  } 

  ngOnInit() {
    this.getData();
  }
}
