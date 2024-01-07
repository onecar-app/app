import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servadd',
  templateUrl: './servadd.page.html',
  styleUrls: ['./servadd.page.scss'],
})
export class ServaddPage implements OnInit {

  public user: any = { 'photo': 'no_photo.svg' };
  public cars: any = [];
  public servs: any = [];

  public visit: any = {
    date: '',
    time: '',
    car: '',
    comment: ''
  };

  selectedCar: any = {};
  comment = '';

  public car: string = '1';
  public times: any = [];
  public vtime: any = 0;
  constructor(private navCtrl: NavController,
    private http: RequestService,
    public route: ActivatedRoute,
    public alertController: AlertController) {
    //this.times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    //this.vtime = this.times[0];
    this.getCars();
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }

  carClick(car: any) {
    this.selectedCar = car;
  }

  getCars() {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.http.get('get_cars/' + localStorage.getItem('token')).then(async (res) => {
      console.log(res);
      this.cars = res.data.reverse();

      let id = await this.route.snapshot.paramMap.get('id');

      if (res.data.length != null) {

        if(id){
          this.selectedCar = await this.cars.filter((car:any) => car.id == id)[0];
          console.log(id);
          console.log(this.selectedCar);
        } else {
          this.selectedCar = this.cars[0];
        }

      } else {
        alert("Спочатку додайте авто");
      }
    });

  }

  save() {

    if (this.selectedCar.carId > 0) {
      this.visit.car = this.selectedCar.carId;
      this.visit.comment = this.comment;
    } else {
      this.visit.car = '';
      this.visit.comment += ' | ' + this.selectedCar.brand + '  ' + this.selectedCar.model + ' ' + this.selectedCar.year + ', VIN ' + this.selectedCar.vin;
    }

    console.log(this.visit);

    if (
      this.visit.date != ''
      && this.visit.time != '') {

      this.http.post('create_visit/' + localStorage.getItem('token'), this.visit).then((res) => {

        //this.navCtrl.navigateBack('/tabs/tab3');
        this.back();
      }).catch((err) => {
        //alert('Wrong code!')
      });
    } else {
      alert('Заповніть усі поля!');
    }
  }

  async presentAlertCheckbox() {
    let inputs: any = [];
    for (let serv of this.servs) {
      let check: boolean = false;
      if (this.visit.services.length != null && this.visit.services.includes(serv)) {
        check = true;
      }
      inputs.push({
        type: 'checkbox',
        label: serv.name + ", " + serv.price + ' грн',
        value: serv,
        handler: (data: any) => {
          console.log(data);
        },
        checked: check,
      });
    }
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Послуги',
      inputs: inputs,
      buttons: [
        {
          text: 'Закрити',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Обрати',
          handler: (data: any) => {
            console.log(data);
            this.visit.services = data;
          },
        },
      ],
    });



    await alert.present();
  }
}


