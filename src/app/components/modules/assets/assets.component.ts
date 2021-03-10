import { AssetsService } from './../../../services/assets.service';
import { Group, Headers, Assets } from './data';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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

  constructor(private assetsService: AssetsService) {}

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

  /**
   * Método encargado de ejecutar el filtrado (búsqueda) de datos en la tabla
   * @param filtro Dato recibido como parámetro para la búsqueda
   */
   hacerFiltro(filtro: string): void {
    this.dataSource.filter = filtro;
  }
}
