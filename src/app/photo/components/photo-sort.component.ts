import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-photo-sort',
  templateUrl: './photo-sort.component.html',
  styleUrls: ['./photo-sort.component.scss'],
})
export class PhotoSortComponent implements OnInit, OnDestroy, OnChanges {
  @Input() sortColumn: string;
  @Input() sortOrder: string;
  @Output()
  sortChange = new EventEmitter<{ sortColumn: string; sortOrder: string }>();

  formGroup = new FormGroup({
    sortColumn: new FormControl(),
    sortOrder: new FormControl(),
  });
  valueChanges$: Subscription;

  constructor() {}

  ngOnInit() {
    this.valueChanges$ = this.formGroup.valueChanges.subscribe(value =>
      this.sortChange.emit(value),
    );
  }

  ngOnChanges({ sortColumn, sortOrder }: SimpleChanges) {
    if (sortColumn && sortColumn.isFirstChange()) {
      this.formGroup.patchValue({ sortColumn: sortColumn.currentValue });
    }
    if (sortOrder && sortOrder.isFirstChange()) {
      this.formGroup.patchValue({ sortOrder: sortOrder.currentValue });
    }
  }

  ngOnDestroy() {
    this.valueChanges$.unsubscribe();
  }
}
