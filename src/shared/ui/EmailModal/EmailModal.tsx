import React from 'react';
import type { EmailModalProps } from './types';
import styles from './EmailModal.module.css'; // Importa los estilos como módulo
import Icon from '../Icon';
import { useEmailModal } from './useEmailModal';
import { useNavigate } from 'react-router-dom';

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onEmailSubmit
}) => {
  const navigate = useNavigate();
  const {
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
    validateNewCustomerForm,
    creationStatus,
    setCreationStatus,
    creationError,
    setCreationError
  } = useEmailModal(isOpen);

  const handleContinue = async () => {
    if (searchResult) {
      if (searchResult.isExisting) {
        // navegar al checkout como cliente existente
        await onEmailSubmit(searchResult.email, true);
        onClose();
      } else {
        // Nuevo cliente - validar formulario primero
        if (validateNewCustomerForm()) {
          setCreationStatus('creating');

          try {
            // Intentar crear el cliente
            await onEmailSubmit(searchResult.email, false, newCustomerData);
            setCreationStatus('success');
          } catch (error) {
            setCreationStatus('error');
            setCreationError(error instanceof Error ? error.message : 'Error al crear el cliente');
          }
        }
      }
    }
  };

  const handleProceedToCheckout = () => {
    // Cerrar modal y proceder al checkout
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.emailModalBackdrop} 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="email-modal-title"
    >
      <div className={styles.emailModalContainer}>
        {/* Modal Header */}
        <div className={styles.emailModalHeader}>
          <h2 id="email-modal-title" className={styles.emailModalTitle}>
            {showResult ? 'Customer Found' : 'Find Your Account'}
          </h2>
          
          <button 
            className={styles.emailModalCloseBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.emailModalBody}>
          {!showResult ? (
            <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
              <div className={styles.formIntro}>
                <div className={styles.formIcon}>
                  <Icon name="mail" />
                </div>
                <h3 className={styles.formTitle}>Enter Your Email Address</h3>
                <p className={styles.formDescription}>
                  We'll check if you're an existing customer to personalize your experience.
                </p>
              </div>

              <div className={styles.emailInputGroup}>
                <label htmlFor="customer-email" className={styles.inputLabel}>
                  Email Address
                </label>
                <div className={styles.inputWrapper}>
                  <Icon name="mail" className={styles.inputIcon} />
                  <input
                    id="customer-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="you@example.com"
                    className={styles.emailInput}
                    autoFocus
                    required
                  />
                </div>
                
                {error && (
                  <div className={styles.errorMessage}>
                    <Icon name="error" />
                    {error}
                  </div>
                )}
              </div>

              <div className={styles.privacyNote}>
                <Icon name="lock" />
                <span>Your email is safe with us. We don't spam.</span>
              </div>
            </form>
          ) : (
            <div className={styles.searchResult}>
              {searchResult?.isExisting ? (
                <div className={styles.existingCustomer}>
                  <div className={`${styles.resultIcon} ${styles.success}`}>
                    <Icon name="verified_user" />
                  </div>
                  <h3 className={styles.resultTitle}>Welcome Back!</h3>
                  <p className={styles.resultSubtitle}>
                    We found your account in our system.
                  </p>
                  
                  <div className={styles.customerDetails}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Name:</span>
                      <span className={styles.detailValue}>{searchResult.name}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Email:</span>
                      <span className={`${styles.detailValue} ${styles.emailValue}`}>{searchResult.email}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Member Since:</span>
                      <span className={styles.detailValue}>{searchResult.joinDate}</span>
                    </div>
                    <div className={styles.membershipBadge}>
                      <Icon name="workspace_premium" className={styles.badgeIcon} />
                      <span className={styles.badgeText}>{searchResult.membershipLevel?.toUpperCase()} Member</span>
                    </div>
                  </div>
                  
                  <div className={styles.benefitsList}>
                    <div className={styles.benefitItem}>
                      <Icon name="check_circle" />
                      <span>Exclusive member pricing</span>
                    </div>
                    <div className={styles.benefitItem}>
                      <Icon name="check_circle" />
                      <span>Free shipping</span>
                    </div>
                    <div className={styles.benefitItem}>
                      <Icon name="check_circle" />
                      <span>Priority support</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.newCustomer}>
                  {creationStatus === 'success' ? (
                    // Vista de éxito
                    <>
                      <div className={`${styles.resultIcon} ${styles.success}`}>
                        <Icon name="check_circle" />
                      </div>
                      <h3 className={styles.resultTitle}>Registration Successful!</h3>
                      <p className={styles.resultSubtitle}>
                        Your account has been created successfully.
                      </p>

                      <div className={styles.customerDetails}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Name:</span>
                          <span className={styles.detailValue}>{newCustomerData.fullName}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Email:</span>
                          <span className={`${styles.detailValue} ${styles.emailValue}`}>{searchResult?.email}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Phone:</span>
                          <span className={styles.detailValue}>{newCustomerData.phone}</span>
                        </div>
                      </div>
                    </>
                  ) : creationStatus === 'error' ? (
                    // Vista de error
                    <>
                      <div className={`${styles.resultIcon} ${styles.error}`}>
                        <Icon name="error" />
                      </div>
                      <h3 className={styles.resultTitle}>Registration Failed</h3>
                      <p className={styles.resultSubtitle}>
                        {creationError || 'There was an error creating your account. Please try again.'}
                      </p>
                    </>
                  ) : (
                    // Formulario de registro
                    <>
                      <div className={`${styles.resultIcon} ${styles.info}`}>
                        <Icon name="person_add" />
                      </div>
                      <h3 className={styles.resultTitle}>New Customer</h3>
                      <p className={styles.resultSubtitle}>
                        Please complete your information to continue.
                      </p>

                      <form className={styles.newCustomerForm}>
                    <div className={styles.customerEmailDisplay}>
                      <Icon name="mail" />
                      <span>{searchResult?.email}</span>
                    </div>

                    {/* Nombre Completo */}
                    <div className={styles.formGroup}>
                      <label htmlFor="fullName" className={styles.formLabel}>
                        Full Name <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <Icon name="person" className={styles.inputIcon} />
                        <input
                          id="fullName"
                          type="text"
                          value={newCustomerData.fullName}
                          onChange={(e) => handleFormChange('fullName', e.target.value)}
                          placeholder="John Doe"
                          className={`${styles.formInput} ${formErrors.fullName ? styles.inputError : ''}`}
                        />
                      </div>
                      {formErrors.fullName && (
                        <span className={styles.fieldError}>
                          <Icon name="error" />
                          {formErrors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Phone <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <Icon name="phone" className={styles.inputIcon} />
                        <input
                          id="phone"
                          type="tel"
                          value={newCustomerData.phone}
                          onChange={(e) => handleFormChange('phone', e.target.value)}
                          placeholder="+1 234 567 8900"
                          className={`${styles.formInput} ${formErrors.phone ? styles.inputError : ''}`}
                        />
                      </div>
                      {formErrors.phone && (
                        <span className={styles.fieldError}>
                          <Icon name="error" />
                          {formErrors.phone}
                        </span>
                      )}
                    </div>

                    {/* Dirección */}
                    <div className={styles.formGroup}>
                      <label htmlFor="address" className={styles.formLabel}>
                        Address <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <Icon name="home" className={styles.inputIcon} />
                        <input
                          id="address"
                          type="text"
                          value={newCustomerData.address}
                          onChange={(e) => handleFormChange('address', e.target.value)}
                          placeholder="123 Main Street"
                          className={`${styles.formInput} ${formErrors.address ? styles.inputError : ''}`}
                        />
                      </div>
                      {formErrors.address && (
                        <span className={styles.fieldError}>
                          <Icon name="error" />
                          {formErrors.address}
                        </span>
                      )}
                    </div>

                    {/* Ciudad y País en dos columnas */}
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="city" className={styles.formLabel}>
                          City <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <Icon name="location_city" className={styles.inputIcon} />
                          <input
                            id="city"
                            type="text"
                            value={newCustomerData.city}
                            onChange={(e) => handleFormChange('city', e.target.value)}
                            placeholder="New York"
                            className={`${styles.formInput} ${formErrors.city ? styles.inputError : ''}`}
                          />
                        </div>
                        {formErrors.city && (
                          <span className={styles.fieldError}>
                            <Icon name="error" />
                            {formErrors.city}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="country" className={styles.formLabel}>
                          Country <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWrapper}>
                          <Icon name="public" className={styles.inputIcon} />
                          <select
                            id="country"
                            value={newCustomerData.country}
                            onChange={(e) => handleFormChange('country', e.target.value)}
                            className={`${styles.formInput} ${styles.formSelect} ${formErrors.country ? styles.inputError : ''}`}
                          >
                            <option value="CO">Colombia</option>
                            <option value="US">United States</option>
                            <option value="MX">Mexico</option>
                            <option value="ES">Spain</option>
                          </select>
                        </div>
                        {formErrors.country && (
                          <span className={styles.fieldError}>
                            <Icon name="error" />
                            {formErrors.country}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Código Postal */}
                    <div className={styles.formGroup}>
                      <label htmlFor="postalCode" className={styles.formLabel}>
                        Postal Code <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.inputWrapper}>
                        <Icon name="markunread_mailbox" className={styles.inputIcon} />
                        <input
                          id="postalCode"
                          type="text"
                          value={newCustomerData.postalCode}
                          onChange={(e) => handleFormChange('postalCode', e.target.value)}
                          placeholder="10001"
                          className={`${styles.formInput} ${formErrors.postalCode ? styles.inputError : ''}`}
                        />
                      </div>
                      {formErrors.postalCode && (
                        <span className={styles.fieldError}>
                          <Icon name="error" />
                          {formErrors.postalCode}
                        </span>
                      )}
                    </div>
                  </form>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.emailModalFooter}>
          {!showResult ? (
            <>
              <button 
                className={styles.modalSecondaryBtn}
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <button 
                className={`${styles.modalPrimaryBtn} ${isLoading ? styles.loading : ''}`}
                onClick={handleEmailSubmit}
                disabled={isLoading || !email}
                type="button"
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <Icon name="search" />
                    Search Account
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {creationStatus === 'success' ? (
                // Botón de proceder al pago cuando la creación es exitosa
                <button
                  className={styles.modalPrimaryBtn}
                  onClick={handleProceedToCheckout}
                  type="button"
                >
                  <Icon name="shopping_cart" />
                  Proceed to Checkout
                </button>
              ) : creationStatus === 'error' ? (
                // Botones cuando hay error
                <>
                  <button
                    className={styles.modalSecondaryBtn}
                    onClick={() => setCreationStatus('idle')}
                    type="button"
                  >
                    <Icon name="arrow_back" />
                    Try Again
                  </button>
                  <button
                    className={styles.modalSecondaryBtn}
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                // Botones normales
                <>
                  <button
                    className={styles.modalSecondaryBtn}
                    onClick={handleEditEmail}
                    type="button"
                  >
                    <Icon name="edit" />
                    Edit Email
                  </button>
                  <button
                    className={styles.modalPrimaryBtn}
                    onClick={handleContinue}
                    type="button"
                    disabled={creationStatus === 'creating'}
                  >
                    {searchResult?.isExisting ? (
                      <>
                        <Icon name="login" />
                        Continue as {searchResult.name?.split(' ')[0]}
                      </>
                    ) : creationStatus === 'creating' ? (
                      <>
                        <span className={styles.spinner}></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Icon name="check_circle" />
                        Complete Registration
                      </>
                    )}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailModal;