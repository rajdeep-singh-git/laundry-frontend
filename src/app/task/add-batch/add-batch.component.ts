import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, from } from 'rxjs';
import { map, retry, startWith } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent {

  controlsArray = [];
  dueDate: Date;
  options: any = [];
  sizes = [];

  minDate = new Date();

  constructor(
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddBatchComponent>
  ) { }

  ngOnInit() {
    this.getBatchItems();
  }

  getBatchItems() {
    this.http.getBatchItems().subscribe((result: any) => {
      this.options = result.records;
      this.addMore();
    });
  }

  private _ItemFilter(value: string): any[] {

    const filterValue = value.toLowerCase();

    return this.options.filter((item) =>
      item.name.toLowerCase().includes(filterValue)
    );
  }

  private _sizeFilter(value: string, sizes): any[] {
    const filterValue = value.toLowerCase();

    return sizes.filter((item) =>
      item.size.toLowerCase().includes(filterValue)
    );
  }

  displayOption(option) {
    return option && option.name
  }

  displaySize(option) {
    return option && option.size
  }

  chooseSize(event, index) {
    this.controlsArray[index].sizesOptions = this.controlsArray[index].size.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.size;
        return name ? this._sizeFilter(name as string, event.value.sizes) : event.value.sizes.slice();
      })
    );
  }


  addMore() {

    const itemControl = new FormControl<string>('', Validators.required);

    this.controlsArray.push({
      item: itemControl,
      size: new FormControl<string>('', Validators.required),
      wash: null,
      isWash: null,
      dry: null,
      isDry: null,
      iron: null,
      isIron: null,
      filteredOptions: from([]),
      sizesOptions: from([])
    });

    this.controlsArray[this.controlsArray.length - 1].filteredOptions = itemControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._ItemFilter(name as string) : this.options.slice();
      })
    );
  }

  remove(index) {
    this.controlsArray.splice(index, 1);
  }

  setPrices(size, index) {
    this.controlsArray[index].wash = size.price.wash;
    this.controlsArray[index].dry = size.price.dry;
    this.controlsArray[index].iron = size.price.iron;
  }

  addBatch() {
    const batch = this.controlsArray.map((m: any) => {
      const obj: any = {
        itemId: m.item.value.id,
        size: m.size.value.size
      }

      m.isDry && (obj.dry = {
        cost: m.dry
      });

      m.isWash && (obj.wash = {
        cost: m.wash
      });

      m.isIron && (obj.iron = {
        cost: m.iron
      });

      return obj

    });

    const payload = {
      batch,
      dueDate: this.dueDate
    }

    this.http.addBatchToClient(this.data.id, payload).subscribe((result: any) => {
      this.dialogRef.close();
    });
  }

}
