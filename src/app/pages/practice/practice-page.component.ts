import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-practice-page',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './practice-page.component.html',
    styleUrl: './practice-page.component.scss',
})
export class EventsPageComponent {}
