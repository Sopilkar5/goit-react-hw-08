import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import { deleteContact } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
import EditContactForm from '../EditContactForm/EditContactForm';
import { useState } from 'react';
import { FaUser, FaPhone } from 'react-icons/fa';
import styles from './ContactList.module.css';
import toast from 'react-hot-toast';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contactToEdit, setContactToEdit] = useState(null);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(contactToDelete.id))
      .unwrap()
      .then(() => {
        toast.success('Contact deleted successfully!');
      })
      .catch(() => {
        toast.error('Failed to delete contact.');
      });
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };

  const handleEditClick = (contact) => {
    setContactToEdit(contact);
    setIsEditModalOpen(true);
  };

  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li key={contact.id} className={styles.item}>
          <div className={styles.contactInfo}>
            <p className={styles.contactRow}>
              <FaUser className={styles.icon} />
              <span className={styles.contactName}>{contact.name}</span>
            </p>
            <p className={styles.contactRow}>
              <FaPhone className={styles.icon} />
              <span className={styles.contactNumber}>{contact.number}</span>
            </p>
          </div>
          <div className={styles.buttonGroup}>
            <button
              className={styles.editButton}
              onClick={() => handleEditClick(contact)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteClick(contact)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
      {isDeleteModalOpen && (
        <Modal
          contact={contactToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <Modal
          contact={contactToEdit}
          onClose={() => setIsEditModalOpen(false)}
        >
          <EditContactForm
            contact={contactToEdit}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </ul>
  );
}