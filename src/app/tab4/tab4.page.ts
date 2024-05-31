import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from '../services/generall.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public user: any = {};

  public visits: any=[];

  public type: string = '1';

  constructor(private router: Router,
    public http: RequestService) {

  }
  ionViewWillEnter(){
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    if(!this.user) {
      this.router.navigateByUrl('/login');
    }
    this.getVisits();
  }

  ngOnInit() {
  }

  getVisits() {
    this.http.get('visits/'+localStorage.getItem('token')).then(async (res) => {
      console.log(res);
      this.visits = res.data.filter((visit:any) => visit.vehicleId);

      this.visits = [];
      
      for await(let visit of res.data){
        if(visit.vehicleId == null && visit.comment.indexOf('| ') > -1){
          let car = visit.comment.split("| ");
          //car = car[1].split(",");
          visit.car = car[1];
          console.log(visit);
          this.visits.push(visit);
        } else if (visit.vehicleId != null) {
          this.visits.push(visit);
        }
      }


      //this.visits = res.data;
    });
  }

  newServ() {
    this.router.navigateByUrl('tabs/tab4/servadd');
  }

  servDetails(id: string) {
    this.router.navigateByUrl('tabs/tab4/servinfo/'+id);
  }

  getStatus(status:String){
    switch(status){
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
