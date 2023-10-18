import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchBatchComponent } from './search-batch/search-batch.component';
import { MatSelectModule } from '@angular/material/select';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    { path: 'search', component: SearchBatchComponent },
    { path: 'search/:tagId', component: SearchBatchComponent }
]

@NgModule({
    declarations: [
        SearchBatchComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BatchModule { }
