import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public sendOtp(data: object): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/sentOtp`, data);
    }

    public verifyOtp(mobileNumber: string, otp: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/verify`, { mobileNumber, otp });
    }

}