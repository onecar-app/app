import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';

@Component({
  selector: 'app-servinfo',
  templateUrl: './servinfo.page.html',
  styleUrls: ['./servinfo.page.scss'],
})
export class ServinfoPage implements OnInit {

  public step: number = 1;
  public rate: number = 1;
  public id: any = '';

  public visit: any = {};

  constructor(private navCtrl: NavController,
    private actRoute: ActivatedRoute,
    public router:Router,
    public http: RequestService) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.getData();
  }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }

  getData() {
    this.http.get("visit/" + localStorage.getItem('token') + "/" + this.id).then(async (res: any) => {
      let order = res.data.order;

      if (res?.data?.vehicle?.id == null && order.comment.indexOf('FROM APP') == -1) {
        let comment = order.comment.split("| ");
        if(comment[0] != ' '){
          order.comment = comment[0];
        } else {
          order.comment = '';
        }

        let car = comment[1].split(",");
        order.car = car[0];

      }

      this.visit = res.data;
    });
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
  goPdf(type:string){
    let pdfSrc = 'https://onecar.tech/api/get_doc/'+type+'/'+this.id;
    localStorage.setItem('pdf', pdfSrc);
    this.router.navigate(['tabs/tab4/pdf']);
  }

}
