import { Component, Input, Output, EventEmitter} from "@angular/core";
import { Task } from "src/app/models/task";

@Component({
    selector: 'app-task-card',    
    templateUrl: './taskcard.component.html',
    styleUrls: ['./taskcard.component.scss'],
    standalone: false,
})

export class TaskCardComponent {
    @Input() tasksList: Task[] = [];

    @Output() doTask = new EventEmitter<Task>();
    @Output() updateTask = new EventEmitter<number>();
    @Output() deleteTask = new EventEmitter<number>();

    // Methods for styling card colors
    getPriorityColor(priority: string): string {
        switch (priority.toLowerCase().trim()) {
        case 'importante': return 'danger';
        case 'no importante': return 'success';
        default: return 'primary';
        }
    }

    getStatusLabel(task: Task) {
        return task.status ? 'Realizada' : 'Pendiente';
    }

    getStatusColor(task: Task) {
        return task.status ? 'primary' : 'dark';
    }

}