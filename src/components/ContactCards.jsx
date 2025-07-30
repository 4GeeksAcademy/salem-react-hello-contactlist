export default function ContactCards() {
  const cards = [
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St',
      phone: '555-1234',
      email: 'john@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Elm St',
      phone: '555-5678',
      email: 'jane@example.com'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      address: '789 Oak St',
      phone: '555-8765',
      email: 'bob@example.com'
    }
  ];
  return (
<ul >
  {cards.map(card => (
    <li key={card.id} className="container row p-3" >
      <div className="col-2 ">
        <img src="https://picsum.photos/150/150" alt="Contact" className="img-fluid rounded-circle" />
      </div>
      <div className="col-8">
        <h1>{card.name}</h1>
        <p>🏠 {card.address}</p>
        <p>📞 {card.phone}</p>
        <p>📧 {card.email}</p>
      </div>
      <div className="col-1 gap-3 d-flex flex-column align-items-center justify-content-center">
        <button className="btn btn-outline-primary">✏️ </button>
        <button className="btn btn-outline-danger">🗑️ </button>
      </div>
    </li>
  ))}
</ul>
  )
}