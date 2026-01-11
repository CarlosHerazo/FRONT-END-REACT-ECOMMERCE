import { httpClient } from "../../../shared/api";
import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
  GetClientByIdDto,
  GetClientsDto,
} from "../types/clients.types";

export class ClientsService {
    private readonly baseEndpoint = "/customers";

    async getClients(): Promise<Client[]> {
        return httpClient.get<Client[]>(this.baseEndpoint);
    }

    async getClientById(id: GetClientByIdDto): Promise<Client> {
        return httpClient.get<Client>(`${this.baseEndpoint}/${id}`);
    }

    async createClient(data: CreateClientDto): Promise<Client> {
        return httpClient.post<Client>(this.baseEndpoint, data);
    }

    async updateClient(id: string, data: UpdateClientDto): Promise<Client> {
        return httpClient.patch<Client>(`${this.baseEndpoint}/${id}`, data);
    }

    async getClientByEmail(domain: GetClientsDto): Promise<Client | null> {
        try {
            const client = await httpClient.get<Client>(`${this.baseEndpoint}?email=${domain.email}`);
            return client;
        } catch {
            // Si hay error (500, 404, etc.), el cliente no existe
            return null;
        }
    }
   
}

export const clientsService = new ClientsService();