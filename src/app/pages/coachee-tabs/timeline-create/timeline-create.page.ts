import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/Camera/ngx';
import { TimelineService } from "../../../services/timeline.service";
import { AlertController, ModalController } from "@ionic/angular";
import {CameraOptionsSetting} from '../../../_helper/cameraOptionsSetting';
@Component({
  selector: 'app-timeline-create',
  templateUrl: './timeline-create.page.html',
  styleUrls: ['./timeline-create.page.scss'],
})
export class TimelineCreatePage implements OnInit {

  newPost = {
    description: '',
    imgData: ''
  }

  constructor(private camera: Camera,
    private timelineService: TimelineService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  isCamera: boolean;

  ngOnInit() {

  }

  selectPicture() {
    this.isCamera = false;
    this.getPicture(this.isCamera)
  }

  takePicture() {
    this.isCamera = true;
    this.getPicture(this.isCamera)
  }

  /**
   * @function getPicture
   * @param {isCamera }:Boolbean
   * @returns Observable
   */
  async getPicture(isCamera) {

    let caremaOptions=CameraOptionsSetting(isCamera,this.camera)
   
    try {

      this.newPost.imgData = await this.camera.getPicture(caremaOptions);
      let imageSizeInByte = 4 * Math.ceil((this.newPost.imgData.length) / 3) * 0.5624896334383812;

      if (imageSizeInByte / (1024 * 1024) >= 8)
        this.showAlert("the size of image is too big")

    } catch (err) {
      return
    }
  }

  /**
   * @function closePostModal
   * @returns void
   */
  closePostModal() {
    this.modalCtrl.dismiss({
      timelinePost: null
    })
  }

  /**
   * @function createNewPost
   * @param newPost 
   */
  createNewPost(newPost?: {
    imgData: any,
    description: any
  }) {

    this.timelineService.createNewPost(newPost).subscribe(res => {

      this.modalCtrl.dismiss({
        timelinePost: res['timelinePost']
      })
    })
  }

  /**
   * @function showAlert
   * @param msg 
   * @returns void
   */
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

}
