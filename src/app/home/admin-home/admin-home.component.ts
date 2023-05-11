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

  // data = [
  //   {
  //     "id": 1,
  //     "username": "shovon",
  //     "email": "shovon@gmail.com",
  //     "team": "SED",
  //     "balance": 0,
  //     "is_staff": true
  //   },
  //   {
  //     "id": 2,
  //     "username": "tausif",
  //     "email": "tausif@gmail.com",
  //     "team": "SED",
  //     "balance": -90,
  //     "is_staff": true
  //   },
  //   {
  //     "id": 3,
  //     "username": "arnab",
  //     "email": "arnab@gmail.com",
  //     "team": "SED",
  //     "balance": -80,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 59,
  //     "username": "Jyoti",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -50,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 60,
  //     "username": "Tanvir",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -90,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 61,
  //     "username": "Kibria",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": 125,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 62,
  //     "username": "Moon",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -35,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 63,
  //     "username": "Mustakim",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -40,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 64,
  //     "username": "Fahad",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -130,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 65,
  //     "username": "Harun",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -90,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 66,
  //     "username": "Saeed",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": 110,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 67,
  //     "username": "Navid",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": 0,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 68,
  //     "username": "Susmita",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": 0,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 69,
  //     "username": "Atiar_Nayeem",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -20,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 70,
  //     "username": "Julkar_Nime",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -80,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 71,
  //     "username": "Taj",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -10,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 72,
  //     "username": "Shahoria",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": 0,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 73,
  //     "username": "Rubaed",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": -65,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 74,
  //     "username": "Foisal_Murad_IT",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": 45,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 75,
  //     "username": "tausif1",
  //     "email": "test@gmail.com",
  //     "team": "SED",
  //     "balance": 0,
  //     "is_staff": false
  //   },
  //   {
  //     "id": 76,
  //     "username": "test422",
  //     "email": "test@gmail.com",
  //     "team": null,
  //     "balance": 0,
  //     "is_staff": false
  //   }
  // ]
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
    // console.log("get data");
    this.service.allData().subscribe((data) => {
      // console.log('data', data.data);

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
      // console.log(this.user);
      // console.log(this.user.id);
    });

    console.log('Edit', studentId);
    // console.log(this.data)
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
      // id: this.user.id,
      username: this.user.username,
      email: this.user.email,
      team: this.user.team,
      balance: this.user.balance,
      is_staff: this.user.is_staff,
    };
    // const id: this.user.id,
    this.service.updateUser(this.myForm.value, this.user.id).subscribe(
      (data) => {
        console.log('called', data);
        
        this.updatedData = data;
        // console.log(this.updatedData.data.data);
        this.refreshUserlist();
        this.showToast('success');

        // this.UserList.push(this.updatedData.data.data);
        // console.log(this.user.id);
      },
      (error) => {
        console.log('err', error);
        this.showToast('danger');
      }
    );
    // const formData = this.myForm.value;
    // console.log(formData);
    // this.UserList=this.UserList.filter(x=>x.id!=formData.id);
    // this.UserList.push(formData)
    // console.log(this.UserList);

    // this.jsonData.email = formData.email;
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
handleModalPress(){
    // e.stopPropagation();
  };
  
onModalClose (){
    // modal.innerHTML = "";
  };
  

onDeleteUser (id:any){
  this.handleRemoveUser(id);
  // onModalClose();
};
handleDeleteModal(id: any) {
  const formData = `  
    <div onclick="onModalClose()" class="backdrop">
    <div onclick="handleModalPress(event)" onpointerdown="handleModalPress(event)" class="my-4 m-4 px-4 py-4 card popup1" >
    <h3 class="mb-4 text-center">Are you want to delete the user?</h3>
    <div class="mt-4 p-4 button-group flex delete-confirm">
    <button type="button" onclick="onDeleteUser(${id})" class="btn btn-danger btn-lg px-4 mr-4">
        YES
    </button>
    <button type="button" class="btn btn-warning btn-lg ml-4 px-4" onclick="onModalClose()"
    >
        NO
    </button>
    </div>
    </div>
    </div> `;

  // modal.innerHTML = formData;
};
open2(id:any) {
  // this.dialogService.open(DialogNamePromptComponent)
  //   .onClose.subscribe(name => name && this.names.push(name));
}
}
