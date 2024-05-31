import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-caradd',
  templateUrl: './caradd.page.html',
  styleUrls: ['./caradd.page.scss'],
})
export class CaraddPage implements OnInit {

  public brands: any = null;
  public brand: any = '';

  public car: any = {
    token: localStorage.getItem('token'),
    vin: '',
    brand: '',
    model: '',
    year: '',
    number: '',
    type: '',
    fuel: '',
    km: '',
    volume: '',
    modification:''
  };

  years: any = [];
  makes: any = [];
  models: any = [];
  modifications: any = [];

  constructor(private navCtrl: NavController,
    public httpClient: HttpClient,
    public http: RequestService) {
    this.getYears();
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }

  async save() {
    console.log(this.car);
    if (this.car.vin != '' &&
      this.car.brand != '' &&
      this.car.model != '' &&
      this.car.year != '' &&
      this.car.number != '' &&
      this.car.type != '' &&
      this.car.fuel != '' &&
      this.car.modification != '' &&
      this.car.km != '') {

      let data = JSON.parse(JSON.stringify(this.car));

      data.brand = await this.makes.filter((make:any) => make.id == data.brand)[0].name;
      data.model = await this.models.filter((model:any) => model.id == data.model)[0].name;
      data.modification = await this.modifications.filter((modification:any) => modification.id == data.modification)[0].name;

      this.http.post('car_add', data).then((res) => {

        //this.navCtrl.navigateBack('/tabs/tab3');
        this.back();
      });
    } else {
      alert('Заповніть усі поля');
    }
  }

  getYears(){
    this.http.get('vehicles_info').then(res => {
      this.years = res.data.years;
      this.car.brand = this.car.model = this.car.modification = "";
    })
  }

  getMakes(){
    this.http.get("vehicles_info/type=All&year=" + this.car.year).then(res => {
      this.makes = res.data.makes;
      this.car.model = this.car.modification = "";
    })
  }

  getModels(){
    this.http.get("vehicles_info/type=All&year=" + this.car.year + "&makeId=" + this.car.brand).then(res => {
      this.models = res.data.models;
      this.car.modification = "";
    })
  }

  getModif(){
    this.http.get("vehicles_info/type=All&year=" + this.car.year + "&makeId=" + this.car.brand + "&modelId=" + this.car.model).then(res => {
      this.modifications = res.data.modifications;
    })
  }

  getYears_OLD() {
    this.httpClient.get("https://api.carbook.pro/vehicles_info", {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwYWEzODY2OS05MzU2LTQ3YjctYjQ3Ni05MTk1YTExY2YzMDkiLCJpYXQiOjE3MDYxMTI0MDV9.NMD3TdvhtX5vGYJOTvFYzKBDvjciMGoYkzCWAqfCt9w'
      }
    }).subscribe((data: any) => {
      this.years = data.years.reverse();
      this.car.brand = this.car.model = this.car.modification = "";
    })
  }

  getMakes_OLD() {
    this.httpClient.get("https://api.carbook.pro/vehicles_info?type=All&year=" + this.car.year, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwYWEzODY2OS05MzU2LTQ3YjctYjQ3Ni05MTk1YTExY2YzMDkiLCJpYXQiOjE3MDYxMTI0MDV9.NMD3TdvhtX5vGYJOTvFYzKBDvjciMGoYkzCWAqfCt9w'
      }
    }).subscribe((data: any) => {
      this.makes = data.makes;
      this.car.model = this.car.modification = "";
    })
  }

  getModels_OLD() {
    this.httpClient.get("https://api.carbook.pro/vehicles_info?type=All&year=" + this.car.year + "&makeId=" + this.car.brand, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwYWEzODY2OS05MzU2LTQ3YjctYjQ3Ni05MTk1YTExY2YzMDkiLCJpYXQiOjE3MDYxMTI0MDV9.NMD3TdvhtX5vGYJOTvFYzKBDvjciMGoYkzCWAqfCt9w'
      }
    }).subscribe((data: any) => {
      this.models = data.models;
      this.car.modification = "";
    })
  }

  getModif_OLD() {

    this.httpClient.get("https://api.carbook.pro/vehicles_info?type=All&year=" + this.car.year + "&makeId=" + this.car.brand + "&modelId=" + this.car.model, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwYWEzODY2OS05MzU2LTQ3YjctYjQ3Ni05MTk1YTExY2YzMDkiLCJpYXQiOjE3MDYxMTI0MDV9.NMD3TdvhtX5vGYJOTvFYzKBDvjciMGoYkzCWAqfCt9w'
      }
    }).subscribe((data: any) => {
      this.modifications = data.modifications;
    })
  }

}
