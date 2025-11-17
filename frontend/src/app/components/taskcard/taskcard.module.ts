import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Import the TaskCardComponent
import { TaskCardComponent } from '../../components/taskcard/taskcard.component';

@NgModule({
    declarations: [
        TaskCardComponent   
    ],
    imports: [
        CommonModule,       
        IonicModule         
    ],
    exports: [
        TaskCardComponent   
    ]
})
export class TaskCardModule {}
