import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AddBatchComponent } from '../add-batch/add-batch.component';
import { ClientBatchesComponent } from '../client-batches/client-batches.component';
import { AddClientComponent } from '../add-client/add-client.component';

interface Clients {
  name: string,
  email: string,
  phone: string,
  action: string
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  filter = {
    search: "",
    page: 1,
    perPage: 5,
    sortBy: "",
    sortOrder: ""
  }

  totalRecords: number = 0;

  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  dataSource: MatTableDataSource<Clients> = new MatTableDataSource<Clients>();
  sortSubscription: Subscription;
  hasRecords: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(event: any) {
    const currentPage = event.pageIndex + 1;
    const itemsPerPage = event.pageSize;
    this.filter.page = currentPage;
    this.filter.perPage = itemsPerPage;
    this.search();
  }

  search() {

    this.http.searchClients(this.filter).subscribe((result: any) => {
      this.dataSource.data = result.records;
      this.totalRecords = result.meta.total;
      this.filter.perPage = result.meta.perPage;
      this.hasRecords = result.records.length;
      this.sortRecords()
    })
  }

  sortRecords() {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    this.sortSubscription = this.sort.sortChange.subscribe((event) => {
      this.filter.sortBy = event.active;
      this.filter.sortOrder = event.direction.toUpperCase();
      this.search()
    })
  }

  resetPagination() {
    this.filter.page = 1;
    this.paginator.firstPage()
  }

  openAddBatchDialog(data) {
    this.dialog.open(AddBatchComponent, {
      data: {
        ...data
      },
      disableClose: true
    })
  }

  openClientBatchesDialog(data) {
    this.dialog.open(ClientBatchesComponent, {
      data: {
        ...data
      }
    })
  }

  openAddClientDialog() {
    this.dialog.open(AddClientComponent, {
      data: {

      }
    }).afterClosed().subscribe(data => {
      if (data == 1) {
        this.search();
      }
    })
  }

  editClientDialog(data) {
    this.dialog.open(AddClientComponent, {
      data: {
        ...data
      }
    }).afterClosed().subscribe(data => {
      if (data == 1) {
        this.search();
      }
    })
  }

}
