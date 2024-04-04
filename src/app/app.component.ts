import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { RequestService } from './services/generall.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public http: HttpClient, public request:RequestService) {
    this.http.get('https://api.carbook.pro/business_substatuses', {

      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwYWEzODY2OS05MzU2LTQ3YjctYjQ3Ni05MTk1YTExY2YzMDkiLCJpYXQiOjE3MDYxMTI0MDV9.NMD3TdvhtX5vGYJOTvFYzKBDvjciMGoYkzCWAqfCt9w'
      }
    }).subscribe(res => {
      console.log(res);
    })

    this.request.get('content').then(res => {
      localStorage.setItem('content', JSON.stringify(res.data));
    })
  }
}
