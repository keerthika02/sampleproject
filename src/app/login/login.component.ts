import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  RegisterForm:FormGroup
  LoginForm:FormGroup
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  constructor(private fb: FormBuilder,private router: Router) {
    this.RegisterForm = fb.group({
      'fname': [null, Validators.compose([Validators.required])],
      'lname':  [null, Validators.compose([Validators.required])],
      'emailid': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation),])],
      'mobileno': [null, Validators.compose([Validators.required, Validators.pattern(this.numbervalidation),])],
      'address': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'cpassword': [null, Validators.compose([Validators.required])],
      'gender': [null],
      'profile':[null]
    });
    this.LoginForm= fb.group({
      'emailid': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    })
   }

  ngOnInit() {
  }
  cpass = false
  cpassword(val){
    var getdata = this.RegisterForm.value
    if(getdata.password == val){
      this.cpass = false
    }else{
      this.cpass = true
    }
  }
  genders
  gender(val){
      this.genders = val
   
  }
  loginshow = false
  RegisterSubmit(){
    if (this.RegisterForm.invalid) {
      this.markFormGroupTouched(this.RegisterForm);
     
    }else{
      var getdata = this.RegisterForm.value
    
      if(this.genders == 'female'){
        getdata.gender = 'Female'
      }else if(this.genders == 'male'){
        getdata.gender = 'Male'
      }else{
        getdata.gender = 'Female'
       
      }
      getdata.profile =  this.profile
      this.loginshow = true
      localStorage.setItem('registrationDetails',JSON.stringify(getdata))
    
    }
  }
  emailval  = false
  loginEmail(val){
    var getdata = JSON.parse(localStorage.getItem('registrationDetails'))
    if(getdata.emailid != val){
      this.emailval = true
    }else{
      this.emailval = false
    }
  }
  passwordval = false
  logpass(val){
    var getdata = JSON.parse(localStorage.getItem('registrationDetails'))
    if(getdata.password != val){
      this.passwordval = true
    }else{
      this.passwordval = false
    }
  }
  backtologin(){
    this.loginshow = true
  }
  backtoreg(){
    this.loginshow= false
  }
  LoginSubmit(){
    if (this.LoginForm.invalid) {
      this.markFormGroupTouched(this.LoginForm);
     
    }else{
      this.router.navigateByUrl('user')

    }
  }
  imageChangedEvent: any = '';
  fileName
  uploadfilename
  UploadPartmasterfinallfile
  profile='assets/profile.svg'
  uploadimg(event: any): void {
    let fileList: FileList = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
   
      reader.readAsDataURL(event.target.files[0]);
    }
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.fileName = file.name;
      var finalfilename = (this.fileName).split(".");
      this.fileName = finalfilename[0];
      this.UploadPartmasterfinallfile = file;
      this.uploadfilename = true
      reader.onload = (event: any) => {
        var from = event.target.result;
          this.profile=  from
         
      }
      // $("#uploadpackmaster").modal("show");
    }
    else {
      var fileList2 = event.srcElement.files;
      var file: File = fileList2[0];
      this.fileName = file.name;
      var finalfilename = (this.fileName).split(".");
      this.fileName = finalfilename[0];
      this.UploadPartmasterfinallfile = file;
    }
    
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
