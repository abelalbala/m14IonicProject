import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  providers: [ApiService],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {
  id: any;
  product: any;
  idsProductes: any[] = [];

  constructor(private route: ActivatedRoute, public apiService: ApiService, private storage:StorageService) {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("Product ID: "+this.id);

    this.apiService.getProductById(this.id).subscribe((response:any) => {
      this.product = response.product;   
      console.log(this.product)
    });
  }

  async addToCart() {
    if (await this.storage.get('productes')) {
      this.idsProductes = JSON.parse(await this.storage.get('productes') || '[]');
    }
    
    const index = this.idsProductes.findIndex((object) => {
        return object.id === this.id;
    });
    
    if (index === -1) {
        this.idsProductes.push({id: this.id, qty: 1});
    } else {
        this.idsProductes[index].qty++;
    }
    await this.storage.set('productes', JSON.stringify(this.idsProductes));
    console.log("Productos localStorage: "+ await this.storage.get('productes'));
  }

  ngOnInit() {
  }
}
