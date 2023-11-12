import { Component, AfterViewInit , ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { JournalEntry, JournalService } from "../../journal.service";

@Component({
    selector: "app-new-entry-form",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <form [formGroup]="entryForm" (ngSubmit)="onSubmit()" class="max-w-sm">
            <label class="flex flex-col font-mono text-xs">
                <span>date</span>
                <input
                    class="rounded px-3 py-2"
                    type="date"
                    formControlName="date"
                    required
                />
            </label>
            <label class="mt-4 flex flex-col font-mono text-xs">
                text
                <textarea
                    class="rounded px-3 py-2"
                    formControlName="text"
                    required
                    #textArea
                ></textarea>
            </label>
            <div>
                <label class="mt-4 flex flex-col font-mono text-xs">category</label>
                <div class="flex gap-5">
                    <label>
                        <input
                            type="radio"
                            formControlName="category"
                            value="work"
                            required
                        />
                        💼
                    </label>
                    <label>
                        <input
                            type="radio"
                            formControlName="category"
                            value="personal"
                            required
                        />
                        🏡
                    </label>
                    <label>
                        <input
                            type="radio"
                            formControlName="category"
                            value="idea"
                            required
                        />
                        💡
                    </label>
                </div>
            </div>
            <button
                type="submit"
                [disabled]="entryForm.invalid"
                class="mt-4 rounded bg-green-800 px-3 py-1 font-mono text-sm font-bold text-[color:#fffcf0]"
            >
                Add Entry
            </button>
        </form>
    `,
    styles: ``,
})
export class NewEntryFormComponent implements AfterViewInit  {
    entryForm = new FormGroup({
        date: new FormControl(),
        text: new FormControl(),
        category: new FormControl(),
    });

    @ViewChild('textArea') textArea!: ElementRef;

    constructor(private journalService: JournalService, private fb: FormBuilder) {
        const today = new Date();
        const todayString = today.toISOString().substr(0, 10);
        this.entryForm = this.fb.group({
          date: [todayString, Validators.required],
          text: ['', Validators.required],
          category: ['work', Validators.required]
        });
    }

    ngAfterViewInit(): void {
        console.log(this.textArea);
        if (this.textArea) {
            console.log(this.textArea);
            this.textArea.nativeElement.focus();
        }
    }

    onSubmit() {
        const formValue = this.entryForm.value;
        const newEntry: JournalEntry = {
            date: formValue.date,
            text: formValue.text,
            category: formValue.category,
        };
        this.journalService.addEntry(newEntry);
        const currentDate = this.entryForm.get('date')?.value;
        const currentCategory = this.entryForm.get('category')?.value;
        this.entryForm.reset({ date: currentDate, category: currentCategory});
        this.textArea.nativeElement.focus();
    }
}
