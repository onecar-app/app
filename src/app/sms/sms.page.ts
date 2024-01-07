import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../services/generall.service';
import { EventsService } from '../services/events.service';


@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {

  public sms: string = '';

  public counter: number = 60;
  constructor(private router: Router,
    public events:EventsService,
    private http: RequestService) {
      this.count();
    }

  ngOnInit() {
  }
  go() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  check(){
    if(this.sms.length == 4){
      this.sendSms();
    }
  }

  sendSms(){
    if(this.sms != ''){
      
      this.http.get('sendcode/'+localStorage.getItem('phone')+'/'+this.sms).then((res) => {
        localStorage.setItem('token', res.data.token);

        this.http.get('get_profile/'+res.data.token).then((res) => {
          console.log(res);

          if(!res.photo) {
            res.data.photo = 'no_photo.svg';
          }

          localStorage.setItem('user', JSON.stringify(res.data));
          this.events.pushData({event:'login'});

          this.go();
        }).catch((err) => {
          alert('Неправильний код!')
        });
      }).catch((err)=> {
        alert('Неправильний код!')
      });
  
    }
  }

  count() {
    if (this.counter > 0) {
      this.counter = this.counter - 1;
      setTimeout(() => {
        this.count();
      }, 1000);
    } else {
      this.counter = 60;
      return;
    }
  }
}
