
import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  searchResults: any[] = [];
  searchKeyword: string = '';

  constructor(
    private staffService: StaffService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.searchListStaff('');
  }

  searchListStaff(keyword: string) {
    this.staffService.search(keyword).subscribe(
      (response: any) => {
        this.searchResults = response.Result;
      },
      // (error: any) => {
      //   console.error(error);
      // }
    );
  }

  deleteStaff(id: number) {

    // console.log(id)
    // return

    this.staffService.delete(id).subscribe({

      next: (response) => {
        if (response.Ok === true) {
          this.searchListStaff(this.searchKeyword);
        } else {
          alert('Error');
        }
      },

      error: (error) => { },
      complete: () => console.info('deleted')
    })
  }

  openPopup(isInsert: boolean, id?: number) {
    const modalRef = this.modalService.open(ModalComponent);
    if (isInsert) {
      modalRef.componentInstance.isInsert = true;
      modalRef.componentInstance.title = 'Create staff'
      modalRef.componentInstance.searchResults = this.searchResults;

    } else {
      modalRef.componentInstance.isInsert = false;
      modalRef.componentInstance.title = 'Update staff'
      modalRef.componentInstance.searchResults = this.searchResults;
      this.staffService.find(id!).subscribe({
        next: (response) => {
          if (response.Ok === true) {
            console.log(response.Result)
            modalRef.componentInstance.staffInfo = response.Result;
          } else {
            alert('Error');
          }

        },
      })
    }
  }
}
