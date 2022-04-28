import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  // getPhotosBySearch(name) : Observable<any>{
  //   const url = `https://api.pexels.com/v1/search?query=${name}&per_page=10`; 

  //   return this.http.get<any>(url,httpOptions).pipe(catchError(this.handleError))
  // }

  getLocationByLatLon(latitude, longitude){
    const key = '5y2mD3dTn-TvuR6zkNHtLVK7kcl-d-6K-eRNBVyLG7Q';
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apikey=${key}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  handleError(error){
    return throwError(error.message || "Server error")
  }
}
