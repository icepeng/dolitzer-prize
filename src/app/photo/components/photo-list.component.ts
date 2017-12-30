import { Component, Input, OnInit } from '@angular/core';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
  @Input() photos: Photo[];

  constructor() {}

  ngOnInit() {}
}
