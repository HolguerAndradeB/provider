/**
 * Interfaz encargada de asignar el tipo a cada uno de los campos de datos a traer desde el Servicio
 */
export interface Provider {
  id?: number;
  name: string;
  nit: string;
  legalRepresentative?: string;
  country?: string;
  city: string;
  neighborhood?: string;
  address?: string;
  email?: string;
  emailSale: string;
  contactNumberOne: string;
  contactNumberTwo?: string;
  contactNumberThree?: string;
  phone?: string;
  type: string;
  status?: string;
  idEmployedCreate?: number;
  dateCreate?: Date;
  idEmployedUpdate?: number;
  dateUpdate?: Date;
}


/**
 * Interface encargada de asignar el tipo de dato a cada uno de los datos a mostrar en el menú de acciones
 */
export interface PHeader {
  columnDef: string;
  header: string;
  fixed?: string;
  actions?: boolean;
}
