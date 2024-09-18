import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { CustomMessageService } from 'src/app/service/messageService/customMessage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  userId: string | null = null;
  users: any;
  isEdit: boolean = false; // Default as create mode
  genders: any[] = [
    { label: 'Male', gender: 'male' },
    { label: 'Female', gender: 'female' },
    { label: 'Other', gender: 'other' }
  ];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: CustomMessageService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.users = history.state.user;
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserData(this.userId);
    }
    // Check if it's edit mode by checking for user ID in the route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
      }
    });
    // Initialize the form with isEdit flag
    this.fUser(this.isEdit);
  }

  fUser(isEdit: boolean) {
    this.userForm = this.fb.group({
      firstName: [this.users?.firstName || null, Validators.required],
      lastName: [this.users?.lastName || null, Validators.required],
      userName: [this.users?.userName || null, Validators.required],
      phone: [this.users?.phone || null, Validators.required],
      gender: [this.users?.gender, !this.isEdit ? [] : Validators.required], // No validation for edit, required for create
      email: [this.users?.email || null, [Validators.required, Validators.email]],
      password: [this.users?.password, !this.isEdit ? [] : Validators.required] // No validation for edit, required for create
    });
  }

  loadUserData(id: string): void {
    // Load user data by id and populate the form
  }

  onSubmit() {

    if (!this.userId) {

      console.log('User form', this.userForm.value);

      this.userService.createUser(this.userForm.value).subscribe(
        (response: any) => {

          if (response.code === 200) {

            this.messageService.showSuccess("Create user success.");
            setInterval(() => {
              this.router.navigate(['/dashboard/user']); // Redirect to user list or another route after successful creation
            }, 1000);

          }

        },
        (error: HttpErrorResponse) => {
          // Log the error for further investigation
          this.messageService.showError("Error while creating user.");

        }
      );

    } else {
      console.log('User', this.userForm.value);
      this.userService.updateUser(this.userId, this.userForm.value).subscribe((response: any) => {
        if (response.code === 200) {
          this.messageService.showSuccess("Update user success.");
          setInterval(() => {
            this.router.navigate(['/dashboard/user']); // Redirect to user list or another route after successful creation
          }, 1000);
        }
      },
      (error: HttpErrorResponse) => {
        // Log the error for further investigation
        this.messageService.showError("Error while creating user.");

      })

    }
  }

}
