import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Builder } from 'xml2js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private key = 'FZ3PB9J7QL44KJINFTPS3AE1M6ELZTVG';

  constructor(public http: HttpClient) {}

  getProducts() {
    return this.http
      .get(
        'https://abelalbala.cat/api/products/?display=[name,price,id,id_default_image]&output_format=JSON&ws_key=' +
          this.key
      )
      .pipe(
        map((response: any) => {
          if (response && response.products) {
            response.products = response.products.map((product: any) => {
              product.imageURL = this.buildImageURL(
                product.id,
                product.id_default_image
              );
              return product;
            });
          }
          return response;
        })
      );
  }

  getProductsFav(idProductsFav: string) {
    return this.http
    .get(`https://abelalbala.cat/api/products/?display=[name,price,id,id_default_image]&output_format=JSON&ws_key=${this.key}&filter[id]=[${idProductsFav}]`)
    .pipe(
      map((response: any) => {
        if (response && response.products) {
          response.products = response.products.map((product: any) => {
            product.imageURL = this.buildImageURL(
              product.id,
              product.id_default_image
            );
            return product;
          });
        }
        return response;
      })
    );
  }

  getProductById(productId: void) {
    return this.http
    .get(`https://abelalbala.cat/api/products/${productId}?ws_key=${this.key}&output_format=JSON`)
    .pipe(
      map((response: any) => {
        if (response && response.product) {
          response.product.imageURL = this.buildImageURL(
            response.product.id,
            response.product.id_default_image
          );
        }
        return response;
      })
    );
  }

  private buildImageURL(productID: number, imgID: number): string {
    if (productID && imgID) {
      return `https://abelalbala.cat/api/images/products/${productID}/${imgID}?ws_key=${this.key}`;
    } else {
      // Devuelve la URL de una imagen por defecto si no se proporcionan productID e imgID
      return 'URL_IMAGEN_POR_DEFECTO';
    }
  }

  getCountries() {
    return this.http.get(`http://abelalbala.cat/api/countries?ws_key=${this.key}&display=[name,id]&language=1&output_format=JSON`)
  }

  postUser(data: any) {
    let url = `https://abelalbala.cat/api/addresses?output_format=JSON&ws_key=${this.key}`
    return this.http.post(url, data);
  }
}
