import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {

  constructor(private router: Router,private authService: AuthService, private settings: SettingsService){}  

  userId: string | null = localStorage.getItem('userId');
  email: string | null = null;
  emailActual: string = "";
  pass: string | null = null;
  birthday: string | null = null;


  private getFormattedDate(dateString: string): string {
    // Extrae la parte de la fecha antes de la "T"
    const datePart = dateString.split('T')[0];
    return datePart;
  }

  ngOnInit(){
    this.settings.getUser(this.userId).subscribe(
      (response: any) =>{
        this.emailActual = response.email;
        console.log(this.email);
        console.log(this.birthday);        
      }
    )
  }


  OnSubmit() {
    this.settings.accountManagement(this.userId, this.email, this.pass, this.birthday).subscribe(
      (response) => {
        console.log("Usuario actualizado con exito.");
      }
    )
  }

  isDeleteChecked: boolean = false;

  deleteAccount() {
    this.settings.deleteAccount(this.userId).subscribe(
      (response:any) => {        
        console.log("Cuenta elimindada con éxito");
      }    
    )
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
