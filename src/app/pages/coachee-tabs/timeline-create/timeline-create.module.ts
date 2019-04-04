import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimelineCreatePage } from './timeline-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [TimelineCreatePage],
  entryComponents:[TimelineCreatePage]
})
export class TimelineCreatePageModule {}