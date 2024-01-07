import { Component } from '@angular/core';
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
  public user: any = {photo: 'no_photo.svg'};
  cars: any = [];


  constructor(public route: Router, public events: EventsService, public http: RequestService) {
    this.getCars();
  }

  goProfile() {
    if (localStorage.getItem('user')) {
      this.route.navigateByUrl('/tabs/tab1/profedit');
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

}
