import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "src/app/core/services/login.service";

@Component({
    selector: "app-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.css"],
})
export class LandingComponent {
    loginForm!: FormGroup;
    otpSent: boolean = false;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
        });
    }

    sendOtp() {
        if (this.loginForm?.get('mobileNumber')?.valid) {
            const mobileNumber = this.loginForm?.get('mobileNumber')?.value;
            this.loginService.sendOtp(mobileNumber).subscribe(
                (response: any) => {
                    console.log(response.message);
                    this.otpSent = true;
                },
                (error: any) => console.error('Error sending OTP:', error)
            );
        }
    }

    verifyOtp() {
        if (this.loginForm?.valid) {
            const { mobileNumber, otp } = this.loginForm.value;
            this.loginService.verifyOtp(mobileNumber, otp).subscribe(
                (response: any) => {
                    console.log(response.message);
                    // TODO: Handle successful login (e.g., store user ID, redirect to dashboard)
                },
                (error: any) => console.error('Error verifying OTP:', error)
            );
        }
    }
}