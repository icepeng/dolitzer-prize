import { Component, OnInit } from '@angular/core';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.scss'],
})
export class PhotoViewComponent implements OnInit {
  photo: Photo;

  constructor() {}

  ngOnInit() {}
}
