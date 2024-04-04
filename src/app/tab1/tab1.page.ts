import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { RequestService } from '../services/generall.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public car: string = '1';
  public user: any = { photo: 'no_photo.svg' };
  cars: any = [];
  banners: any = [];
  content: any = {};
  pushes: any = [];

  token = localStorage.getItem('token') as any;

  constructor(public route: Router, public events: EventsService, public http: RequestService) {
    this.getCars();
    this.getBanners();
    this.getContent();
  }

  getContent() {
    this.content = JSON.parse(localStorage.getItem('content') as any);

    this.http.get('content').then(res => {
      this.content = res.data;
      localStorage.setItem('content', JSON.stringify(res.data));
    })
  }

  goProfile() {
    if (localStorage.getItem('user')) {
      this.route.navigateByUrl('/tabs/tab3');
    } else {
      this.route.navigateByUrl('/login');
    }
  }

  ionViewWillEnter() {
    this.getData();

    this.events.getObservable().subscribe((data) => {
      console.log(data);
      if (data.event == 'login' || data.event == 'logout') this.getData();
    })
  }

  getData() {

    setTimeout(async () => {

      this.token = localStorage.getItem('token') as any;


      this.http.get('get_notifications/' + localStorage.getItem('token')).then(res => {
        this.pushes = res.data.filter((item: any) => item.sale == 1);
      })

      await this.http.get('get_profile/' + localStorage.getItem('token'), false).then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));

        this.user = res.data;
      });


      this.user.photo = 'no_photo.svg';

    }, 100)
  }

  getCars() {
    this.http.get('get_cars/' + localStorage.getItem('token')).then((res) => {
      console.log(res);
      this.cars = res.data;
    });

  }

  getBanners() {
    this.http.get('banners').then((res) => {
      this.banners = res.data;
    });

  }

}
