import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Provider, PHeader } from '../../../interfaces/provider';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from '../../../services/provider.service';

interface Country {
  value: string;
  viewValue: string;
}

interface City {
  value: string;
  viewValue: string;
}

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  accion = 'Registrar';
  accionB = 'REGISTRAR';
  id: string | undefined;
  form: FormGroup;

  headers: PHeader[] = [
    { columnDef: 'name', header: 'Nombre', fixed: 'true' },
    { columnDef: 'nit', header: 'NIT' },
    { columnDef: 'city', header: 'Ciudad' },
    { columnDef: 'emailSale', header: 'Email de ventas' },
    { columnDef: 'contactNumberOne', header: 'Número de contacto 1' },
    { columnDef: 'type', header: 'Tipo' },
    {
      columnDef: 'action',
      header: 'Acciones',
      actions: true,
    },
  ];

  displayedColumns = [
    'name',
    'nit',
    'city',
    'emailSale',
    'contactNumberOne',
    'type',

    'action',
  ];

  dataSource = new MatTableDataSource<Provider>(); //MAPEA LOS CAMPOS DE LA TABLA

  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private providerService: ProviderService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nit: ['', Validators.required],
      legalRepresentative: [''],
      type: ['', Validators.required],
      status: [''],
      country: [''],
      city: [''],
      address: [''],
      neighborhood: [''],
      phone: [''],
      email: [''],
      emailSale: [''],
      contactOne: ['', Validators.required],
      contactNumberTwo: [''],
      contactNumberThree: ['']
    })
  }

  ngOnInit(): void {
    this.getAllThird();
  }

  countries: Country[] = [
    {value: '1', viewValue: 'Argentina'},
    {value: '2', viewValue: 'Colombia'},
    {value: '11', viewValue: 'Uruguay'}
  ];

  cities: City[] = [
    {value: '1', viewValue: 'Cali'},
    {value: '2', viewValue: 'Pasto'},
    {value: '11', viewValue: 'Ibague'}
  ];

  types: Type[] = [
    {value: 'Proveedor', viewValue: 'Proveedor'},
    {value: 'Usuario', viewValue: 'Usuario'},
    {value: 'Medico', viewValue: 'Médico'}
  ];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginator;
  }

  ngHacerFiltro(filtro: string): void {
    this.dataSource.filter = filtro;
  }

  getAllThird(){
    this.providerService.getListAllThird().subscribe(data => {
      console.log(data);
      this.dataSource.data = data
    }, error => {
      console.log('error LIST' + error);
    })
  }

  registerThird(){
    const third: any = {
      name: this.form.get('name').value,
      nit: this.form.get('nit').value,
      legalRepresentative: this.form.get('legalRepresentative')?.value,
      type: this.form.get('type')?.value,
      status: this.form.get('status')?.value,
      country: this.form.get('country')?.value,
      city: this.form.get('city')?.value,
      address: this.form.get('address')?.value,
      neighborhood: this.form.get('neighborhood')?.value,
      phone: this.form.get('phone').value,
      email: this.form.get('email')?.value,
      emailSale: this.form.get('emailSale')?.value,
      contactNumberOne: this.form.get('contactOne')?.value,
      contactNumberTwo: this.form.get('contactNumberTwo')?.value,
      contactNumberThree: this.form.get('contactNumberThree')?.value,
    }
    if(this.id == undefined){
      //INSERT PROVIDER
      this.providerService.saveThird(third).subscribe(data => {
        this.getAllThird();
        this.form.reset();
      }, error => {
        console.log('error INSERT: ' + error);
      })
    }else{
      //MODIFICAMOS TARJETA
      third.id = this.id;

      this.providerService.updateThird(this.id, third).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.getAllThird();
      }, error => {
        console.log('error UPDATE: ' + error);
      })
    }
  }

  editThird(third: any){
    this.accion = 'Modificar';
    this.accionB = 'MODIFICAR';
    this.id = third.id;

    this.form.patchValue({
      name: third.name,
      nit: third.nit,
      legalRepresentative: third.legalRepresentative,
      type: third.type,
      status: third.status,
      country: third.country,
      city: third.city,
      address: third.address,
      neighborhood: third.neighborhood,
      phone: third.phone,
      email: third.email,
      emailSale: third.emailSale,
      contactOne: third.contactOne,
      contactNumberTwo: third.contactNumberTwo,
      contactNumberThree: third.contactNumberThree,
    })
    console.log(third);
  }

}
