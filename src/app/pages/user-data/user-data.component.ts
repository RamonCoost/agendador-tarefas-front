import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DialogField, ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';


@Component({
  selector: 'app-user-data',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})

export class UserDataComponent {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService)

  user = this.userService.user;

  form = this.formBuilder.group({
    nome: [{ value: this.user()?.nome || '', disabled: true }],
    email: [{ value: this.user()?.email || '', disabled: true }],
  })

  onSave() {
    this.dialog
  }

  cadastrarEndereco() {
    const token = this.authService.getToken()
    if (!token) return

    const formConfig: DialogField[] = [
      { name: 'cep', label: 'CEP', validators: [Validators.required] },
      { name: 'rua', label: 'RUA' },
      { name: 'numero', label: 'Nº', type: 'number', },
      { name: 'complemento', label: 'COMPLEMENTO' },
      { name: 'cidade', label: 'CIDADE' },
      { name: 'estado', label: 'ESTADO' },
    ]

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Endereço', formConfig },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.saveEndereco(result, token).subscribe({
          next: () => console.log('Endereço cadastrado com sucesso', result),
          error: () => console.log('Erro ao cadastrar Endereço', result),
        })
      }
    });
  }

  editarEndereco(endereco: {
    id: number,
    rua: string,
    numero: number,
    complemento: string,
    cidade: string,
    estado: string,
    cep: string
  }) {
    const token = this.authService.getToken()
    if (!token) return

    const formConfig: DialogField[] = [
      { name: 'cep', label: 'CEP', value: endereco.cep, validators: [Validators.required] },
      { name: 'rua', label: 'RUA', value: endereco.rua },
      { name: 'numero', label: 'Nº', type: 'number', value: endereco.numero },
      { name: 'complemento', label: 'COMPLEMENTO', value: endereco.complemento },
      { name: 'cidade', label: 'CIDADE', value: endereco.cidade },
      { name: 'estado', label: 'ESTADO', value: endereco.estado },
    ]

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Endereço', formConfig },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateEndereco(endereco.id, result, token).subscribe({
          next: () => console.log('Endereço cadastrado com sucesso', result),
          error: () => console.log('Erro ao cadastrar Endereço', result),
        })
      }
    })
  }

  cadastrarTelefone() {
    const token = this.authService.getToken()
    if (!token) return

    const formConfig: DialogField[] = [
      { name: 'ddd', label: 'DDD', validators: [Validators.required] },
      { name: 'numero', label: 'NUMERO', validators: [Validators.required] },
    ]

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Adicionar Telefone', formConfig },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.saveTelefone(result, token).subscribe({
          next: () => console.log('Telefone cadastrado com sucesso', result),
          error: () => console.log('Erro ao cadastrar telefone', result),
        })
      }
    })
  }

  editarTelefone(telefone: { id: number, ddd: string; numero: string }) {
    const token = this.authService.getToken()
    if (!token) return

    const formConfig: DialogField[] = [
      { name: 'ddd', label: 'DDD', value: telefone.ddd, validators: [Validators.required] },
      { name: 'numero', label: 'NUMERO', value: telefone.numero, validators: [Validators.required] },
    ]

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { title: 'Editar Telefone', formConfig },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateTelefone(telefone.id, result, token).subscribe({
          next: () => console.log('Telefone editado com sucesso', result),
          error: () => console.log('Erro ao editar telefone', result),
        })
      }
    });
  }
}
