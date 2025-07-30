import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import  ContactCards  from "../components/ContactCards.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="container flex-column align-items-center justify-content-center">

<ContactCards />

		</div>
	);
}; 