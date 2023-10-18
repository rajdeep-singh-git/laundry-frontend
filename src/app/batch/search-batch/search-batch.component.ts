import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { EditComponent } from '../edit/edit.component';

interface BatchItem {

}

@Component({
  selector: 'app-search-batch',
  templateUrl: './search-batch.component.html',
  styleUrls: ['./search-batch.component.css']
})
export class SearchBatchComponent {

  searchField: string;
  status: string;
  statuses = []

  info: any = {}
  showEmpty: boolean;

  displayedColumns: string[] = ['name', 'wash', 'dry', 'iron', 'size', 'totalCost'];
  dataSource: MatTableDataSource<BatchItem> = new MatTableDataSource<BatchItem>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpService, private route: ActivatedRoute, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getBatchStatuses();
    const tagId = this.route.snapshot.paramMap.get('tagId');

    if (tagId) {
      this.searchField = tagId;
      this.search();
    }
  }

  getBatchStatuses() {
    this.http.getBatchStatus().subscribe((result: any) => {
      this.statuses = result.records;
    })
  }

  search() {
    this.http.getBatchByTagId(this.searchField).subscribe((result: any) => {
      this.info = result.record;
      this.showEmpty = false;
      this.dataSource.data = this.info.batch
      this.dataSource.sort = this.sort;
      this.status = this.info.status
    }, err => {
      this.dataSource.data = [];
      this.info = {};
      this.showEmpty = true;
    })
  }

  changeStatus() {
    this.http.changeStatus(this.info.id, this.status).subscribe((result: any) => {
      this.search()
    })
  }

  openEditDialog() {
    this.dialog.open(EditComponent, {
      data: this.info
    }).afterClosed().subscribe(data => {
      if (data == 1) {
        this.search()
      }
    })
  }

}
