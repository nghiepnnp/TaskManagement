import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from '../services/staff.service'

@Component({
  selector: 'app-my-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">{{title}}</h5>
      <button type="button" class="close btn" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Họ và tên</label>
      <input type="text" class="form-control" name = "FullName" [(ngModel)]="staffInfo.FullName">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Tên ngắn</label>
      <input type="text" class="form-control" name = "ShortName" [(ngModel)]="staffInfo.ShortName">
    </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
      <button type="button" class="btn btn-primary" (click)="this.InsertOrUpdate()">{{isInsert ? 'Create':'Update'}}</button>
    </div>

  `
})
export class ModalComponent {
  @Input() isInsert: boolean = true;
  @Input() title: string = 'Create staff';
  @Input() staffInfo: any = { "Id": "0", "FullName": "", "ShortName": "" };
  @Input() searchResults: any[] = [];

  constructor(
    public modal: NgbActiveModal,
    private staffService: StaffService) { }

  InsertOrUpdate() {
    console.log(this.staffInfo)
    if (this.isInsert) {
      this.staffService.insert(this.staffInfo).subscribe({
        next: (response) => {
          if (response.Ok === true) {
            alert("Create successfull, reoad lai trang de")
            this.modal.close();
            this.searchListStaff('')
          } else {
            alert('Error');
          }
        },
      })
    } else {
      this.staffService.update(this.staffInfo.Id, this.staffInfo).subscribe({
        next: (response) => {
          if (response.Ok === true) {
            alert("Update successfull, reoad lai trang de")
            this.modal.close();
            this.searchListStaff('')
          } else {
            alert('Error');
          }
        },
      })
    }
  }

  searchListStaff(keyword: string) {
    this.staffService.search(keyword).subscribe(
      (response: any) => {
        this.searchResults = response.Result;
        console.log(response.Result)
      },
      // (error: any) => {
      //   console.error(error);
      // }
    );
  }


  

}
