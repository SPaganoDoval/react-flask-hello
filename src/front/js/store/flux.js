/*const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null,

		},
		actions: {
			
			register: async (email, password, name, last_name, numero_telefono, nombre_contacto_emergencia, numero_contacto_emergencia, asistencia_medica) => {
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password,
						name: name,
						last_name: last_name,
						numero_telefono: numero_telefono,
						nombre_contacto_emergencia: nombre_contacto_emergencia,
						numero_contacto_emergencia: numero_contacto_emergencia,
						asistencia_medica: asistencia_medica,


					})
				};
				try {
					const resp = await fetch(`${BACKEND_URL}/api/register-participante`, requestOptions)
					if (resp.status != 200) {
						alert("An error has occurred while creating the user");
						return false;
					}
					const data = await resp.json();
					console.log(data);

					return true;
				}
				catch (error) {
					console.error("There has been an error creating a user")
				}
			},

			login: async (email, password) => {

				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				try {
					const resp = await fetch(`${BACKEND_URL}/api/login`, requestOptions)
				
					if (resp.status != 200) {
						console.log("An error has occurred");
						return false;
					}
					const data = await resp.json();
					const userId = { id: data.id }
					console.log(data)
					localStorage.setItem("userId", JSON.stringify(userId))
					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })

					return true;
				}
				catch (error) {
					console.error("There has been an error login in")
				}
			},
			synctoken: () => {
				const token = localStorage.getItem("token");
				console.log("App just loaded, synching the local storage");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},
			logout: () => {
				const token = localStorage.removeItem("token");
				setStore({ token: null });
			},





			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState; */

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            name: "",
            email: "",
            token: "",
            message: null,
            demo: [{
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            createUser: async (name, email, password) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                    }),
                };

                try {
                    const resp = await fetch(
                        "https://3001-divrobles-sistemadeaute-cwi81tn8rme.ws-eu51.gitpod.io/api/user",
                        options
                    );

                    if (resp.status !== 200) {
                        let data = await resp.json();
                        alert(data.msg);
                        return false;
                    }

                    const data = await resp.json();
                    alert(data.msg);
                    return true; // Devuelve true para que se ejecute la acción que llamamos en Login
                } catch (error) {
                    console.error("error");
                    console.log(error);
                }
            },

            login: async (email, password) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                };

                try {
                    const resp = await fetch(
                        "https://3001-divrobles-sistemadeaute-cwi81tn8rme.ws-eu51.gitpod.io/api/login",
                        options
                    );

                    if (resp.status !== 200) {
                        const data = await resp.json();
                        alert(data.msg);
                    }

                    const data = await resp.json();
                    localStorage.setItem("token", data.access_token.token); // accedemos a la key acces_token de data
                    setStore({
                        token: data.access_token.token,
                        name: data.access_token.name,
                        email: data.access_token.email,
                    });
                    return true; // Devuelve true para que se ejecute la acción que llamamos en Login
                } catch (error) {
                    console.log(error);
                }
            },

            syncToken: () => {
                const token = localStorage.getItem("token");
                if (token && token != "" && token != undefined)
                    setStore({
                        token: token,
                    });
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({
                        message: data.message,
                    });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({
                    demo: demo,
                });
            },
        },
    };
};

export default getState;
