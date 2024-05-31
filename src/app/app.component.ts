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

    this.request.get('business_substatuses').then(res => {
      console.log(res);
    })

    this.request.get('content').then(res => {
      localStorage.setItem('content', JSON.stringify(res.data));
    })
  }
}
