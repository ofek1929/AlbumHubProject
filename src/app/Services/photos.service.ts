import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '563492ad6f917000010000017294665986a3415c9ba635333b83527a'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http:HttpClient) { }

  getPhotosBySearch(name) : Observable<any>{
    const url = `https://api.pexels.com/v1/search?query=${name}&per_page=10`; 

    return this.http.get<any>(url,httpOptions).pipe(catchError(this.handleError))
  }

  saveImageByServer(nameOfImage,base64Image,categoriesOfImage,latitude:number,longitude:number,privateBool:boolean){
    this.http
    .post('http://localhost:7000/saveimage',{ 
      name: nameOfImage,
      image: base64Image,
      categories: categoriesOfImage,
      latitude: latitude,
      longitude: longitude, 
      privateBool: privateBool
    })
    .subscribe((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }

  getImagesByServer(){
    const images = this.http.get<any[]>('http://localhost:7000/getimages');
    return images;
  }  

  setImageToFavorite(name){
    this.http
    .post('http://localhost:7000/setimagetofavorit',{ 
      name: name
    })
    .subscribe((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }

  setImageToUnFavorite(name){
    this.http
    .post('http://localhost:7000/setimagetounfavorite',{ 
      name: name
    })
    .subscribe((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }
  
  
  
  handleError(error){
    return throwError(error.message || "Server error")
  }
}
