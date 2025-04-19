import styles from './Modal.module.css';

export default function Modal({ contact, onConfirm, onCancel, onClose, children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {children ? (
          <>
            {children}
            <div className={styles.buttonGroup}>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.title}>
              Are you sure you want to delete {contact.name}?
            </h2>
            <div className={styles.buttonGroup}>
              <button className={styles.confirmButton} onClick={onConfirm}>
                Yes
              </button>
              <button className={styles.cancelButton} onClick={onCancel}>
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}