import { JsonPipe } from '@angular/common';

import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { AuthService } from 'src/app/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalLogicalPosition,NbDialogService
} from '@nebular/theme';
// import { DialogNamePromptComponent } from './components/name-prompt-dialog.component';
// import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  myForm!: FormGroup;
  constructor(
    private service: AuthService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private router: Router,
    private dialogService: NbDialogService
  ) {}
  UserList: any[] = [];
  user: any;
  updatedData: any;
  private index: number = 0;

  @HostBinding('class')
  classes = 'example-items-rows';
  closeResult = '';

  ngOnInit(): void {
    this.refreshUserlist();
    this.myForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      team: new FormControl(''),
      balance: new FormControl(''),
      is_staff: new FormControl(''),
    });
  }

  refreshUserlist() {
    this.service.allData().subscribe((data) => {
      this.UserList = data.data.data.reverse();
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  handleEdit(content: any, studentId: number) {
    // this.service.allData().subscribe(data=>{
    //   console.log('data', data.data);

    //   this.UserList = data.data.data.reverse();
    // });
    this.service.singleUser(studentId).subscribe((data) => {
      this.user = data;
    });

    console.log('Edit', studentId);
    let individualData = this.UserList.filter((item) => item.id === studentId);
    console.log(individualData[0]);
    this.myForm.patchValue(individualData[0]);

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  saveValue() {
    const submitinfo = {
      username: this.user.username,
      email: this.user.email,
      team: this.user.team,
      balance: this.user.balance,
      is_staff: this.user.is_staff,
    };
    this.service.updateUser(this.myForm.value, this.user.id).subscribe(
      (data) => {
        console.log('called', data);
        this.updatedData = data;
        this.refreshUserlist();
        this.showToast('success');
      },
      (error) => {
        console.log('err', error);
        this.showToast('danger');
      }
    );
  }
  showToast(status: NbComponentStatus) {
    console.log('status', status);
    debugger;
    if (status === 'success') {
      this.toastrService.show(`Data Updated`, `ID: ${this.user.id}`, { status });
    }
    else if(status==='warning'){
      this.toastrService.show(`ID: ${this.user.id} deleted`, `ID: ${this.user.id}`, { status });
    }
    else {
      this.toastrService.show('Something went wrong', ``, { status });
    }
  }

  handleRemoveValue(studentId: number) {
    this.service.singleUser(studentId).subscribe((data) => {
      this.user = data;
      this.service.updateBalance(this.user, studentId).subscribe((data) => {
        this.updatedData = data;
        this.refreshUserlist();
      });
    });
  }
  handleRemoveUser(studentId: number) {
    const formData = this.myForm.value;
    console.log(formData);
    this.UserList = this.UserList.filter((x) => x.id != formData.id);
    this.service.singleUser(studentId).subscribe((data) => {
      this.user = data;
      this.service.deleteUser(this.user, studentId).subscribe((data) => {
        this.updatedData = data;
        this.refreshUserlist();
        this.showToast('warning');
      });
    });

  
  }
  openModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  searchText: string = '';
  onSearchtextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }
  handleLogout() {
    console.log('clicked');
    this.router.navigateByUrl('login');
  }
handleModalPress(e:any){
    e.stopPropagation();
  };
  
onModalClose (){
    // modal.innerHTML = "";
  };
  


handleDeleteModal(content: any, id: any) {
  console.log(id);
  this.service.singleUser(id).subscribe((data) => {
    this.user = data;
    // console.log(this.user);
    // console.log(this.user.id);
  });
  this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
};

onDeleteUser(id:any){
  this.service.singleUser(id).subscribe((data) => {
    this.user = data;
    // console.log(this.user);
    // console.log(this.user.id);
    this.service.deleteUser(this.user,id);
  // onModalClose();
  });
  // this.service.deleteUser(id);
  // // onModalClose();
};


open2(id:any) {
  // this.dialogService.open(DialogNamePromptComponent)
  //   .onClose.subscribe(name => name && this.names.push(name));
}
}
