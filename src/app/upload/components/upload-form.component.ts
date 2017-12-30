import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { Upload } from '../models/upload';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean;
  @Output() save = new EventEmitter<Upload>();
  formGroup: FormGroup;
  unsubscribe$ = new Subject<void>();
  imageLoaded = false;

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      imgLink: new FormControl('', [Validators.required]),
    });
    this.formGroup.controls['imgLink'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => (this.imageLoaded = false));
  }

  onSubmit() {
    this.save.emit(this.formGroup.value);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
