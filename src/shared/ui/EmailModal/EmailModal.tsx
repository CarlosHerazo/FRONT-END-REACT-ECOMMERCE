import React from 'react';
import type { EmailModalProps } from './types';
import styles from './EmailModal.module.css'; // Importa los estilos como módulo
import Icon from '../Icon';
import { useEmailModal } from './useEmailModal';

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onEmailSubmit
}) => {
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
    validateNewCustomerForm
  } = useEmailModal(isOpen);

  const handleContinue = () => {
    if (searchResult) {
      if (searchResult.isExisting) {
        // Cliente existente
        onEmailSubmit(searchResult.email, true);
        onClose();
      } else {
        // Nuevo cliente - validar formulario
        if (validateNewCustomerForm()) {
          onEmailSubmit(searchResult.email, false, newCustomerData);
          onClose();
        }
      }
    }
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
                  <div className={`${styles.resultIcon} ${styles.info}`}>
                    <Icon name="person_add" />
                  </div>
                  <h3 className={styles.resultTitle}>New Customer</h3>
                  <p className={styles.resultSubtitle}>
                    We couldn't find an account with this email.
                  </p>
                  
                  <div className={styles.newCustomerCard}>
                    <div className={styles.customerEmailDisplay}>
                      <Icon name="mail" />
                      <span>{searchResult?.email}</span>
                    </div>
                    
                    <div className={styles.welcomeMessage}>
                      <p className={styles.welcomeTitle}>Welcome to ShopModern!</p>
                      <p className={styles.welcomeText}>
                        Continue as a guest or create an account to enjoy exclusive benefits.
                      </p>
                    </div>
                    
                    <div className={styles.newCustomerBenefits}>
                      <h4 className={styles.benefitsTitle}>Create an account to get:</h4>
                      <ul className={styles.benefitsList}>
                        <li>Faster checkout</li>
                        <li>Order tracking</li>
                        <li>Wishlist access</li>
                        <li>Special offers</li>
                      </ul>
                    </div>
                  </div>
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
              >
                {searchResult?.isExisting ? (
                  <>
                    <Icon name="login" />
                    Continue as {searchResult.name?.split(' ')[0]}
                  </>
                ) : (
                  <>
                    <Icon name="shopping_cart" />
                    Continue as Guest
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailModal;