import { Injectable } from "@angular/core";
import { startOfWeek, format, getISOWeek, parseISO, isValid } from "date-fns";
import { BehaviorSubject, Observable } from "rxjs";
import { v4 as uuidv4 } from 'uuid';

export interface JournalEntry {
    id?: string;
    date: Date;
    text: string;
    category: "work" | "personal" | "idea";
}

export interface CalendarWeekEntries {
    week: string;
    entries: JournalEntry[];
}

@Injectable({
    providedIn: "root",
})
export class JournalService {
    private entries: JournalEntry[] = [];
    private entriesSubject = new BehaviorSubject<JournalEntry[]>([]);
    constructor() {
        this.loadEntries();
    }

    private loadEntries() {
        const entriesJson = localStorage.getItem("journalEntries");
        if (entriesJson) {
            this.entries = JSON.parse(entriesJson);
            this.entriesSubject.next(this.entries);
        }
    }

    private saveEntries() {
        localStorage.setItem("journalEntries", JSON.stringify(this.entries));
    }

    // Method to add a new entry
    addEntry(entry: JournalEntry) {
        const newEntry = { ...entry, id: uuidv4() };
        this.entries.push(newEntry);
        this.entriesSubject.next(this.entries);
        this.saveEntries();
    }

    // Method to retrieve all entries
    getEntries(): Observable<JournalEntry[]> {
        return this.entriesSubject.asObservable();
    }

    // Method to retrieve entries by category
    getEntriesByCategory(
        category: "work" | "personal" | "idea",
    ): JournalEntry[] {
        return this.entries.filter((entry) => entry.category === category);
    }

    getEntriesByWeek(): { week: string; entries: JournalEntry[] }[] {
        const groups: CalendarWeekEntries[] = [];

        this.entries.forEach((entry) => {
            const date = parseISO(String(entry.date));
            if (!isValid(date)) {
                return;
            }
            const weekStart: any = startOfWeek(date);
            const weekKey: any = format(weekStart, "yyyy-MM-dd");

            if (!groups[weekKey]) {
                groups[weekKey] = {
                    week: `Week ${getISOWeek(weekStart)}`,
                    entries: [],
                };
            }

            groups[weekKey].entries.push(entry);
        });

        // Sort the entries in each group by date in descending order
        console.log(groups);
        Object.values(groups).forEach((group: any) => {
            group.entries.sort((a: any, b: any) => {
              const timeA = Date.parse(a.date);
              const timeB = Date.parse(b.date);
              console.log(timeA, timeB);
              return timeB - timeA;
            });
          });

        // Sort the groups by week number in descending order
        const sortedGroups = Object.values(groups).sort((a: any, b: any) => {
            const weekA = parseInt(a.week.split(" ")[1]);
            const weekB = parseInt(b.week.split(" ")[1]);
            return weekB - weekA;
        });

        console.log(sortedGroups);
        return sortedGroups;
    }

    deleteEntry(id: string) {
        if(id) {
            const index = this.entries.findIndex(e => e.id === id);
            if (index >= 0) {
              this.entries.splice(index, 1);
              this.entriesSubject.next(this.entries);
              this.saveEntries();
            }
        }
      }
}
