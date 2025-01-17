import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImageUploadService{

    constructor(private http: HttpClient){}

     public uploadImage(image: File): Observable<string | any>{
        const formData = new FormData();

        formData.append('image', image);
        console.log(image);
        return this.http.post('/api/v1/image-upload', formData).map(((json: any) => json.imageUrl));
    }  

 /*   AddImage(image): Observable<any> {
        return this.http.post(`/api/v1/image-upload`, {
          image
        });
      } */
}