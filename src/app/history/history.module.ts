import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PhotoModule } from '../photo/photo.module';
import { PhotoGuard } from '../photo/services/photo-guard.service';
import { SharedModule } from '../shared/shared.module';
import { HistoryPeriodComponent } from './components/history-period.component';
import { HistoryViewComponent } from './containers/history-view.component';
import { HistoryComponent } from './containers/history.component';
import { HistoryEffects } from './effects/history';
import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    PhotoModule,
    RouterModule.forChild([
      { path: '', component: HistoryComponent },
      {
        path: ':id',
        component: HistoryViewComponent,
        canActivate: [PhotoGuard],
      },
    ]),
    StoreModule.forFeature('history', reducers),
    EffectsModule.forFeature([HistoryEffects]),
  ],
  declarations: [
    HistoryComponent,
    HistoryPeriodComponent,
    HistoryViewComponent,
  ],
  providers: [],
})
export class HistoryModule {}
