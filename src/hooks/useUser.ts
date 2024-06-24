import { useEffect, useReducer } from "react";

const initialState = {
	users: [],
	filter: "",
	filteredUsers: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_USERS":
			return { ...state, users: action.payload, filteredUsers: action.payload };
		case "SET_FILTER":
			return {
				...state,
				filter: action.payload,
				filteredUsers: state.users.filter((user) =>
					user.role.toLowerCase().includes(action.payload.toLowerCase()),
				),
			};
		default:
			return state;
	}
};

export const useUsers = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch("https://dummyjson.com/users")
			.then((response) => response.json())
			.then((data) => dispatch({ type: "SET_USERS", payload: data.users }))
			.catch((error) => console.log(error));
	}, []);

	const setFilter = (filter) => {
		dispatch({ type: "SET_FILTER", payload: filter });
	};

	return {
		users: state.filteredUsers,
		filter: state.filter,
		setFilter,
	};
};
