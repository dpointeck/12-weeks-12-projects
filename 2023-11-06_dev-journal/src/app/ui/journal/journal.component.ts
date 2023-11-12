import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JournalService, JournalEntry } from "../../journal.service";
import { NewEntryFormComponent } from "../newEntryForm/newEntryForm.component";

@Component({
    selector: "app-journal",
    standalone: true,
    imports: [CommonModule, NewEntryFormComponent],
    template: `
        <ul class="max-w-lg">
            <app-new-entry-form />
            @for (group of groups; track group) {
            <li class="mt-6 font-mono text-xs font-extrabold">
                {{ group.week }}
            </li>
            <ul>
                @for (entry of group.entries; track entry.id) {
                <li class="group flex items-baseline font-mono text-xs">
                    <span class="flex h-6 w-6 items-center justify-center">{{
                        icons[entry.category]
                    }}</span>
                    <span class="font-bold"
                        >{{ entry.date | date: "MMM d" }}:</span
                    >
                    {{ entry.text }} 
                    @if (entry.id) {
                    <button class="hidden group-hover:block ml-6 bg-red-600 text-stone-50 rounded px-1 py-0.5" (click)="onDelete(entry.id)">delete</button>
                    }
                </li>
                }
            </ul>
            }
        </ul>
    `,
})
export class JournalComponent implements OnInit {
    groups!: { week: string; entries: JournalEntry[] }[];
    icons: {
        work: string;
        personal: string;
        idea: string;
    } = {
        work: "💼",
        personal: "🏡",
        idea: "💡",
    };

    constructor(public journalService: JournalService) {}

    onDelete(id: string) {
        if(id) {
            this.journalService.deleteEntry(id);
        }
    }
    ngOnInit() {
        this.journalService.getEntries().subscribe((entries) => {
            this.groups = this.journalService.getEntriesByWeek();
        });
    }
}
