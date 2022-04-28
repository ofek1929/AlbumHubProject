import { Component, Input, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/Services/photos.service';
import { LocationService } from 'src/app/Services/location.service';
import { Image } from './Image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(private photosService: PhotosService, private locationService: LocationService) { 
    this.getImagesFromService();
  }

  @Input() image1:Image;
  

  images: any[] = [];
  selectedImageCategories: any[] = [];
  categor: Array<string> = [];
  categories: Array<string> = [];

  ngOnInit(): void {
  }

  public getLocation(latitude, longitude){
    if(latitude == 0 && longitude == 0 ) window.alert('This image does not have a location available for user selection');  
    else
    this.locationService.getLocationByLatLon(latitude, longitude).subscribe(loc => {
      if(loc.items[0]["address"]["district"] === undefined){
        window.alert(loc.items[0]["address"]["city"]);
      }
      else{
      window.alert(loc.items[0]["address"]["district"]);  
      }
    })
  }

  public async Favorite(i){
    if(i.isFavorit){
      this.photosService.setImageToUnFavorite(i.name);
    }
    else if(!i.isFavorit){
      this.photosService.setImageToFavorite(i.name);
    }
    await new Promise(f => setTimeout(f, 500));
    this.getImagesFromService();
  }

  getImagesFromService(){
    this.photosService.getImagesByServer().subscribe(data => {
      this.images = data;
      // for (let i = 0; i < data.length; i++) {
      //   this.images[i] =data[i];
      // }

      for (let i = 0; i < data.length; i++) {
        this.categor.push(data[i].categories);
      }
    });
  }

  public addCategoriesToComboBox(){
    this.categories.length = 0;
    console.log(this.images);
    for (let i = 0; i < this.categor.length; i++) {
      const temp = this.categor[i];
      if(temp.includes(',')){
        const temp2 = temp.split(',');
        for (let j = 0; j < temp2.length; j++){
          this.categories.push(temp2[j]);
        }
      }
      else this.categories.push(temp);
    }
    const select = document.getElementById("cat");
    select.style.visibility = 'visible';
    const showAll = document.getElementById("showAll");
    showAll.style.visibility = 'visible';
  }

  public selectCategory(){
    this.selectedImageCategories.length = 0;
    const select = document.getElementById("cat") as HTMLSelectElement ;
    //const valueS = select.options[select.selectedIndex].value;
    console.log(select.options[select.selectedIndex].value);
    const allImages = document.getElementById("scroll");
    allImages.style.display = 'none';
    for (let i = 0; i < this.images.length; i++) {
      let temp = this.images[i].categories;
      if(temp.includes("," + select.options[select.selectedIndex].value)){
        this.selectedImageCategories.push(this.images[i]);
        console.log(true);
      }
      else if(temp.includes(select.options[select.selectedIndex].value + ",")){
        this.selectedImageCategories.push(this.images[i]);
        console.log(true);
      }
      else if(temp.includes("," + select.options[select.selectedIndex].value + ",")){
        this.selectedImageCategories.push(this.images[i]);
        console.log(true);
      }
      else if(temp.includes(select.options[select.selectedIndex].value)){
        this.selectedImageCategories.push(this.images[i]);
        console.log(true);
      }
    }
    const favImages = document.getElementById("scrollFav");
    favImages.style.display = 'none';
    const allImages2 = document.getElementById("scroll2");
    allImages2.style.overflowX = 'scroll';
    allImages2.style.display = 'inline';
    const allImages1 = document.getElementById("scroll1");
    allImages1.style.display = 'none';
  }
  public showFavImages(){
    const select = document.getElementById("cat");
    select.style.visibility = "hidden";
    const allImages = document.getElementById("scroll");
    allImages.style.display = 'none';
    const allImages1 = document.getElementById("scroll1");
    allImages1.style.display = 'none';
    const allImages2 = document.getElementById("scroll2");
    allImages2.style.display = 'none';
    const favImages = document.getElementById("scrollFav");
    favImages.style.overflowX = 'scroll';
    favImages.style.display = 'inline';
    const np = document.getElementById("scrollNP");
    np.style.display = 'none';
  }
  public showAll(){
    let pass = window.prompt('Enter password to see all images or stay empty to see the images are not private ')
    if(pass === '12345'){
      const select = document.getElementById("cat");
      select.style.visibility = "hidden";
      const allImages = document.getElementById("scroll");
      allImages.style.overflowX = 'scroll';
      allImages.style.display = 'inline';
      const allImages1 = document.getElementById("scroll1");
      allImages1.style.overflowX = 'scroll';
      allImages1.style.display = 'inline';
      const allImages2 = document.getElementById("scroll2");
      allImages2.style.display = 'none';
      const favImages = document.getElementById("scrollFav");
      favImages.style.display = 'none';
      const np = document.getElementById("scrollNP");
      np.style.display = 'none';
    }
    else if(pass === '' || pass === null){
      const np = document.getElementById("scrollNP");
      np.style.display = 'inline';
      const allImages = document.getElementById("scroll");
      allImages.style.display = 'none';
      const allImages1 = document.getElementById("scroll1");
      allImages1.style.display = 'none';
      const allImages2 = document.getElementById("scroll2");
      allImages2.style.display = 'none';
      const favImages = document.getElementById("scrollFav");
      favImages.style.display = 'none';
    }
  }
}
