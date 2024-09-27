import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import { CustomMessageService } from 'src/app/core/service/customMessage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  userId = '';
  users: any;
  isEdit: boolean = false; // Default as create mode
  selectedFiles: File[] = []; // For multiple files
  selectedFile!: File; // For a single file
  imagePreview!: [];
  genders: any[] = [
    { label: 'Male', gender: 'Male' },
    { label: 'Female', gender: 'Female' },
    { label: 'Other', gender: 'Other' }
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
    // Check if it's edit mode by checking for user ID in the route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.loadUserData(params['id']);
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
    this.userId = id;
  }

  onFileSelected(event: any): void {
    const files = event.target.files;

    if (files.length === 1) {
      // Single file selection
      this.selectedFile = files[0];
      this.previewSingleImage(this.selectedFile);
    } else if (files.length > 1) {
      // Multiple file selection
      this.selectedFiles = Array.from(files);
      this.previewMultipleImages(this.selectedFiles);
    }
  }

  previewSingleImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result; // base64 string of the single image
      console.log("Image", this.imagePreview);
    };

    reader.readAsDataURL(file);

  }

  previewMultipleImages(files: File[]): void {
    this.imagePreview = []; // Clear previous previews
    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target as FileReader; // Explicitly cast e.target to FileReader

        if (target && target.result) {
          // Assuming imagePreview is of type `Array<string | ArrayBuffer | null>`
          (this.imagePreview as Array<string | ArrayBuffer | null>).push(target.result);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  onDeleteImage() {
    this.imagePreview = [];
  }

  onSubmit() {
    console.log("User object", this.userForm.value);
    const formData = new FormData();

    // Append user data
    const userBlob = new Blob([JSON.stringify(this.userForm.value)], {
      type: 'application/json'
    });
    formData.append('user', userBlob);

    // Append single file if selected
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);  // Add filename
    }

    if (!this.userId) {
      this.userService.createUser(formData).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.messageService.showSuccess("Create user success.");
            setTimeout(() => {
              this.router.navigate(['/dashboard/user']); // Redirect after success
            }, 1000);
          }
        },
        (error: HttpErrorResponse) => {
          this.messageService.showError("Error while creating user.");
        }
      );
    } else {
      this.userService.updateUser(this.userId, formData).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.messageService.showSuccess("Update user success.");
            setTimeout(() => {
              this.router.navigate(['/dashboard/user']); // Redirect after success
            }, 1000);
          }
        },
        (error: HttpErrorResponse) => {
          console.log('User object', formData);
          this.messageService.showError("Error while updating user.");
        }
      );
    }
  }

}
