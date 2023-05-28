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

import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalLogicalPosition,NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition
} from '@nebular/theme';
// import { DialogNamePromptComponent } from './components/name-prompt-dialog.component';
// import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent {
  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;
  myForm!: FormGroup;
  myForm2!: FormGroup;
  paginationContainer = document.getElementById("pagination");
  constructor(
    private service: AuthService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,

    private dialogService: NbDialogService
  ) {}
  UserList: any[] = [];
  user: any;
  updatedData: any;
  private index: number = 0;

  state = {
    data: [],
    pageNumber: 1,
    pageSize: 10,
    numberOfPages: 1,
  };
  renderPagination = (pages:any) => {
    const pagesArray = [];
    for(let i = 0; i < pages; i++) {
        const item = `
        <li class="page-item" onclick="onPaginate(${i+1})">
            <span class="page-link"  tabindex="-1">${i+1}</span>
        </li>
        `
        pagesArray.push(item);
    }
    // this.paginationContainer.innerHTML = pagesArray.join("");
}


  @HostBinding('class')
  classes = 'example-items-rows';
  closeResult = '';

  ngOnInit(): void {
    this.refreshUserlist();
    this.myForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      team: new FormControl(''),
      balance: new FormControl(''),
      is_staff: new FormControl(''),
    });
    this.myForm2 = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
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
        this.showToast(this.logicalPositions.BOTTOM_END,'success');
      },
      (error) => {
        console.log('err', error);
        this.showToast(this.logicalPositions.BOTTOM_END,'danger');
      }
    );
  }
  showToast(position: NbGlobalPosition, status: NbComponentStatus) {
    console.log('status', status);
    // debugger;
    if (status === 'success') {
      this.toastrService.show(`Data Updated`, `ID: ${this.user.id}`, {position, status });
    }
    else if(status==='warning'){
      this.toastrService.show(`ID: ${this.user.id} deleted`, `ID: ${this.user.id}`, {position, status });
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
      this.service.deleteUser(studentId).subscribe((data) => {
        this.updatedData = data;
        this.refreshUserlist();
        this.showToast(this.logicalPositions.BOTTOM_END,'warning');
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
  debugger;
  // this.service.singleUser(id).subscribe((data) => {
  //   this.user = data;
  //   // console.log(this.user);
  //   // console.log(this.user.id);
  //   console.log("delete User called in on delete method.");
  //   // onModalClose();
  // });
  this.service.deleteUser(id).subscribe(res=> {
    console.log('res of delete', res);
    this.refreshUserlist();
    this.showToast(this.logicalPositions.BOTTOM_END,'warning')
    
  })
  // this.service.deleteUser(id);
  // // onModalClose();
};


open2(id:any) {
  // this.dialogService.open(DialogNamePromptComponent)
  //   .onClose.subscribe(name => name && this.names.push(name));
}
handleAddUser(content: any){
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
  // this.service.addUser(submitinfo)
  // console.log('Add User called.');
  
}
saveUser() {
  console.log('inside save user.');
  
  this.service.addUser(this.myForm2.value).subscribe(
    (data) => {
      console.log('inside save user.');
      console.log('called', data);
      this.updatedData = data;
      this.refreshUserlist();
      this.showToastAdduser(this.logicalPositions.BOTTOM_END,'success');
    },
    (error) => {
      console.log('err', error);
      this.showToastAdduser(this.logicalPositions.BOTTOM_END,'danger');
    }
  );
}

showToastAdduser(position: NbGlobalPosition, status: NbComponentStatus) {
  console.log('status', status);
  // debugger;
  if (status === 'success') {
    this.toastrService.show(`Data Added`, `Success`, {position, status });
  }

  else {
    this.toastrService.show('Something went wrong', `Error`, {position, status });
  }
}
}
