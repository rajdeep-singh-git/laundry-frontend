import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {

  form: any = {
  }

  constructor(
    private http: HttpService,
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {

  }

  ngOnInit() {
    if (this.data.id) {
      this.form = this.data;
    }
  }

  addEditClient() {
    if (this.data.id) {

      const payload = Object.assign({}, this.form);

      delete payload.id;
      delete payload.role;

      this.http.updateClient(this.data.id, payload).subscribe(result => {
        this.dialogRef.close(1);
      }, err => alert(err.message));
    }
    else {
      this.http.addClient(this.form).subscribe(result => {
        this.dialogRef.close(1);
      }, err => alert(err.message));
    }
  }

}
