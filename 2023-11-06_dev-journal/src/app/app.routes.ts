import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadComponent: () =>
            import("./pages/home/home.component").then((m) => m.HomeComponent),
    },
    {
        path: "edit/:id",
        loadComponent: () => import("./pages/edit-entry/edit-entry.component").then((m) => m.EditEntryComponent),    
    },
];
