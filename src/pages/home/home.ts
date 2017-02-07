import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, Platform, NavController, ModalController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import Cropper from 'cropperjs';
import { ImageCropperComponent } from "../cropper/img-cropper";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cropper : Cropper;
  public imgUri: string;

  // croppedImgB64String: string;
  @ViewChild('imgSrc') input: ElementRef;

  constructor(public navCrtl: NavController, public modalCtrl: ModalController, public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController, public platform: Platform) {

     // if(navParams.get('croppedImgB64String') !== null)
     //   this.croppedImgB64String = navParams.get('croppedImgB64String');
  }

  public presentActionSheet() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(0); //Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(1);//Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public presentCropModal(img: string) {
    let cropModal = this.modalCtrl.create(ImageCropperComponent, {'imgUri': img});
    cropModal.onDidDismiss(data => {
      this.imgUri = data;
    });

    cropModal.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      // targetWidth: 320,
      // targetHeight: 320,
      destinationType: 0, //Camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    Camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      // this.imgData = imageData;
      this.imgUri = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  // toCrop() {
  //   this.navCrtl.push(ImageCropperComponent, {'imgUri': this.imgUri});
  // }

  // imageLoaded() {
  //   this.cropper = new Cropper(this.input.nativeElement, {
  //     aspectRatio: 1 / 1,
  //     dragMode: 'crop',
  //     modal: true,
  //     guides: true,
  //     highlight: false,
  //     background: true,
  //     autoCrop: true,
  //     rotatable: false,
  //     scalable: false,
  //     zoomable: false,
  //     zoomOnTouch: false,
  //     autoCropArea: 0.9,
  //     responsive: true,
  //     crop: (e:Cropper.CropperCustomEvent) => {
  //
  //     }
  //   });
  // }

}
