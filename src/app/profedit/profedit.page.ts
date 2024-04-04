import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';
import { createMask } from '@ngneat/input-mask';
import { EventsService } from '../services/events.service';
import { TabsPage } from '../tabs/tabs.page';
import { Router } from '@angular/router';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

@Component({
  selector: 'app-profedit',
  templateUrl: './profedit.page.html',
  styleUrls: ['./profedit.page.scss'],
})
export class ProfeditPage implements OnInit {
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phone: string = '';
  public birthday: string = '';
  phoneMask = createMask('+38(099) 999-99-99');
  token = localStorage.getItem('token');
  isKeyboardHide = true;

  public profile: any = {'photo': 'no_photo.svg'};

  constructor(private navCtrl: NavController,
    public alertCtrl:AlertController,
    private http: RequestService,
    public keyboard:Keyboard,
    private router: Router,
    public events:EventsService,
    public tabs:TabsPage) {
    this.getInfo();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.isKeyboardHide=false;
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.isKeyboardHide=true;
      // console.log('HIDEK');
    });
  }

  getInfo() {
    this.http.get('get_profile/'+this.token).then((res) => {
      this.profile = res.data;

      if(!this.profile.photo) {
        this.profile.photo = 'no_photo.svg';
      }
    }).catch((err) => {
      //alert('Wrong code!')
    });
  }

  async onFileChangeProf(fileChangeEvent: any) {
    let file: any = fileChangeEvent.target.files[0];

    if (file.name) {
      file.path = URL.createObjectURL(fileChangeEvent.target.files[0]);
      let formData = new FormData();
      formData.append('file', file, file.name);

      await this.http.post("uploadfile", formData).then((res) => {
        console.log(res);

        this.http.patch('users/profile', {'photo': res.filename}).then((res2) => {
          console.log(res2);
          this.profile = res2;
          localStorage.setItem('user', JSON.stringify(this.profile));
        }).catch((err) => {
          alert('Помилка збереження даних!')
        });
      }).catch(err => {
        console.log(err);
        //alert("Server error:     " + err.message);
      });
    }
  }


  save() {
    if (this.profile.firstName != '' &&
      this.profile.phone != '') {


      this.http.post('update_profile/'+this.token,this.profile).then((res) => {
        console.log(this.profile);
        this.profile = res;
        localStorage.setItem('user', JSON.stringify(this.profile));
        //this.navCtrl.navigateBack('/tabs/tab3');
        this.back();
      }).catch((err) => {
        alert('Помилка збереження даних!')
      });
    } else {
      alert("Заповніть ім'я та номер телефону!")
    }
  }

  back() {
    this.navCtrl.back();
  }

  async delete(){
    await(
      await this.alertCtrl.create({
        header:'Видалення аккаунту',
        message:'Ви впевнені що хочете видалити акаунт?',
        buttons:[{
          text:'Видалити',
          handler:() => {
            this.http.get('delete_account/'+this.token).then((res) => {
              localStorage.clear();
              this.events.pushData({event:'logout'});
              this.tabs.tab = '1';
              this.router.navigateByUrl('tabs/tab1');
            }).catch((err) => {
              //alert('Wrong code!')
            });
          }
        },{
          text:'Відміна'
        }]
      })
    ).present();
  }
}
