/**
 * Client Create
 */

export interface CreateClientDto {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

/**
 * Client entity from API
 * Matches GET /clients response **/
export interface Client {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Client Update
 * Matches PATCH /clients/:id request
 */
export interface UpdateClientDto {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

/**
 * CGet client by id
 */

export interface GetClientByIdDto {
  id: string;
}
/**
 * Get all clients or find clients by email
 */
export interface GetClientsDto {
  email?: string;
}   
