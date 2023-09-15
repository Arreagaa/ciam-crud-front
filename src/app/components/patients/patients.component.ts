import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { error } from 'console';
import { PatientModel } from 'src/app/model/patient-model';
import { PatientService } from 'src/app/service/patient.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  listPatients: PatientModel[] = [];
  formPatient: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.list();
    this.formPatient = new FormGroup({
      patientID: new FormControl(''),
      name: new FormControl(''),
      lastname: new FormControl(''),
      identificationNumber: new FormControl(''),
      documentType: new FormControl(''),
      birthDate: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
      department: new FormControl(''),
      municipality: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      patientType: new FormControl(''),
    });
  }

  list() {
    this.patientService.getPatients().subscribe((res) => {
      if (res) {
        this.listPatients = res;
      }
    });
  }

  save() {
    this.patientService.savePatient(this.formPatient.value).subscribe(
      (res) => {
        if (res) {
          this.list();
          this.formPatient.reset();
          Swal.fire({
            icon: 'success',
            title: 'Se ha agregado al paciente potencial correctamente',
            text: '¡Puedes revisar el cambio!',
            footer: '<a>Puedes verificar al nuevo paciente potencial.</a>',
            confirmButtonColor: '#1183c6',
          });
        }
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar el paciente',
          text: 'Ha ocurrido un error al guardar al paciente potencial.',
          confirmButtonColor: '#1183c6',
        });
      }
    );
  }

  update() {
    this.patientService.updatePatient(this.formPatient.value).subscribe(
      (res) => {
        if (res) {
          this.list();
          this.formPatient.reset();
          this.isUpdate = false;
          Swal.fire({
            icon: 'success',
            title: 'Se ha actualizado al paciente potencial correctamente',
            text: '¡Puedes revisar el cambio!',
            footer: '<a>Puedes verificar al paciente potencial.</a>',
            confirmButtonColor: '#1183c6',
          });
        }
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el paciente',
          text: 'Ha ocurrido un error al actualizar al paciente potencial.',
          confirmButtonColor: '#1183c6',
        });
      }
    );
  }

  delete(id: number) {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea Continuar?',
      text: 'Eliminación de Paciente Potencial',
      showCancelButton: true,
      confirmButtonColor: '#1183c6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar.',
      cancelButtonText: 'Cancelar',
      footer: '<a>Función por concretar.</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.deletePatient(id).subscribe(
          (res) => {
            if (res) {
              this.list();
              this.formPatient.reset();
              this.isUpdate = false;
              Swal.fire({
                icon: 'success',
                title: 'Se ha eliminado al paciente potencial correctamente',
                text: '¡Puedes revisar el cambio!',
                footer: '<a>Puedes verificar al paciente potencial.</a>',
                confirmButtonColor: '#1183c6',
              });
            }
          },
          (error) => {
            console.log(<any>error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el paciente',
              text: 'Ha ocurrido un error al eliminar al paciente potencial.',
              confirmButtonColor: '#1183c6',
            });
          }
        );
      }
    });
  }

  newPatient() {
    this.isUpdate = false;
    this.formPatient.reset();
  }

  selectItem(patient: any) {
    this.isUpdate = true;
    this.formPatient.controls['patientID'].setValue(patient.patientID);
    this.formPatient.controls['name'].setValue(patient.name);
    this.formPatient.controls['lastname'].setValue(patient.lastname);
    this.formPatient.controls['identificationNumber'].setValue(
      patient.identificationNumber
    );
    this.formPatient.controls['documentType'].setValue(patient.documentType);
    this.formPatient.controls['birthDate'].setValue(patient.birthDate);
    this.formPatient.controls['gender'].setValue(patient.gender);
    this.formPatient.controls['address'].setValue(patient.address);
    this.formPatient.controls['department'].setValue(patient.department);
    this.formPatient.controls['municipality'].setValue(patient.municipality);
    this.formPatient.controls['phoneNumber'].setValue(patient.phoneNumber);
    this.formPatient.controls['email'].setValue(patient.email);
    this.formPatient.controls['patientType'].setValue(patient.patientType);
  }
}
