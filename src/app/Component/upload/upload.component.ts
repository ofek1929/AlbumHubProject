import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { PhotosService } from 'src/app/Services/photos.service'

// import { BrowserModule } from '@angular/platform-browser';
// import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  latitude:number;
  longitude:number;
  locationChosen = false;
  d: any[] = [];

  search: string;
  photosArray: string[];
  constructor(private service: PhotosService) {
    this.getCurrentPosition();
  }

  ngOnInit(): void {
  }

  public switchPage(x) {
    let online = document.getElementById('online');
    let pc = document.getElementById('pc');
    let camera = document.getElementById('camera');
    if (x == 'online') {
      pc.style.visibility = 'hidden';
      pc.style.height = '0';
      camera.style.visibility = 'hidden';
      camera.style.height = '0';
      online.style.visibility = 'visible';
    }
    else if (x == 'pc') {
      online.style.visibility = 'hidden';
      online.style.height = '0';
      camera.style.visibility = 'hidden';
      camera.style.height = '0';
      pc.style.visibility = 'visible';
    }
    else if (x == 'camera') {
      pc.style.visibility = 'hidden';
      pc.style.height = '0';
      online.style.visibility = 'hidden';
      online.style.height = '0';
      camera.style.visibility = 'visible';

      var video = <HTMLVideoElement>document.querySelector("#videoElement");

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
      }
    }
  }

  //pc
  public generateImagePc() {
    let imagCap = <HTMLInputElement>document.getElementById('imgCaption');
    let imgurl = <HTMLInputElement>document.getElementById("imgpc");
    if (imagCap.value != "") {
      console.log(imgurl.files[0]);
      let reader = new FileReader();
      let newImage = document.createElement("img");
      newImage.id = 'newImage';

      reader.addEventListener("load", () => {
        newImage.src = reader.result as string;
      }, false)

      if (imgurl.files[0]) {
        reader.readAsDataURL(imgurl.files[0])
      }

      newImage.width = 250;
      newImage.height = 200;
      let div = document.getElementById("emptyDivP");
      div.innerHTML = '';
      div.appendChild(newImage);

      // reader.addEventListener("load", () => {
      //   this.sendImageToServer(imagCap.value,reader.result as string);
      // }, false)
      document.getElementById("save").style.visibility = "visible";
    } else {
      imgurl.value = "";
      alert("set an image name befor upload image")
    }
  }
  public savePhotoFromPC() {
    let categories = window.prompt("Enter categories of the image :")
    let image = <HTMLImageElement>document.getElementById('newImage')
    let imagCap = <HTMLInputElement>document.getElementById('imgCaption');
    let privateImage = window.confirm("You want your image private ?");
    let locBool = window.confirm("You want to add your image a location ?");
    if(locBool) this.sendImageToServer(imagCap.value, image.currentSrc as string, categories, this.latitude, this.longitude,privateImage);
    if(!locBool) this.sendImageToServer(imagCap.value, image.currentSrc as string, categories, 0, 0,privateImage);
  }

  //camera
  public takeShoot() {
    var canvas = <HTMLCanvasElement>document.getElementById("emptyCanvasC");
    var video = <HTMLVideoElement>document.getElementById("videoElement");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  public saveShoot() {
    let categories = window.prompt("Enter categories of the image :")
    let imagCap = <HTMLInputElement>document.getElementById('imgCaptionC');
    var canvas = <HTMLCanvasElement>document.getElementById("emptyCanvasC");
    let privateImage = window.confirm("You want your image private ?");
    let locBool = window.confirm("You want to add your image a location ?");
    if (imagCap.value != "") {
      if(locBool) this.sendImageToServer(imagCap.value, canvas.toDataURL(), categories, this.latitude, this.longitude,privateImage);
      if(!locBool) this.sendImageToServer(imagCap.value, canvas.toDataURL(), categories, 0, 0,privateImage);
    } else {
      alert("set an image name befor upload image");
    }
  }

  //online
  public searchPhotos() {
    let imgurl = <HTMLInputElement>document.getElementById("imgurl");
    console.log(imgurl.value);
    this.service.getPhotosBySearch(imgurl.value).subscribe(
      (data) => {
        console.log(data);
        this.photosArray = data.photos;
        console.log(this.photosArray);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public savePhotoFromOnline(x) {
    let name = window.prompt("Enter the image name:")
    let categories = window.prompt("Enter categories of the image :")
    let privateImage = window.confirm("You want your image private ?")
    let locBool = window.confirm("You want to add your image a location ?");
    let image = x
    if(name){
      console.log(image.src.original);
      this.urlToBase64(image.src.original, (base64) => {
        if(locBool) this.sendImageToServer(name, base64, categories, this.latitude, this.longitude,privateImage);
        if(!locBool) this.sendImageToServer(name, base64, categories, 0, 0,privateImage);
      })
    }
    else alert("Please enter name and save the image again") 
  }
  urlToBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  //server 
  sendImageToServer(name, image, categories,latitude:number,longitude:number,privateBool:boolean) {
    this.service.saveImageByServer(name, image, categories,latitude,longitude,privateBool);
  }


  //map
  public onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;

    // console.log(this.latitude);
    // console.log(this.longitude);
  }
  public addLocation() {
    let map = document.getElementById('map');
    map.style.visibility = 'visible';
  }
  public getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    this.locationChosen = true;
  }
}

