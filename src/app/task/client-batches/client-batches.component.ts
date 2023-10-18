import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

interface Batches {
  name: string,
  size: string,
  dueDate: string,
  wash: string,
  dry: string,
  iron: string
}

@Component({
  selector: 'app-client-batches',
  templateUrl: './client-batches.component.html',
  styleUrls: ['./client-batches.component.css']
})
export class ClientBatchesComponent {

  totalRecords: number = 0;

  displayedColumns: string[] = ['tagId', 'cost', 'currentStatus', 'dueDate'];
  dataSource: MatTableDataSource<Batches> = new MatTableDataSource<Batches>();
  sortSubscription: Subscription;

  filter = {
    page: 1,
    perPage: 5,
    sortBy: "",
    sortOrder: ""
  }

  showEmpty: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpService,
  ) {

  }

  ngOnInit() {
    this.getClientBatches();
  }

  getClientBatches() {
    this.http.getClientBatches(this.data.id, this.filter).subscribe((result: any) => {
      this.showEmpty = result.records.length == 0;
      this.dataSource.data = result.records;
      this.totalRecords = result.meta.total;
      this.filter.perPage = result.meta.perPage;
      this.sortRecords();
    })
  }

  onPageChange(event: any) {
    const currentPage = event.pageIndex + 1;
    const itemsPerPage = event.pageSize;
    this.filter.page = currentPage;
    this.filter.perPage = itemsPerPage;
    this.getClientBatches();
  }

  sortRecords() {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    this.sortSubscription = this.sort.sortChange.subscribe((event) => {
      this.filter.sortBy = event.active;
      this.filter.sortOrder = event.direction.toUpperCase();
      this.getClientBatches();
    })
  }

}
