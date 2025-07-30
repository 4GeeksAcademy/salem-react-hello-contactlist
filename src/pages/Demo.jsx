// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  // const { store, dispatch } = useGlobalReducer()

  return (
    // <div className="container">
    //   <ul className="list-group">
    //     {store && store.todos?.map((item) => {
    //       return (
    //         <li
    //           key={item.id}  // React key for list items.
    //           className="list-group-item d-flex justify-content-between"
    //           style={{ background: item.background }}> 
              
    //           {/* Link to the detail page of this todo. */}
    //           <Link to={"/single/" + item.id}>this wehere we link the store thing {item.title} </Link>
    //           <button className="btn btn-success"
    //             onClick={() => dispatch({
    //               type: "add_task", 
    //               payload: { id: item.id, color: '#ffa500' }
    //             })}>
    //             Change Color
    //           </button>
    //         </li>
    //       );
    //     })}
    //   </ul>
    //   <br />

    //   <Link to="/">
    //     <button className="btn btn-primary">or get back to contacts</button>
    //   </Link>
    // </div>
    

<div className="container flex-column align-items-center justify-content-center">
  <form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name:</label>
      <input type="text" className="form-control" id="name" placeholder="Enter name" />
    </div>
    <div className="mb-3">
      <label htmlFor="address" className="form-label">Address:</label>
      <input type="text" className="form-control" id="address" placeholder="Enter address" />
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="form-label">Phone Number:</label>
      <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <input type="email" className="form-control" id="email" placeholder="Enter email" />
    </div>
    <Link to="/demo">
      <button type="submit" className="btn btn-primary">Submit:</button>
    </Link>
  </form>
  <p className="mt-3">or</p>
  <Link to="/">
    <button className="btn btn-secondary">Back to Contacts</button>
  </Link>
</div>

  );
};
