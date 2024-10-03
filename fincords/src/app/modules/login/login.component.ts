import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    loginForm!: FormGroup;
    otpSent: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
        });
    }

    sendOtp() {
        if (this.loginForm?.get('mobileNumber')?.valid) {
            const request = {
                mobileNumber: this.loginForm?.get('mobileNumber')?.value
            };
            this.authService.sendOtp(request).subscribe(response => {
                console.log(response.message);
                this.otpSent = true;
            }, error => console.error('Error sending OTP:', error)
            );
        }
    }

    verifyOtp() {
        if (this.loginForm?.valid) {
            const { mobileNumber, otp } = this.loginForm.value;
            this.authService.verifyOtp(mobileNumber, otp).subscribe(
                (response: any) => {
                    console.log(response.message);
                    // TODO: Handle successful login (e.g., store user ID, redirect to dashboard)
                },
                (error: any) => console.error('Error verifying OTP:', error)
            );
        }
    }
}