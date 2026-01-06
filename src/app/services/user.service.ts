import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UserRegisterPayload{
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) { }

  register(body: UserRegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, body)
  }
}

