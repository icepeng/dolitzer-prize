import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { PhotoModule } from '../photo/photo.module';
import { SharedModule } from '../shared/shared.module';
import { HistoryPeriodComponent } from './components/history-period.component';
import { HistoryComponent } from './containers/history.component';
import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    PhotoModule,
    RouterModule.forChild([{ path: '', component: HistoryComponent }]),
    StoreModule.forFeature('history', reducers),
  ],
  declarations: [HistoryComponent, HistoryPeriodComponent],
  providers: [],
})
export class HistoryModule {}
