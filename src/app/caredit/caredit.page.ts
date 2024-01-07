import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RequestService } from '../services/generall.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-caredit',
  templateUrl: './caredit.page.html',
  styleUrls: ['./caredit.page.scss'],
})
export class CareditPage implements OnInit {
  public brands: any = null;
  public brand: any = '';

  public car: any = {};

  constructor(private navCtrl: NavController,
    public http: RequestService,
    private route:ActivatedRoute,
    ) {
    this.car._id = this.route.snapshot.paramMap.get('id');

    this.car.photo = 'no_photo.svg';
    this.getBrands();
    this.getCar();
  }

  getCar() {
    this.http.get('cars/car/' + this.car._id).then((res) => {
      console.log(res);
      this.car = res;
    });

  }
  ngOnInit() {
  }

  back() {
    this.navCtrl.back();
  }

  async onFileChangeProf2(fileChangeEvent: any) {
    let file: any = fileChangeEvent.target.files[0];

    if (file.name) {
      file.path = URL.createObjectURL(fileChangeEvent.target.files[0]);
      let formData = new FormData();
      formData.append('file', file, file.name);

      await this.http.post("uploadfile", formData).then((res) => {
        console.log(res);
        this.car.photo = res.filename;
      }).catch(err => {
        console.log(err);
        //alert("Server error:     " + err.message);
      });
    }
  }

  getBrands() {
    this.http.get('brands/user').then((res) => {
      console.log(res);
      this.brands = res;
      this.car.brand = res[0].name;
    });

  }

  save() {
    console.log(this.car);
    if (this.car.brand != '' &&
      this.car.model !== '' &&
      this.car.engine !== '' &&
      this.car.color !== '' &&
      this.car.year !== '' &&
      this.car.range !== '') {

      this.http.patch('cars/'+this.car._id, this.car).then((res) => {

        //this.navCtrl.navigateBack('/tabs/tab3');
        this.back();
      }).catch((err) => {
        alert('Wrong code!')
      });
    } else {
      alert('Fill all fieds!');
    }
  }

  delete(){
    this.http.delete('cars/'+this.car._id).then((res) => {
      this.navCtrl.navigateBack('tabs/tab3');
    });
  }


}
