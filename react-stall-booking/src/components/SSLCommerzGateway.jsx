import React, { useState } from 'react';
import { fmtBDT } from './Stall';

export default function SSLCommerzGateway({ amount, orderId, storeId, onSuccess, onFailure }) {
  const [method, setMethod] = useState('card'); // card | mobile | net
  const [subMethod, setSubMethod] = useState('visa'); // visa | mastercard | bkash | nagad
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (!otpStep) {
      if (!mobileNumber) return;
      setOtpStep(true);
    } else {
      if (!otp || !pin) return;
      onSuccess();
    }
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) return;
    onSuccess();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.wrapper}>
        {/* Sandbox Warning Header */}
        <div style={styles.warningHeader}>
          ⚠️ SSLCOMMERZ SANDBOX GATEWAY (TEST ENVIRONMENT)
        </div>

        {/* Info Bar */}
        <div style={styles.infoBar}>
          <div>
            <div style={styles.storeTitle}>FACD-CAB International Expo 2026</div>
            <div style={styles.storeMeta}>Merchant Store ID: <b>{storeId}</b></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={styles.amountLabel}>Amount to Pay</div>
            <div style={styles.amountVal}>{fmtBDT(amount)}</div>
          </div>
        </div>

        {/* Main Columns */}
        <div style={styles.container}>
          {/* Methods Sidebar */}
          <div style={styles.sidebar}>
            <div
              style={{ ...styles.sidebarTab, ...(method === 'card' ? styles.sidebarTabActive : {}) }}
              onClick={() => { setMethod('card'); setSubMethod('visa'); }}
            >
              💳 Cards (Credit/Debit)
            </div>
            <div
              style={{ ...styles.sidebarTab, ...(method === 'mobile' ? styles.sidebarTabActive : {}) }}
              onClick={() => { setMethod('mobile'); setSubMethod('bkash'); setOtpStep(false); }}
            >
              📱 Mobile Banking
            </div>
            <div
              style={{ ...styles.sidebarTab, ...(method === 'net' ? styles.sidebarTabActive : {}) }}
              onClick={() => { setMethod('net'); setSubMethod('islami'); }}
            >
              🏦 Internet Banking
            </div>

            <div style={styles.backLink} onClick={onFailure}>
              ← Cancel & Return to merchant
            </div>
          </div>

          {/* Form Pane */}
          <div style={styles.formPane}>
            {/* CARD FORM */}
            {method === 'card' && (
              <div>
                <div style={styles.tabHeading}>Select your card type:</div>
                <div style={styles.logoRow}>
                  {['visa', 'mastercard', 'amex'].map((c) => (
                    <div
                      key={c}
                      style={{ ...styles.logoBtn, ...(subMethod === c ? styles.logoBtnActive : {}) }}
                      onClick={() => setSubMethod(c)}
                    >
                      {c.toUpperCase()}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCardSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ ...styles.formGroup, flex: 1 }}>
                      <label style={styles.label}>Expiration Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={{ ...styles.formGroup, flex: 1 }}>
                      <label style={styles.label}>CVV/CVC</label>
                      <input
                        type="password"
                        required
                        placeholder="123"
                        maxLength="4"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Md. Karim Uddin"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.actionsRow}>
                    <button type="button" onClick={onFailure} style={styles.btnFail}>Simulate Failure</button>
                    <button type="submit" style={styles.btnSuccess}>Pay {fmtBDT(amount)}</button>
                  </div>
                </form>
              </div>
            )}

            {/* MOBILE BANKING FORM */}
            {method === 'mobile' && (
              <div>
                <div style={styles.tabHeading}>Select mobile wallet:</div>
                <div style={styles.logoRow}>
                  {['bkash', 'nagad', 'rocket'].map((w) => (
                    <div
                      key={w}
                      style={{ ...styles.logoBtn, ...(subMethod === w ? styles.logoBtnActive : {}) }}
                      onClick={() => { setSubMethod(w); setOtpStep(false); }}
                    >
                      {w === 'bkash' ? 'bKash' : w === 'nagad' ? 'Nagad' : 'Rocket'}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleMobileSubmit} style={styles.form}>
                  {!otpStep ? (
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Enter your {subMethod} Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="01XXXXXXXXX"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        style={styles.input}
                      />
                      <small style={styles.hint}>We will send a 6-digit OTP code to this number.</small>
                    </div>
                  ) : (
                    <div>
                      <div style={styles.otpMessage}>OTP code has been sent to <b>{mobileNumber}</b></div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ ...styles.formGroup, flex: 1 }}>
                          <label style={styles.label}>Enter 6-Digit OTP</label>
                          <input
                            type="text"
                            required
                            placeholder="123456"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            style={styles.input}
                          />
                        </div>
                        <div style={{ ...styles.formGroup, flex: 1 }}>
                          <label style={styles.label}>Wallet PIN</label>
                          <input
                            type="password"
                            required
                            placeholder="••••"
                            maxLength="5"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            style={styles.input}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={styles.actionsRow}>
                    <button type="button" onClick={onFailure} style={styles.btnFail}>Simulate Failure</button>
                    <button type="submit" style={styles.btnSuccess}>
                      {!otpStep ? 'Next (Receive OTP)' : `Confirm Payment of ${fmtBDT(amount)}`}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* NET BANKING FORM */}
            {method === 'net' && (
              <div>
                <div style={styles.tabHeading}>Select internet bank:</div>
                <div style={styles.logoRow}>
                  {['islami', 'city', 'dbbl'].map((b) => (
                    <div
                      key={b}
                      style={{ ...styles.logoBtn, ...(subMethod === b ? styles.logoBtnActive : {}) }}
                      onClick={() => setSubMethod(b)}
                    >
                      {b === 'islami' ? 'Islami Bank' : b === 'city' ? 'City Touch' : 'DBBL Net'}
                    </div>
                  ))}
                </div>

                <div style={styles.form}>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                    Clicking continue will redirect to the mock secure portal of <b>{subMethod === 'islami' ? 'Islami Bank Bangladesh PLC' : subMethod === 'city' ? 'City Touch Portal' : 'Dutch-Bangla Bank NetBanking'}</b> to authorize this transaction of <b>{fmtBDT(amount)}</b>.
                  </p>

                  <div style={styles.actionsRow}>
                    <button onClick={onFailure} style={styles.btnFail}>Cancel</button>
                    <button onClick={onSuccess} style={styles.btnSuccess}>Process Checkout</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div style={styles.gatewayFooter}>
          Secure Transaction Processing by <b>SSLCOMMERZ</b>. Sandbox active under merchant credentials.
        </div>
      </div>
    </div>
  );
}

// Inline styles for the custom mock SSLCommerz payment portal
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: '#eef2f6',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: "'Inter', sans-serif",
  },
  wrapper: {
    width: '100%',
    maxWidth: '750px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #d1d5db',
  },
  warningHeader: {
    background: '#ea580c',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '6px 12px',
    letterSpacing: '0.05em',
  },
  infoBar: {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
    background: '#f8fafc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e293b',
  },
  storeMeta: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px',
  },
  amountLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    color: '#64748b',
    fontWeight: '600',
    letterSpacing: '0.05em',
  },
  amountVal: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#155dfc',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    minHeight: '360px',
  },
  sidebar: {
    background: '#f1f5f9',
    borderRight: '1px solid #e2e8f0',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarTab: {
    padding: '14px 20px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  sidebarTabActive: {
    background: '#ffffff',
    color: '#155dfc',
    borderLeft: '4px solid #155dfc',
    paddingLeft: '16px',
  },
  backLink: {
    marginTop: 'auto',
    padding: '16px 20px',
    fontSize: '11px',
    color: '#ef4444',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'none',
  },
  formPane: {
    padding: '24px 32px',
  },
  tabHeading: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '12px',
  },
  logoRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
  },
  logoBtn: {
    padding: '8px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    background: '#f8fafc',
  },
  logoBtnActive: {
    borderColor: '#155dfc',
    background: '#eff6ff',
    color: '#155dfc',
    boxShadow: '0 0 0 2px rgba(21, 93, 252, 0.15)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#475569',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '13.5px',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  },
  hint: {
    fontSize: '11px',
    color: '#64748b',
  },
  otpMessage: {
    fontSize: '12.5px',
    color: '#0f766e',
    background: '#f0fdfa',
    padding: '8px 12px',
    borderRadius: '6px',
    marginBottom: '12px',
    border: '1px solid #ccfbf1',
  },
  actionsRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
  btnSuccess: {
    flex: 2,
    background: '#155dfc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(21, 93, 252, 0.15)',
  },
  btnFail: {
    flex: 1,
    background: '#ffffff',
    border: '1px solid #ef4444',
    color: '#ef4444',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  gatewayFooter: {
    background: '#f8fafc',
    padding: '14px 24px',
    borderTop: '1px solid #e5e7eb',
    fontSize: '11px',
    color: '#94a3b8',
    textAlign: 'center',
  },
};
