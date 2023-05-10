import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})
export class ModalBasicComponent {

	// data = [
	// 	{
	// 	  "id": 1,
	// 	  "username": "shovon",
	// 	  "email": "shovon@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 0,
	// 	  "is_staff": true
	// 	},
	// 	{
	// 	  "id": 2,
	// 	  "username": "tausif",
	// 	  "email": "tausif@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -90,
	// 	  "is_staff": true
	// 	},
	// 	{
	// 	  "id": 3,
	// 	  "username": "arnab",
	// 	  "email": "arnab@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -80,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 59,
	// 	  "username": "Jyoti",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -50,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 60,
	// 	  "username": "Tanvir",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -90,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 61,
	// 	  "username": "Kibria",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 125,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 62,
	// 	  "username": "Moon",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -35,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 63,
	// 	  "username": "Mustakim",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -40,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 64,
	// 	  "username": "Fahad",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -130,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 65,
	// 	  "username": "Harun",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -90,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 66,
	// 	  "username": "Saeed",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 110,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 67,
	// 	  "username": "Navid",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 0,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 68,
	// 	  "username": "Susmita",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 0,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 69,
	// 	  "username": "Atiar_Nayeem",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -20,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 70,
	// 	  "username": "Julkar_Nime",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -80,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 71,
	// 	  "username": "Taj",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -10,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 72,
	// 	  "username": "Shahoria",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 0,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 73,
	// 	  "username": "Rubaed",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": -65,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 74,
	// 	  "username": "Foisal_Murad_IT",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 45,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 75,
	// 	  "username": "tausif1",
	// 	  "email": "test@gmail.com",
	// 	  "team": "SED",
	// 	  "balance": 0,
	// 	  "is_staff": false
	// 	},
	// 	{
	// 	  "id": 76,
	// 	  "username": "test422",
	// 	  "email": "test@gmail.com",
	// 	  "team": null,
	// 	  "balance": 0,
	// 	  "is_staff": false
	// 	}
	//   ]
  closeResult = '';
  constructor(private modalService: NgbModal) {}
  @Input() public user:any;
  myForm!: FormGroup;
  ngOnInit() {
	// console.log("user",this.user);
	this.myForm = new FormGroup({
		name: new FormControl(''),
		email: new FormControl(''),
		team: new FormControl(''),
		balance: new FormControl(''),
		is_staff: new FormControl(''),
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

}
