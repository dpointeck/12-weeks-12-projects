import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule],
    template: `
        <header class="mx-auto mt-10 max-w-[700px]">
            <h1 class="font-pixelify text-6xl font-bold text-green-700">
                {{ title }}
            </h1>
        </header>
    `,
})
export class AppHeaderComponent {
    @Input() title = "";
}
