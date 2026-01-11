import { httpClient } from "../../../shared/api";
import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
  GetClientByIdDto,
  GetClientsDto,
} from "../types/clients.types";

/**
 * Clients API Service
 * Handles all client-related API calls
 * Base URL: https://nest-back.testbydevelopment.space/api/v1
 */
export class ClientsService {
  private readonly baseEndpoint = "/customers";

  async getClients(): Promise<Client[]> {
    return httpClient.get<Client[]>(this.baseEndpoint);
  }

    /** 
     * Get a single client by ID
     * GET /clients/:id
     * @param id - Client UUID
     * @returns Promise<Client> Client details
     **/ 
    async getClientById(id: GetClientByIdDto): Promise<Client> {
        return httpClient.get<Client>(`${this.baseEndpoint}/${id}`);
    }

    /**
     * Create a new client
     * POST /clients
     * @param data - Client creation data
     * @returns Promise<Client> Created client
     **/
    async createClient(data: CreateClientDto): Promise<Client> {
        return httpClient.post<Client>(this.baseEndpoint, data);
    }
    /**
     * Update an existing client
     * PATCH /clients/:id
     * @param id - Client UUID
     * @param data - Partial client data to update
     * @returns Promise<Client> Updated client
     * **/
    async updateClient(id: string, data: UpdateClientDto): Promise<Client> {
        return httpClient.patch<Client>(`${this.baseEndpoint}/${id}`, data);
    }
    /**
     * Get clients by email domain
     * @param domain - Email domain to filter by
     * @returns Promise<Client[]> Filtered clients
     **/
      async getClientsByEmailDomain(domain: GetClientsDto): Promise<Client[]> {
        let client: Client[] = [];
        try {
             client = await httpClient.get<Client[]>(`${this.baseEndpoint}?email=${domain.email}`);
        } catch {
            throw new Error("Invalid email format");
        }
       
        return client;
    }
   
}

export const clientsService = new ClientsService();