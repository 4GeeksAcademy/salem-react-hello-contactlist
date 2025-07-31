export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "setContacts":
      return {
        ...store,
        contacts: action.payload,
      };
    case "addContact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };
    case "updateContact":
      return {
        ...store,
        contacts: store.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "deleteContact":
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== action.payload),
      };
  }
}
