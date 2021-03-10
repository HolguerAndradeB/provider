export interface Data {}

/**
 * Interfaz encargada de asignar el tipo a cada uno de los campos de datos de los Accesorios a traer desde el Servicio
 */
export interface Assets {
  name: string;
  serie: string;
  sticker: string;
  model: string;
  activeAsset: string;
  assetSituation: string;
  groupId: string;
  inventoryType: string;
  id?: string;
  acquisition?: string;
  dataCreate?: Date;
  depreciable?: string;
  idUserCreate?: string;
  idUserUpdate?: string;
  updateCreate?: Date;
}

/**
 * Interface encargada de asignar el tipo de dato a cada uno de los datos a mostrar en el menú de acciones
 */
export interface Headers {
  columnDef: string;
  header: string;
  fixed?: string;
  actions?: boolean;
}

/**
 * Interface encargada de asignar el tipo de datos para el select Grupo
 */
export interface Group {
  codGroup: string;
  id: string;
  lineId: string;
  name: string;
}

/**
 * Interface encargada de asignar el tipo de datos para el Accesorio
 */
export interface Accessorie {
  accName: string;
  condicion?: string;
  idAsset?: string;
  idMark?: string;
  idInvoice?: string;
}
