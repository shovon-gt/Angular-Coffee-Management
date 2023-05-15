import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { ModalBasicComponent } from './home/admin-home/modal-basic/modal-basic.component';
import { NbThemeModule, NbButtonModule, NbDialogModule, NbInputModule,
  NbLayoutModule, NbCardModule, NbSelectModule, NbToastrModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminHomeComponent,
    ModalBasicComponent,
    HeaderComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbSelectModule,
    NbCardModule,
    NbInputModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


