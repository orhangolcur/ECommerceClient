import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50)
      ]],
      username: ['', [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(50)]],     
      email: ['', [
        Validators.required, 
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      passwordConfirm: ['', [
        Validators.required
      ]]
  }, { validators: (group: AbstractControl) : ValidationErrors | null => {
      let password = group.get('password')?.value;
      let passwordAgain = group.get('passwordConfirm')?.value;    
      return password === passwordAgain ? null : { notSame: true };
  }});
}
  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
  this.submitted = true;
  if (this.frm.invalid) {
    return;
  }

  const result: Create_User = await this.userService.create(user);
  if (result.succeeded) {
    this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  } else {
    this.toastrService.message(result.message, "Hata", {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopRight
    });
  }
  }
}