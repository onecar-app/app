import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../services/generall.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public user: any = { 'photo': 'no_photo.svg' };
  public cars: any = [];

  public visit: any;

  constructor(private router: Router,
    private http: RequestService) {
  }

  async ionViewWillEnter() {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.getCars();

    await this.http.get('get_profile/' + localStorage.getItem('token'), false).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      this.user = res.data;
    });


    this.user.photo = 'no_photo.svg';

    if (!this.user) {
      this.router.navigateByUrl('/login');
    } else if (this.user.photo == '') {
      this.user.photo = 'no_photo.svg';
    }
  }

  ionViewDidEnter() {
    //this.getCars();
  }

  getCars() {
    this.http.get('get_cars/' + localStorage.getItem('token')).then((res) => {
      console.log(res);
      this.cars = res.data;
    });
  }

  goAdd() {
    this.router.navigateByUrl('tabs/tab3/caradd');
  }

  goProf() {
    this.router.navigateByUrl('tabs/tab3/profedit');
  }
  goCar(id: any) {
    this.router.navigateByUrl('tabs/tab3/carinfo/' + id);
  }

  getColor(color: number) {
    switch (color) {
      case 0: return 'НЕВИЗНАЧЕНИЙ'; break;
      case 1: return 'БІЛИЙ'; break;
      case 2: return 'ЖОВТИЙ'; break;
      case 3: return 'ЗЕЛЕНИЙ'; break;
      case 4: return 'КОРИЧНЕВИЙ'; break;
      case 5: return 'ОРАНЖЕВИЙ'; break;
      case 6: return 'СИНІЙ'; break;
      case 7: return 'СІРИЙ'; break;
      case 8: return 'ФІОЛЕТОВИЙ'; break;
      case 9: return 'ЧЕРВОНИЙ'; break;
      case 10: return 'ЧОРНИЙ'; break;
      case 11: return 'БЕЖЕВИЙ'; break;
      default: return ''; break;
    }
  }
}
