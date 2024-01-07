import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../services/generall.service';
import { createMask } from '@ngneat/input-mask';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //public phone: string = '+38(097) 119-29-30';
  public phone: string = '+';
  phoneMask = createMask('+38(099) 999-99-99');

  constructor(private router: Router,
    private http: RequestService) { }

  ngOnInit() {
  }

  go(){
    this.router.navigateByUrl('/sms');
  }

  sendPhone(){
    if(this.phone.length == 18 && this.phone.indexOf('_') == -1){
      
      this.http.get('login/'+this.phone).then((res) => {
        console.log(res);
        localStorage.setItem('phone', this.phone);
        this.go();
      });
  
    }
  }

}
