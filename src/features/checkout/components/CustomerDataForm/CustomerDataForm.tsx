import React, { useState, useEffect } from 'react';
import styles from './CustomerDataForm.module.css';
import Icon from '../../../../shared/ui/Icon';

export interface CustomerData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
}

interface CustomerDataFormProps {
  initialData?: Partial<CustomerData>;
  onDataChange: (data: CustomerData) => void;
  onValidityChange: (isValid: boolean) => void;
}

export const CustomerDataForm: React.FC<CustomerDataFormProps> = ({
  initialData = {},
  onDataChange,
  onValidityChange,
}) => {
  const [formData, setFormData] = useState<CustomerData>({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    address: initialData.address || '',
    city: initialData.city || '',
    region: initialData.region || '',
    country: initialData.country || 'CO',
    postalCode: initialData.postalCode || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});

  // Validate form when initial data is loaded
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      validateForm(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateForm = (data: CustomerData): boolean => {
    const newErrors: Partial<Record<keyof CustomerData, string>> = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }
    if (!validateEmail(data.email)) {
      newErrors.email = 'Dirección de correo inválida';
    }
    if (!validatePhone(data.phone)) {
      newErrors.phone = 'Número de teléfono inválido';
    }
    if (!data.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    if (!data.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }
    if (!data.region.trim()) {
      newErrors.region = 'La región es requerida';
    }
    if (!data.country.trim()) {
      newErrors.country = 'El país es requerido';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidityChange(isValid);
    return isValid;
  };

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    onDataChange(newFormData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }

    // Validate on change
    validateForm(newFormData);
  };

  return (
    <div className={styles.customerDataForm}>
      <h3 className={styles.formTitle}>Información de Envío</h3>

      <div className={styles.formFields}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.formLabel}>
            Nombre Completo <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Icon name="person" className={styles.inputIcon} />
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Juan Perez"
              className={`${styles.formInput} ${errors.fullName ? styles.inputError : ''}`}
            />
          </div>
          {errors.fullName && (
            <span className={styles.fieldError}>
              <Icon name="error" />
              {errors.fullName}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Correo Electrónico <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="mail" className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="juan@example.com"
                className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
              />
            </div>
            {errors.email && (
              <span className={styles.fieldError}>
                <Icon name="error" />
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>
              Teléfono <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="phone" className={styles.inputIcon} />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+57 300 123 4567"
                className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
              />
            </div>
            {errors.phone && (
              <span className={styles.fieldError}>
                <Icon name="error" />
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.formLabel}>
            Dirección <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Icon name="home" className={styles.inputIcon} />
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Calle 123 #45-67"
              className={`${styles.formInput} ${errors.address ? styles.inputError : ''}`}
            />
          </div>
          {errors.address && (
            <span className={styles.fieldError}>
              <Icon name="error" />
              {errors.address}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city" className={styles.formLabel}>
              Ciudad <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="location_city" className={styles.inputIcon} />
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Bogotá"
                className={`${styles.formInput} ${errors.city ? styles.inputError : ''}`}
              />
            </div>
            {errors.city && (
              <span className={styles.fieldError}>
                <Icon name="error" />
                {errors.city}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="region" className={styles.formLabel}>
              Región <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="map" className={styles.inputIcon} />
              <input
                id="region"
                type="text"
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                placeholder="Cundinamarca"
                className={`${styles.formInput} ${errors.region ? styles.inputError : ''}`}
              />
            </div>
            {errors.region && (
              <span className={styles.fieldError}>
                <Icon name="error" />
                {errors.region}
              </span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="country" className={styles.formLabel}>
              País <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="public" className={styles.inputIcon} />
              <select
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className={`${styles.formInput} ${styles.formSelect} ${errors.country ? styles.inputError : ''}`}
              >
                <option value="CO">Colombia</option>
                <option value="US">United States</option>
                <option value="MX">Mexico</option>
                <option value="ES">Spain</option>
              </select>
            </div>
            {errors.country && (
              <span className={styles.fieldError}>
                <Icon name="error" />
                {errors.country}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="postalCode" className={styles.formLabel}>
              Código Postal
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="markunread_mailbox" className={styles.inputIcon} />
              <input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="110111"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
