import { Component, Output, EventEmitter } from '@angular/core';
import { ImageUploadService } from './image-upload.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FileUploader } from 'ng2-file-upload';
import { HttpErrorResponse } from '@angular/common/http';

const URL = 'http://localhost:3001/api/v1/image-upload';


class FileSnippet {
  static readonly IMAGE_SIZE = {width: 950, height: 720};

    pending: boolean = false;
    status: string = 'INIT';

    constructor(public src: string, public file:File) {
    }
}

@Component({
  selector: 'bwm-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent  {

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  @Output() imageUploaded = new EventEmitter();

  @Output() imageError = new EventEmitter();

  @Output() imageLoadedToContainer = new EventEmitter();

  @Output() croppingCanceled = new EventEmitter();

  selectedFile: any;
  imageChangedEvent: any;

  constructor(private toastr: ToastrManager,
              private imageService: ImageUploadService) { }

 /* private onSuccess(imageUrl: string){
      this.selectedFile.pending = false;
      this.selectedFile.status = 'OK';
      this.imageChangedEvent = null;
      this.imageUploaded.emit(imageUrl);
  }

  private onFailure() {
      this.selectedFile.pending = false;
      this.selectedFile.status = 'FAIL';
      this.imageChangedEvent = null;
      this.imageError.emit('');
  }

  imageCropped(file: File): FileSnippet | File{
      if(this.selectedFile){
        return this.selectedFile.file = file;
      }

      return this.selectedFile = new FileSnippet('', file);
  }

  imageLoaded(){
      this.imageLoadedToContainer.emit();
  }

  cancelCropping(){
      this.imageChangedEvent = null;
      this.croppingCanceled.emit();
  }

  processFile(event: any) {
      this.selectedFile = undefined;

      const URL = window.URL;
      let file, img;

      if((file = event.target.files[0]) && (file.type === 'image/png' || file.type === 'image/jpeg' )){
          img = new Image();

          const self = this;
          img.onload = function() {
            if(this.width > FileSnippet.IMAGE_SIZE.width && this.height > FileSnippet.IMAGE_SIZE.height ){
                self.imageChangedEvent = event;
            }else{
                this.toastr.error(`Min width is ${FileSnippet.IMAGE_SIZE.width} and min height is ${FileSnippet.IMAGE_SIZE.height}`,"Success");
            }
          }

          img.src = URL.createObjectURL(file);

      }else{
          this.toastr.errorToastr('Unsupported File type, only jpeg and pnd is allowed','Error');
      }
    }

  uploadImage(){
    if(this.selectedFile){
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile.src = event.target.result;   

            this.selectedFile.pending = true;
            this.imageService.uploadImage(this.selectedFile.file).subscribe(
              (imageUrl: string) => {
                  this.onSuccess(imageUrl);
              },
              (errResponse: HttpErrorResponse) => {
                this.toastr.errorToastr(errResponse.error.errors[0].detail,'Success');
                  this.onFailure();
              }
            );
        });

        reader.readAsDataURL(this.selectedFile.file);
  }
  }  */

OnFileSelected(event) {
  const file: File = event[0];

  this.ReadAsBase64(file)
    .then(result => {
      this.selectedFile = result;
    })
    .catch(err => console.log(err));
}

Upload() {
  this.imageService.AddImage(this.selectedFile).subscribe(
    data => {
   //   this.socket.emit('refresh', {});
      const filePath = <HTMLInputElement>document.getElementById('filePath');
      filePath.value = '';
    },
    err => console.log(err)
  );
}

ReadAsBase64(file): Promise<any> {
  const reader = new FileReader();
  const fileValue = new Promise((resolve,reject) => {
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', event => {
      reject(event);
    });

    reader.readAsDataURL(file);
  });

  return fileValue;
}

}
