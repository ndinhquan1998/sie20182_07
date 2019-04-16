import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageUploadComponent } from './image-upload.component';

import { ImageUploadService } from './image-upload.service';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ImageCropperModule,
        FileUploadModule
    ],
    exports: [
        ImageUploadComponent

    ],
    declarations: [
        ImageUploadComponent
    ],
    providers: [
        ImageUploadService
    ]
})

export class ImageUploadModule {}