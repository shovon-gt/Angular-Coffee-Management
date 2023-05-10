
import { JsonPipe } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { AuthService } from 'src/app/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  myForm!: FormGroup;
  constructor(private service:AuthService, private modalService: NgbModal,private router: Router){}
  UserList: any[] = [];
  
  
  data = [
    {
      "id": 1,
      "username": "shovon",
      "email": "shovon@gmail.com",
      "team": "SED",
      "balance": 0,
      "is_staff": true
    },
    {
      "id": 2,
      "username": "tausif",
      "email": "tausif@gmail.com",
      "team": "SED",
      "balance": -90,
      "is_staff": true
    },
    {
      "id": 3,
      "username": "arnab",
      "email": "arnab@gmail.com",
      "team": "SED",
      "balance": -80,
      "is_staff": false
    },
    {
      "id": 59,
      "username": "Jyoti",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -50,
      "is_staff": false
    },
    {
      "id": 60,
      "username": "Tanvir",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -90,
      "is_staff": false
    },
    {
      "id": 61,
      "username": "Kibria",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": 125,
      "is_staff": false
    },
    {
      "id": 62,
      "username": "Moon",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -35,
      "is_staff": false
    },
    {
      "id": 63,
      "username": "Mustakim",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -40,
      "is_staff": false
    },
    {
      "id": 64,
      "username": "Fahad",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -130,
      "is_staff": false
    },
    {
      "id": 65,
      "username": "Harun",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -90,
      "is_staff": false
    },
    {
      "id": 66,
      "username": "Saeed",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": 110,
      "is_staff": false
    },
    {
      "id": 67,
      "username": "Navid",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": 0,
      "is_staff": false
    },
    {
      "id": 68,
      "username": "Susmita",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": 0,
      "is_staff": false
    },
    {
      "id": 69,
      "username": "Atiar_Nayeem",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -20,
      "is_staff": false
    },
    {
      "id": 70,
      "username": "Julkar_Nime",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -80,
      "is_staff": false
    },
    {
      "id": 71,
      "username": "Taj",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -10,
      "is_staff": false
    },
    {
      "id": 72,
      "username": "Shahoria",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": 0,
      "is_staff": false
    },
    {
      "id": 73,
      "username": "Rubaed",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": -65,
      "is_staff": false
    },
    {
      "id": 74,
      "username": "Foisal_Murad_IT",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": 45,
      "is_staff": false
    },
    {
      "id": 75,
      "username": "tausif1",
      "email": "test@gmail.com",
      "team": "SED",
      "balance": 0,
      "is_staff": false
    },
    {
      "id": 76,
      "username": "test422",
      "email": "test@gmail.com",
      "team": null,
      "balance": 0,
      "is_staff": false
    }
  ]
  closeResult = '';

  ngOnInit(): void {
    // this.refreshUserlist();
    this.myForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      team: new FormControl(''),
      balance: new FormControl(''),
      is_staff: new FormControl(''),
      });
  }

  refreshUserlist(){
    console.log("get data");
    this.service.allData().subscribe(data=>{
      console.log('data', data.data);
      
      this.UserList = data.data.data;
    });
  }

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
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

  handleEdit(content:any, studentId: number){
    
    console.log("Edit", studentId)
    // console.log(this.data)
    let individualData = this.data.filter(item => item.id === studentId)
    console.log(individualData);
    this.myForm.patchValue(individualData[0])

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
    

  }
  saveValue(){
    const formData = this.myForm.value;
    console.log(formData);
    this.data=this.data.filter(x=>x.id!=formData.id);
    this.data.unshift(formData)
    // this.jsonData.email = formData.email;
    
  }

  handleRemoveValue(studentId: number){
    console.log(studentId);

    // this.data.map(item => {
    //   if (item.id === studentId) {
    //     return item.balance = item.balance - 15;
    //   }
    // });
    this.data.map((item) => {
      if (item.id === studentId) {
            item.balance = item.balance - 15;
          }
    })
    console.log('after map',this.data);


    // this.data.map((res: any) => res.map((this.data[studentId]) => {
    //   return {
    //     id: this.data[studentId]
    //   }
    // }))
    
    // let individualData = this.UserList.map(item => item.id === studentId);
    // console.log(individualData);
    
    // console.log(individualData[0].balance -15);
    // console.log(this.data[studentId]);
    // console.log((this.data[studentId].balance)-15)
    
  }
  handleRemoveUser(studentId: number){
    const formData = this.myForm.value;
    console.log(formData);
    this.data=this.data.filter(x=>x.id!=formData.id);


    // const i=this.data.findIndex(x=>x.id === studentId);
    // console.log(i);
    // if ( i !== -1){
    //   this.data.splice(i,1);
    //   console.log(this.data);
    // }
    
    
    // console.log(studentId);
    // let individualData = this.UserList.filter(item => item.id === studentId);
    // console.log(individualData[0]);
    
  }
  openModal(content: any) {
    // const modalRef = this.modalService.open(ModalBasicComponent);
    // let individualData = this.data.filter(item => item.id === studentId)
    // modalRef.componentInstance.user = individualData;
    // }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
    
  searchText: string = ""
  onSearchtextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }
  handleLogout(){
    console.log('clicked');
    this.router.navigateByUrl('login');
  }
}
