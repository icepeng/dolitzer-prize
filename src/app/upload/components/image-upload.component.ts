import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('dropzone') dropzone: ElementRef;
  @Input() isUploading: boolean;
  @Output() upload = new EventEmitter<File>();
  file: File;

  constructor() {}

  ngOnInit() {}

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dropzone.nativeElement.style.background = '#999';
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dropzone.nativeElement.style.background = '#eee';
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dropzone.nativeElement.style.background = '#eee';
    this.file = event.dataTransfer.files[0];
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    if (!this.file || this.isUploading) {
      return;
    }
    this.upload.emit(this.file);
  }
}
