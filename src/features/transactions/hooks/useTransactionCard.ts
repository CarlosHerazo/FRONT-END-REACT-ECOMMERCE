import { useMemo } from 'react';

export const useTransactionCard = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amountInCents: string, currency: string) => {
    const amount = parseInt(amountInCents) / 100;

    // Mapear códigos de país a códigos de moneda si es necesario
    const currencyMap: Record<string, string> = {
      'CO': 'COP',
      'US': 'USD',
      'MX': 'MXN',
      'ES': 'EUR'
    };

    // Si el currency es un código de país (2 letras), convertirlo
    const currencyCode = currency.length === 2
      ? (currencyMap[currency.toUpperCase()] || 'COP')
      : currency.toUpperCase();

    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
      }).format(amount);
    } catch (error) {
      // Si falla, mostrar el formato manual
      return `${currencyCode} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'approved' || statusLower === 'success') return 'success';
    if (statusLower === 'pending') return 'warning';
    if (statusLower === 'declined' || statusLower === 'failed') return 'error';
    return 'default';
  };

  return useMemo(
    () => ({
      formatDate,
      formatAmount,
      getStatusColor
    }),
    []
  );
};
