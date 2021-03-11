import { AssetsService } from './../../../services/assets.service';
import { Group, Headers, Assets, ActiveAsset, Accessorie, InventoryType, Acquisition, Depreciable, AssetSituation } from './data';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit, AfterViewInit {
  title = 'Activos Fijos';
  subTitle = 'Medulo encargado de las funciones generales de Activos Fijos';
  dataSource: any = new MatTableDataSource<Assets>();

  /**
   * FORMULARIO
   */
   assetForm: FormGroup;
   accessorieForm: FormGroup;

   activeAssets: ActiveAsset[] = [
    { value: 0, viewValue: 'Inactivo' },
    { value: 1, viewValue: 'Activo' },
  ];

  assetSituations: AssetSituation[] = [
    { value: 0, viewValue: 'Depreciado' },
    { value: 1, viewValue: 'Activo' },
    { value: 2, viewValue: 'Bodega' },
  ];

  depreciables: Depreciable[] = [
    { value: 0, viewValue: 'NO' },
    { value: 1, viewValue: 'SI' },
  ];

  acquisitions: Acquisition[] = [
    { value: 0, viewValue: 'Inventario Inicial' },
    { value: 1, viewValue: 'Adquisición' },
    { value: 2, viewValue: 'Compra' },
    { value: 3, viewValue: 'Leasing' },
    { value: 4, viewValue: 'Comodato' },
    { value: 5, viewValue: 'Donación' },
    { value: 6, viewValue: 'Reparado' },
  ];

  inventoryTypes: InventoryType[] = [
    { value: 0, viewValue: 'Edificaciones / Oficinas' },
    { value: 1, viewValue: 'Muebles y Enseres' },
    { value: 2, viewValue: 'Equipo de Oficina' },
    { value: 3, viewValue: 'Equipo de Computo' },
    { value: 4, viewValue: 'Equipo de Comunicación' },
    { value: 5, viewValue: 'Equipo de Cocina y Cafetería' },
    { value: 6, viewValue: 'Autos y Camperos' },
    { value: 7, viewValue: 'Herramientas' },
    { value: 8, viewValue: 'Equipo de Vigilancia' },
    { value: 9, viewValue: 'Maquinaria y Equipo Médico Científico' },
    { value: 10, viewValue: 'Elemento Didáctico' },
    { value: 11, viewValue: 'Terrenos' },
    { value: 12, viewValue: 'Maquinaria y Equipos' },
    { value: 13, viewValue: 'Instrumental Quirúrgico' },
    { value: 14, viewValue: 'Accesorios Biomédicos' },
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  accessories: Accessorie[] = [];
  // FIN DE FORMULARIO DATA

  /**
   * Variable que inicializa el ordenador de datos por columna
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Variable que inicializa el paginador de la tabla
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  groups: Group[] = [];
  /**
   * Arreglo de datos, que contiene la definición de la columna y el título de la misma
   * para ser asignadas en la tabla
   * Arreglo del menú de acciones para ser mostrados en la tabla
   */
  headers: Headers[] = [
    { columnDef: 'name', header: 'Nombre', fixed: 'true' },
    { columnDef: 'serie', header: 'Serie' },
    { columnDef: 'sticker', header: 'Stiker' },
    { columnDef: 'model', header: 'Modelo' },
    { columnDef: 'activeAsset', header: 'Activo' },
    { columnDef: 'assetSituation', header: 'Situación' },
    { columnDef: 'groupId', header: 'Grupo' },
    { columnDef: 'inventoryType', header: 'Tipo de inventario' },
    {
      columnDef: 'action',
      header: 'Acciones',
      actions: true,
    },
  ];

  displayedColumns = [
    'name',
    'serie',
    'sticker',
    'model',
    'activeAsset',
    'assetSituation',
    'groupId',
    'inventoryType',
    'action',
  ];

  constructor(private assetsService: AssetsService, private formBuilder: FormBuilder) {
    this.assetForm = this.formBuilder.group({
      name: ['', Validators.required],
      serie: ['', Validators.required],
      groupId: ['', Validators.required],
      sticker: ['', Validators.required],
      model: ['', Validators.required],
      inventoryType: ['', Validators.required],
      depreciable: ['', Validators.required],
      activeAsset: ['', Validators.required],
      assetSituation: ['', Validators.required],
      acquisition: ['', Validators.required],
    });

    this.accessorieForm = this.formBuilder.group({
      accName: ['', Validators.required],
      mark: ['', Validators.required],
      condition: ['', Validators.required],
      asset: ['', Validators.required],
      invoiced: ['', Validators.required],
    });
  }

  // GET DATA ASSET FORM
  get name() {
    return this.assetForm.get('name');
  }

  get serie() {
    return this.assetForm.get('serie');
  }

  get group() {
    return this.assetForm.get('groupId');
  }

  get stiker() {
    return this.assetForm.get('sticker');
  }

  get model() {
    return this.assetForm.get('model');
  }

  get inventoryType() {
    return this.assetForm.get('inventoryType');
  }

  get depreciable() {
    return this.assetForm.get('depreciable');
  }

  get activeAsset() {
    return this.assetForm.get('activeAsset');
  }

  get assetSituation() {
    return this.assetForm.get('assetSituation');
  }

  get acquisition() {
    return this.assetForm.get('acquisition');
  }

  // GET DATA ACCESSORIE
  get accName() {
    return this.assetForm.get('name');
  }

  get mark() {
    return this.assetForm.get('serie');
  }

  get condition() {
    return this.assetForm.get('groupId');
  }

  get asset() {
    return this.assetForm.get('sticker');
  }

  get invoiced() {
    return this.assetForm.get('model');
  }

  ngOnInit(): void {
    this.getGroups();
    this.getAsset();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getGroups(): void {
    this.assetsService.getMiData('api/Assets/Groups').subscribe((data) => {
      this.groups = data;
      console.log(this.groups);
    });
  }

  getAsset(): void {
    this.assetsService.getMiData('api/Assets').subscribe((data) => {
      this.dataSource.data = data;
      console.log(this.dataSource);

      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        switch (element.activeAsset) {
          case 0:
            element.activeAsset = 'Inactivo';
            break;

          case 1:
            element.activeAsset = 'Activo';
            break;
        }

        switch (element.assetSituation) {
          case 0:
            element.assetSituation = 'Depreciado';
            break;

          case 1:
            element.assetSituation = 'Activo';
            break;

          case 2:
            element.assetSituation = 'Bodega';
            break;
        }

        switch (element.inventoryType) {
          case 0:
            element.inventoryType = 'Edificaciones / Oficinas';
            break;

          case 1:
            element.inventoryType = 'Muebles y Enseres';
            break;

          case 2:
            element.inventoryType = 'Equipo de Oficina';
            break;

          case 3:
            element.inventoryType = 'Equipo de Computo';
            break;

          case 4:
            element.inventoryType = 'Equipo de Comunicación';
            break;

          case 5:
            element.inventoryType = 'Equipo de Cocina y Cafetería';
            break;

          case 6:
            element.inventoryType = 'Autos y Camperos';
            break;

          case 7:
            element.inventoryType = 'Herramientas';
            break;

          case 8:
            element.inventoryType = 'Equipo de Vigilancia';
            break;

          case 9:
            element.inventoryType = 'Maquinaria y Equipo Médico Científico';
            break;

          case 10:
            element.inventoryType = 'Elemento Didáctico';
            break;

          case 11:
            element.inventoryType = 'Terrenos';
            break;

          case 12:
            element.inventoryType = 'Maquinaria y Equipos';
            break;

          case 13:
            element.inventoryType = 'Instrumental Quirúrgico';
            break;

          case 14:
            element.inventoryType = 'Accesorios Biomédicos';
            break;
        }

        for (let i = 0; i < this.groups.length; i++) {
          const pGroups = this.groups[i];
          if (element.groupId === pGroups.id) {
            element.groupId = pGroups.name;
          }
        }
        this.dataSource.data = data;
      }
      console.log(this.dataSource.data);
    });
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.accessories.push({ accName: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(accessorie: Accessorie): void {
    const index = this.accessories.indexOf(accessorie);

    if (index >= 0) {
      this.accessories.splice(index, 1);
    }
    console.log(this.accessories);
  }

  addNewAsset(values): void {
    this.assetsService.addMiData('api/Assets', values).subscribe(data => {
      this.getAsset();
    });
    console.log(values);
    this.assetForm.reset();
    // this.dataSource.data = this.dataSource.data;
  }

  addNewAccessorie(values): void {
    this.accessories.push(values);
    this.accessorieForm.reset();
    console.log(values);
  }


  /**
   * Método encargado de ejecutar el filtrado (búsqueda) de datos en la tabla
   * @param filtro Dato recibido como parámetro para la búsqueda
   */
  hacerFiltro(filtro: string): void {
    this.dataSource.filter = filtro;
  }
}
