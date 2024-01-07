import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public http: HttpClient) {
    this.http.get('https://api.carbook.pro/business_substatuses', {

      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxZThmOTM0MS0xMTBhLTRjMTQtYmMxMy0wZDRiMTg5NGY1YTkiLCJpYXQiOjE2OTg4Mjc5NTl9.KyFWAZt33f5tKZCX5koZymvg4xb0POIzp_xDW46ZTfA'
      }
    }).subscribe(res => {
      console.log(res);
    })
  }
}
