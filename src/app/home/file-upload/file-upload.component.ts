import { HttpClient } from '@angular/common/http';
import { Component,HostBinding,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NbComponentStatus, NbTagComponent, NbToastrService,
  NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition } from '@nebular/theme';
import { HeaderComponent } from 'src/app/header/header.component';
import {  } from '@nebular/theme';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit{
  // toastrService: any;
  file:any;
  message: any;
  @HostBinding('class')
  classes = 'example-items-rows';

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;
  myForm!: FormGroup;
 
  constructor(private toastrService: NbToastrService){}
  
  fileUpload(event:any){
    console.log(event.target.files);
    console.log(event.target.files[0]);
      
    if(event.target.files[0].size < 4194304 && event.target.files[0].type == 'application/pdf' ){
      
      console.log(event.target.files[0].size);
      this.message = "File Uploaded"
      this.showToast(this.logicalPositions.BOTTOM_END,'success')
    }
    else{
      // event.target.files[0].name = "";
      console.log("file cann't exceed 4mb");
      this.message = "File type should be pdf and cann't exceed 4mb."
      this.showToast(this.logicalPositions.BOTTOM_END, 'danger')
    }
    // if( ){
    //   console.log('type pdf:',event.target.files[0].type);
    //   this.showToast('success')
    // }
    // else{
    //   console.log("file must be pdf");
    //   this.showToast('danger')
    // }
    
  }
  showToast(position: NbGlobalPosition, status:NbComponentStatus) {
    if (status === 'success') {
      // this.toastrService.show(`Data Added`, ``, );
      this.toastrService.show(this.message, 'Success', { position ,status});
    }
    else {
      this.toastrService.show(this.message, 'Error', { position ,status});
      // console.log(this.file.value);
      
    }
  }
  ngOnInit() {
    this.myForm = new FormGroup({
      file: new FormControl(''),
    });

  }
}
