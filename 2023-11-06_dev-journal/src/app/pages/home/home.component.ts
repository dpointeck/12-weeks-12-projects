import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JournalComponent } from "../../ui/journal/journal.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [CommonModule, JournalComponent],
    template: ` <app-journal /> `,
    styles: ``,
})
export class HomeComponent {}
