import { useState, useEffect } from 'react';
import { clientsService } from '../../../features/clients/services/clients.service';
import type { CustomerInfo, NewCustomerData } from './types';

export const useEmailModal = (isOpen: boolean) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<CustomerInfo | null>(null);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState<NewCustomerData>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NewCustomerData, string>>>({});

  // Limpiar estado al cerrar
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setSearchResult(null);
      setError('');
      setShowResult(false);
      setIsLoading(false);
      setNewCustomerData({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        country: ''
      });
      setFormErrors({});
    }
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Buscar cliente por email usando el servicio
      const clients = await clientsService.getClientsByEmailDomain({ email: email });
      const customer = clients.find(c => c.email === email);

      if (customer) {
        // Cliente existente encontrado
        setSearchResult({
          email: customer.email,
          isExisting: true,
          name: customer.fullName,
          membershipLevel: "premium", // Puedes ajustar esto según tu lógica de negocio
          joinDate: new Date(customer.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        });
      } else {
        // Nuevo cliente
        setSearchResult({
          email,
          isExisting: false
        });
      }

      setShowResult(true);
    } catch (error) {
      console.error('Error al buscar cliente:', error);
      setError('El cliente no existe o hubo un error en la búsqueda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEmail = () => {
    setShowResult(false);
    setSearchResult(null);
  };

  const handleFormChange = (field: keyof NewCustomerData, value: string) => {
    setNewCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo al cambiar
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateNewCustomerForm = (): boolean => {
    const errors: Partial<Record<keyof NewCustomerData, string>> = {};

    if (!newCustomerData.fullName.trim()) {
      errors.fullName = 'El nombre completo es requerido';
    } else if (newCustomerData.fullName.trim().length < 3) {
      errors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!newCustomerData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-()]{8,}$/.test(newCustomerData.phone)) {
      errors.phone = 'Formato de teléfono inválido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    email,
    setEmail,
    isLoading,
    searchResult,
    error,
    setError,
    showResult,
    handleEmailSubmit,
    handleEditEmail,
    newCustomerData,
    handleFormChange,
    formErrors,
    validateNewCustomerForm
  };
};
