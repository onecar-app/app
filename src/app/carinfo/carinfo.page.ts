import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-carinfo',
  templateUrl: './carinfo.page.html',
  styleUrls: ['./carinfo.page.scss'],
})
export class CarinfoPage implements OnInit {

  public car: any = {};

  constructor(private navCtrl: NavController,
    private http: RequestService,
    public httpClient: HttpClient,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    private router: Router) {

    this.car.id = this.route.snapshot.paramMap.get('id');
    this.getCar();
  }

  ngOnInit() {
  }

  edit() {
    this.router.navigateByUrl('tabs/tab3/caredit/' + this.car._id);

  }

  ionViewDidEnter() {
  }

  back() {
    this.navCtrl.back();
  }

  getCar() {
    this.http.get('get_car/' + localStorage.getItem('token') + '/' + this.car.id).then(async (res) => {
      this.car = res.data;

      for await (let regulation_group of this.car.regulations) {
        for await (let regulation of regulation_group.regulations) {
          regulation.percent = 0;
          regulation.availableKm = 0;

          let km = Math.round(regulation.nextChangeKm - this.car.km);

          if (km > 0) {
            regulation.availableKm = km;
            regulation.percent = Math.round(100 - (((this.car.km - regulation.lastKm) / (regulation.nextChangeKm - regulation.lastKm)) * 100));
          }
        }
      }
    });
  }

  async update() {
    await (
      await this.alertCtrl.create({
        header: 'Пробіг авто',
        message: 'Введіть поточний пробіг авто. Поточний пробіг ' + this.car.km + ' км.',
        inputs: [{
          type: 'number',
          min: this.car.km,
          value: this.car.km,
          name: 'km'
        }],
        buttons: [{
          text: 'Відміна'
        }, {
          text: 'Підтвердити',
          handler: async (data) => {
            if (data.km > this.car.km) {

              this.http.post('updatekm', {
                vehicleId: this.car.carId,
                mileage: Number(data.km),
                date: moment().format('YYYY-MM-DD'),
                custom: true
              }).then(async (res) => {
                await (await this.alertCtrl.create({
                  header: 'Оновлення пробігу',
                  message: 'Пробіг авто успішно оновлено',
                  buttons: ["OK"]
                })).present();

                
                setTimeout(async () => {
                  await this.http.get('check_reglaments/'+this.car.carId).then(res => { })
                }, 2000);

                this.getCar();
              });

              /*
              this.httpClient.post('https://api.carbook.pro/mileage/history', {
                vehicleId: this.car.carId,
                mileage: Number(data.km),
                date: moment().format('YYYY-MM-DD'),
                custom: true
              }, {
                headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwYWEzODY2OS05MzU2LTQ3YjctYjQ3Ni05MTk1YTExY2YzMDkiLCJpYXQiOjE3MDYxMTI0MDV9.NMD3TdvhtX5vGYJOTvFYzKBDvjciMGoYkzCWAqfCt9w'
                }
              }).subscribe(async res => {
                await (await this.alertCtrl.create({
                  header: 'Оновлення пробігу',
                  message: 'Пробіг авто успішно оновлено',
                  buttons: ["OK"]
                })).present();

                setTimeout(async () => {
                  await this.http.get('check_reglaments/'+this.car.carId).then(res => { })
                }, 2000);


                this.getCar();
              })
              */
             
            } else {
              await (await this.alertCtrl.create({
                header: 'Помилка оновлення пробігу',
                message: 'Ви не можете вказати пробіг менше поточного',
                buttons: [{
                  text: "OK",
                  handler: () => this.update()
                }]
              })).present();
            }
          }
        }]
      })
    ).present();
  }

  async delete() {
    this.http.get('delete_car/' + localStorage.getItem('token') + '/' + this.car.id).then((res) => {
      this.navCtrl.back();
    });
  }

  async delegate() {
    await (
      await this.alertCtrl.create({
        header: 'Передача авто',
        message: 'Введіть номер телефону нового власника авто',
        inputs: [{
          type: 'tel',
          name: 'phone',
          placeholder: '+380XXXXXXXXX'
        }],
        buttons: [{
          text: 'Відміна'
        }, {
          text: 'Підтвердити',
          handler: (data) => {
            this.http.patch('cars/delegate/' + this.car._id, { phone: data.phone }).then((res) => {
              this.navCtrl.back();
            }, async err => {
              (await this.toastCtrl.create({ message: 'Користувач не знайдений', duration: 1000 })).present();
            });
          }
        }]
      })
    ).present();
  }

  getStatus(status: String) {
    switch (status) {
      case 'not_complete': return 'Не завершено'; break;
      case 'reserve': return 'Заплановано'; break;
      case 'call': return 'Заплановано'; break;
      case 'processing': return 'Заплановано'; break;
      case 'approve': return 'Підтверджено'; break;
      case 'progress': return 'В роботі'; break;
      case 'success': return 'Виконано'; break;
      case 'stop': return 'Зупинено'; break;
      case 'required': return 'Зупинено'; break;
      case 'cancel': return 'Закрито'; break;
      default: return ''; break;
    }
  }
}
