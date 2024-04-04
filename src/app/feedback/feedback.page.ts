import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  message = '';

  constructor(private navCtrl: NavController, public request: RequestService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }


  back() {
    this.navCtrl.back();
  }

  send() {
    this.request.post('send_message', { token: localStorage.getItem('token'), message: this.message }).then(async res => {
      this.message = '';

      await (
        await this.alertCtrl.create({
          header: "Зворотній зв'зок",
          message: 'Дякуємо за ваше звернення',
          buttons: ["OK"]
        })
      ).present();

    })
  }

}