import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContact = ({ agendaSlug = "salem" }) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const contact = contactId ? store.contacts?.find(c => c.id === parseInt(contactId)) || {} : {};
  const [form, setForm] = useState({
    name: contact.name || "",
    address: contact.address || "",
    phone: contact.phone || "",
    email: contact.email || ""
  });

  useEffect(() => {
    // Update form when contact changes (for editing existing contacts)
    if (contact && contact.id) {
      setForm({
        name: contact.name || "",
        address: contact.address || "",
        phone: contact.phone || "",
        email: contact.email || ""
      });
    }
  }, [contact]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createAgendaIfNotExists = () => {
    return fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`)
      .then(res => {
        if (res.status === 404) {
          return fetch(`https://playground.4geeks.com/contact/agendas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: agendaSlug })
          });
        }
      })
      .catch(err => {
        console.error("Error checking/creating agenda:", err);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = contact.id ? "PUT" : "POST";
    const url = contact.id
      ? `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contact.id}`
      : `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`;

    const saveContact = () => {
      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, agenda_slug: agendaSlug })
      })
        .then(response => response.json().then(result => ({ response, result })))
        .then(({ response, result }) => {
          if (response.ok) {
            if (contact.id) {
              dispatch({ type: "updateContact", payload: result });
            } else {
              dispatch({ type: "addContact", payload: result });
            }
            alert(`${contact.id ? "Updated" : "Created"} contact: ${JSON.stringify(result)}`);
            navigate("/");
          } else {
            alert(result?.msg || "Error saving contact");
          }
        })
        .catch(error => {
          alert("Error saving contact");
          console.error(error);
        });
    };

    if (!contact.id) {
      createAgendaIfNotExists().then(saveContact);
    } else {
      saveContact();
    }
  };


  return (
    <div className="container flex-column align-items-center justify-content-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter name" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" className="form-control" id="address" name="address" value={form.address} onChange={handleChange} placeholder="Enter address" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number:</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
        </div>
        <button type="submit" className="btn btn-primary">{contact.id ? "Update" : "Create"} Contact</button>
        <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
      </form>
      <p className="mt-3">or</p>
      <Link to="/">
        <button className="btn btn-secondary">Back to Contacts</button>
      </Link>
    </div>
  );
};
