import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rigoBabyImg from '../assets/img/rigo-baby.jpg';
import useGlobalReducer from '../hooks/useGlobalReducer';

export default function ContactCards() {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const contacts = store.contacts || [];
  const [modalContactId, setModalContactId] = useState(null);
  const agendaSlug = "salem";

  useEffect(() => {
    fetchContacts();
  }, []);


  const fetchContacts = async () => {
    await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`)
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : data.contacts || [];
        dispatch({
          type: "setContacts",
          payload: arr.map(user => ({
            id: user.id,
            name: user.name,
            address: user.address || "",
            phone: user.phone || "",
            email: user.email || "",
            image: user.image || rigoBabyImg
          }))
        });
      });
  };

  const handleEdit = id => {
    navigate(`/EditContact/${id}`);
  };

  const handleDelete = async id => {
    await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${id}`, { method: "DELETE" });
    dispatch({ type: "deleteContact", payload: id });
    setModalContactId(null);
  };
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contacts</h2>
        <button 
          className="btn btn-success" 
          onClick={() => navigate('/EditContact')}
        >
          Add New Contact
        </button>
      </div>
      <ul className="list-unstyled">
        {contacts.map(contact => (
          <li key={contact.id} className="container row p-3 mb-3 border rounded">
            <div className="col-2">
              <img src={contact.image} alt={`${contact.name} profile`} className="img-fluid rounded-circle" />
            </div>
            <div className="col-8">
              <h1>{contact.name}</h1>
              <p>🏠 {contact.address}</p>
              <p>📞 {contact.phone}</p>
              <p>📧 {contact.email}</p>
            </div>
            <div className="col-2 gap-3 d-flex flex-column align-items-center justify-content-center">
              <button className="btn btn-outline-primary" onClick={() => handleEdit(contact.id)}>✏️</button>
              <button className="btn btn-outline-danger" onClick={() => setModalContactId(contact.id)}>🗑️</button>
              {modalContactId === contact.id && (
                <div className="modal show d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <p>Are you sure you want to delete this contact?</p>
                      <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}>Delete</button>
                      <button className="btn btn-secondary" onClick={() => setModalContactId(null)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}