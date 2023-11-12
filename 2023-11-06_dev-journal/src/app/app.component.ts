import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { AppHeaderComponent } from "./ui/header/header.component";
@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, AppHeaderComponent],
    template: `
        <app-header [title]="title"></app-header>
        <main class="mx-auto mt-6 max-w-[700px]">
            <router-outlet></router-outlet>
        </main>
    `,
    styles: [],
})
export class AppComponent {
    title = "dev-journal";
}
