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

import { Period } from '../../photo/models/period';

@Component({
  selector: 'app-history-period',
  templateUrl: './history-period.component.html',
})
export class HistoryPeriodComponent implements OnInit, OnDestroy, OnChanges {
  @Input() period: Period;
  @Output() periodChange = new EventEmitter<Period>();

  formGroup = new FormGroup({
    month: new FormControl(),
    year: new FormControl(),
  });
  valueChanges$: Subscription;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.period && changes.period.isFirstChange()) {
      this.formGroup.patchValue(changes.period.currentValue);
    }
  }

  ngOnInit() {
    this.valueChanges$ = this.formGroup.valueChanges.subscribe(value =>
      this.periodChange.emit(value),
    );
  }

  ngOnDestroy() {
    this.valueChanges$.unsubscribe();
  }
}
