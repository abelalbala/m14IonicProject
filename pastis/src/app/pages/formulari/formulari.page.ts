import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-formulari',
  templateUrl: './formulari.page.html',
  styleUrls: ['./formulari.page.scss'],
  providers: [ApiService],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FormulariPage implements OnInit {

  id_country: string = "";
  alias: string = "";
  address1: string = "";
  city: string = "";
  countries: any[] = [];

  constructor(public apiService: ApiService) {
    this.apiService.getCountries()
      .subscribe((response: any) => {
        this.countries = response.countries;
      });
   }

  onFormSubmit() {
    let data = {
      id_country: this.id_country,
      alias: this.alias,
      address1: this.address1,
      city: this.city
    }

    const customerAddress = `<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
    <address>
      <id_customer>1</id_customer>
      <id_country>${data.id_country}</id_country>
      <alias>${data.alias}</alias>
      <lastname>Anonymous</lastname> 
      <firstname>Anonymous</firstname>
      <address1>${data.address1}</address1>
      <city>${data.city}</city>
      <dni>24987658O</dni>  
    </address>
  </prestashop>`;
    this.apiService.postUser(customerAddress).subscribe(response => {
      console.log('Respuesta de la API:', response);
    }, error => {
      console.error('Error:', error);
    });

    console.log({
      id_country: this.id_country,
      alias: this.alias,
      address1: this.address1,
      city: this.city
    });
  }

  ngOnInit() {
  }
}
