import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss'],
})
export class PhotoFrameComponent implements OnInit, OnChanges {
  @Input() photo: Photo;
  @Input() index: number;
  @Input() total: number;
  @Input() liked: boolean;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() like = new EventEmitter<void>();
  @Output() random = new EventEmitter<void>();

  isFirst: true | null;
  isLast: true | null;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.isFirst = this.index === 0 ? true : null;
    this.isLast = this.index === this.total - 1 ? true : null;
  }
}
