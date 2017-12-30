import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit, OnChanges {
  @Input() total: number;
  @Input() perPage: number;
  @Input() page: number;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  totalPage: number;
  isFirst: boolean;
  isLast: boolean;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.totalPage = Math.ceil(this.total / this.perPage);
    this.isFirst = this.page === 1 ? true : null;
    this.isLast = this.page >= this.totalPage ? true : null;
  }
}
