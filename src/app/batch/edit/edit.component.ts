import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { startWith, map, from } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  controlsArray = [];
  dueDate: Date;
  options: any = [];
  sizes = [];

  minDate = new Date();

  constructor(
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditComponent>
  ) { }

  ngOnInit() {
    this.getBatchItems();
    this.dueDate = new Date(this.data.dueDate);
  }

  getBatchItems() {
    this.http.getBatchItems().subscribe((result: any) => {
      this.options = result.records;
      this.fillFieldsFromBatchData();
    });
  }

  fillFieldsFromBatchData() {

    this.data.batch.forEach(batch => {
      const option = this.options.find(o => o.id == batch.itemId);
      const sizes = option.sizes;
      const size = sizes.find(s => s.size == batch.size);

      const itemControl = new FormControl(option);
      const sizeControl = new FormControl(size);

      this.controlsArray.push({
        item: itemControl,
        size: sizeControl,
        wash: batch.wash?.cost,
        isWash: !!batch.wash?.cost,
        dry: batch.dry?.cost,
        isDry: !!batch.dry?.cost,
        iron: batch.iron?.cost,
        isIron: !!batch.iron?.cost,
        filteredOptions: from([]),
        sizesOptions: from([])
      })

      this.controlsArray[this.controlsArray.length - 1].filteredOptions = itemControl.valueChanges.pipe(
        startWith(''),
        map((value: any) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._ItemFilter(name as string) : this.options.slice();
        })
      );



      this.controlsArray[this.controlsArray.length - 1].sizesOptions = sizeControl.valueChanges.pipe(
        startWith(''),
        map((value: any) => {
          const name = typeof value === 'string' ? value : value?.size;
          return name ? this._sizeFilter(name as string, sizes) : sizes.slice();
        })
      );

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

  updateBatch() {
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

    this.http.updateBatch(this.data.id, payload).subscribe((result: any) => {
      this.dialogRef.close(1);
    });
  }
}
