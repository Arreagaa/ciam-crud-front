import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientModel } from 'src/app/model/patient-model';
import { PatientService } from 'src/app/service/patient.service';

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
    this.patientService.savePatient(this.formPatient.value).subscribe((res) => {
      if (res) {
        this.list();
        this.formPatient.reset();
      }
    });
  }

  update() {
    this.patientService
      .updatePatient(this.formPatient.value)
      .subscribe((res) => {
        if (res) {
          this.list();
          this.formPatient.reset();
        }
      });
  }

  delete(id: number) {
    this.patientService.deletePatient(id).subscribe((res) => {
      if (res) {
        this.list();
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
