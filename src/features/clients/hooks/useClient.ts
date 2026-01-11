import { useState, useEffect, useCallback } from "react";
import { clientsService } from "../services/clients.service";
import type { Client, GetClientByIdDto } from "../types/clients.types";

interface UseClientState {
  client: Client | null;
  loading: boolean;
  error: Error | null;
}

interface UseClientReturn extends UseClientState {
  refetch: () => Promise<void>;
}
/**
 * Custom hook to fetch a single client by ID
 * @param clientId - Client UUID
 * */
export const useClient = (clientId: GetClientByIdDto): UseClientReturn => {
    const [state, setState] = useState<UseClientState>({
        client: null,
        loading: true,
        error: null,
    });
    const fetchClient = useCallback(async () => {
        if (!clientId) {
        setState({ client: null, loading: false, error: null });
        return;
        }
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
        const data = await clientsService.getClientById(clientId);
            setState({ client: data, loading: false, error: null });
        } catch (err) {
        setState({
            client: null,
            loading: false,
            error: err instanceof Error ? err : new Error("Failed to fetch client"),
        });
        }
        }, [clientId]);
        const refetch = useCallback(async () => {
        await fetchClient();
    }, [fetchClient]);

    useEffect(() => {
        fetchClient();
    }, [fetchClient]);

    return {
        client: state.client,
        loading: state.loading,
        error: state.error,
        refetch,
    };
};
