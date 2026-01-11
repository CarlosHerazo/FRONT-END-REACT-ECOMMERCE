import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styles from './CreditCardForm.module.css';
import Icon from '../../../../shared/ui/Icon';

export interface CreditCardData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

interface CreditCardFormProps {
  onCardDataChange: (data: CreditCardData) => void;
  onValidityChange: (isValid: boolean) => void;
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({
  onCardDataChange,
  onValidityChange,
}) => {
  const [cardData, setCardData] = useState<CreditCardData>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [focused, setFocused] = useState<'number' | 'name' | 'expiry' | 'cvc' | undefined>();
  const [errors, setErrors] = useState<Partial<Record<keyof CreditCardData, string>>>({});

  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
  };

  const validateExpiry = (expiry: string): boolean => {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;

    const month = parseInt(match[1], 10);
    const year = parseInt(`20${match[2]}`, 10);
    const now = new Date();
    const expiryDate = new Date(year, month - 1);

    return month >= 1 && month <= 12 && expiryDate > now;
  };

  const validateCVC = (cvc: string): boolean => {
    return cvc.length === 3 && /^\d+$/.test(cvc);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 3;
  };

  const validateForm = (data: CreditCardData): boolean => {
    const newErrors: Partial<Record<keyof CreditCardData, string>> = {};

    if (!validateCardNumber(data.number)) {
      newErrors.number = 'Invalid card number';
    }
    if (!validateName(data.name)) {
      newErrors.name = 'Cardholder name required';
    }
    if (!validateExpiry(data.expiry)) {
      newErrors.expiry = 'Invalid expiry date';
    }
    if (!validateCVC(data.cvc)) {
      newErrors.cvc = 'Invalid CVC';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidityChange(isValid);
    return isValid;
  };

  const handleInputChange = (field: keyof CreditCardData, value: string) => {
    let formattedValue = value;

    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.replace(/\s/g, '').length > 16) return;
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      if (formattedValue.length > 5) return;
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    } else if (field === 'name') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    const newCardData = { ...cardData, [field]: formattedValue };
    setCardData(newCardData);
    onCardDataChange(newCardData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }

    // Validate on blur
    if (formattedValue) {
      validateForm(newCardData);
    }
  };

  const handleBlur = () => {
    validateForm(cardData);
  };

  return (
    <div className={styles.creditCardForm}>
      <div className={styles.cardPreview}>
        <Cards
          number={cardData.number}
          name={cardData.name}
          expiry={cardData.expiry}
          cvc={cardData.cvc}
          focused={focused}
        />
      </div>

      <div className={styles.formFields}>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber" className={styles.formLabel}>
            Card Number <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Icon name="credit_card" className={styles.inputIcon} />
            <input
              id="cardNumber"
              type="text"
              value={cardData.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              onFocus={() => setFocused('number')}
              onBlur={handleBlur}
              placeholder="1234 5678 9012 3456"
              className={`${styles.formInput} ${errors.number ? styles.inputError : ''}`}
            />
          </div>
          {errors.number && (
            <span className={styles.fieldError}>
              <Icon name="error" />
              {errors.number}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cardName" className={styles.formLabel}>
            Cardholder Name <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <Icon name="person" className={styles.inputIcon} />
            <input
              id="cardName"
              type="text"
              value={cardData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onFocus={() => setFocused('name')}
              onBlur={handleBlur}
              placeholder="JOHN DOE"
              className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
            />
          </div>
          {errors.name && (
            <span className={styles.fieldError}>
              <Icon name="error" />
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="cardExpiry" className={styles.formLabel}>
              Expiry Date <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="calendar_today" className={styles.inputIcon} />
              <input
                id="cardExpiry"
                type="text"
                value={cardData.expiry}
                onChange={(e) => handleInputChange('expiry', e.target.value)}
                onFocus={() => setFocused('expiry')}
                onBlur={handleBlur}
                placeholder="MM/YY"
                className={`${styles.formInput} ${errors.expiry ? styles.inputError : ''}`}
              />
            </div>
            {errors.expiry && (
              <span className={styles.fieldError}>
                <Icon name="error" />
                {errors.expiry}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cardCvc" className={styles.formLabel}>
              CVC <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Icon name="lock" className={styles.inputIcon} />
              <input
                id="cardCvc"
                type="text"
                value={cardData.cvc}
                onChange={(e) => handleInputChange('cvc', e.target.value)}
                onFocus={() => setFocused('cvc')}
                onBlur={handleBlur}
                placeholder="123"
                className={`${styles.formInput} ${errors.cvc ? styles.inputError : ''}`}
              />
            </div>
            {errors.cvc && (
              <span className={styles.fieldError}>
                <Icon name="error" />
                {errors.cvc}
              </span>
            )}
          </div>
        </div>

        <div className={styles.securityNote}>
          <Icon name="shield" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};
