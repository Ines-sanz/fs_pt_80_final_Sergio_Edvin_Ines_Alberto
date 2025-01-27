import { React } from "react";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      url: `${process.env.BACKEND_URL}`,
      consolas: [],
      videojuegos: [],
      accesorios: [],
      subscriptions: [],
      selectedProduct: null,
      promoted: [],
      isLogged: localStorage.getItem("Token") ? true : false,
      Token: localStorage.getItem("Token") || null,
      user: JSON.parse(localStorage.getItem("user")) || "",
      shoppingCart: [],
      users: [],
    
    },
    actions: {

      login: async (formData1) => {
        const actions = getActions();
        try {
            const url = `${process.env.BACKEND_URL}/api/login`;
            console.log("URL final:", url);
            console.log("Datos enviados al servidor:", formData1);
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData1),
            });
    
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
    
            if (response.ok) {
                alert("Inicio de sesión exitoso");
                localStorage.setItem("Token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user)); 
                setStore({ isLogged: true, Token: data.token, user: data.user });

                await actions.userShoppingCart()
            } else {
                alert(data.msg || "Error en el inicio de sesión");
            }
        } catch (error) {
          console.error("Error al conectar con el servidor:", error);
          alert("Error al conectar con el servidor");
        }
      },

      register: async (formData) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              formData
            ),
          });

          const data = await response.json();

          if (response.ok) {
            // Registro exitoso
            alert("Registro exitoso. Bienvenido!");
            console.log("Token:", data.token);
            console.log("Usuario:", data.user);
            localStorage.setItem("Token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setStore({ isLogged: true, Token: data.token, user: data.user })
          } else {
            // Error en el registro
            alert(data.msg || "Error durante el registro");
          }
        } catch (error) {
          alert("Error al conectar con el servidor");
          console.error(error);
        }
      },

      isLogged: async () => {
        try {
          const store = getStore();

          if (store.Token) {
            setStore({
              isLogged: true,
              user: JSON.parse(localStorage.getItem("user")),
            });
            await getActions().userShoppingCart();
          }
        }
        catch (error) {
          console.error("Error loading data:", error);
        }
      },

      userShoppingCart: async () => {
        const store = getStore();
        const url = `${store.url}/api/shopping-cart`; 
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${store.Token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setStore({ shoppingCart: data.shopping_cart_products }); 
            } else {
                console.error("Error al obtener el carrito de compras:", response.status);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
        }
      },
      loadInfo: async () => {
        try {
          const store = getStore();
          const url = `${store.url}/api/products`;
          const response = await fetch(url);
          const data = await response.json();

          const consolas = data.filter((item) => item.category === "consolas");
          const videojuegos = data.filter(
            (item) => item.category === "videojuegos"
          );
          const accesorios = data.filter(
            (item) => item.category === "accesorios"
          );
          const promoted = data.filter(
            (item) => item.promoted === true
          );

          const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

          setStore({
            consolas: shuffleArray(consolas),
            videojuegos: shuffleArray(videojuegos),
            accesorios: shuffleArray(accesorios),
            promoted: shuffleArray(promoted)
          });
        } catch (error) {
          console.error("Error loading data:", error);
        }
      },
      getProductById: async (id) => {
        try {
          const store = getStore();
          const response = await fetch(`${store.url}/api/product/${id}`);
          if (response.ok) {
            const data = await response.json();
            return data[0];
          } else {
            console.error("Error al obtener el producto:", response.statusText);
            return null;
          }
        } catch (error) {
          console.error("Error al conectar con el servidor:", error);
          return null;
        }
      },
      toggleFav: async (newFav) => {
        const store = getStore();
        if (!store.Token) {
          alert("Debes iniciar sesión para añadir favoritos.");
          return;
        }
        console.log("Datos enviados a favoritos:", newFav);

        try {
            const response = await fetch(`${store.url}/api/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: store.Token ? `Bearer ${store.Token}` : "",
                },
                body: JSON.stringify(newFav),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("Respuesta del servidor:", data);
                const updatedFavorites = data.updatedFavorites || [];
                const user = { ...store.user, favorites: updatedFavorites };
                setStore({ user });
            } else {
                alert(data.msg || "Error al manejar favoritos");
                console.error("Error del servidor:", data);
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
            console.error("Error de red:", error);
        }
      },
      toggleCart: async (newShoppingItem) => {
        const store = getStore();
        const actions = getActions();
        console.log("Datos enviados al carrito:", newShoppingItem);
        try {
          const response = await fetch(`${store.url}/api/shopping_cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.Token}`,
            },
            body: JSON.stringify(newShoppingItem),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("Respuesta del servidor:", data);
            const updatedUserShopping = data.updatedCart || [];
            const user = { ...store.user, shoppingCart: updatedUserShopping }
            setStore({ user });
            await actions.userShoppingCart()


          } else {
            alert(data.msg || "Error al manejar el carrito de compras");
          }
        } catch (error) {
          alert("Error al conectar con el servidor");
          console.error(error);
        }
      },

      getAllReviews: async () => {
        const store = getStore();
        const actions = getActions();

        try {
          const response = await fetch(`${store.url}/api/reviews`, {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();
            const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
            setStore({ reviews: shuffleArray(data) });
          } else {
            console.error("Error al cargar las reseñas:", error);
          }
        } catch (error) {
          console.error("Error al cargar las reseñas:", error);
          alert("Error al conectar con el servidor");
        }
      },
      getAllUsers: async () => {
        try {
          const store = getStore();
          const response = await fetch(`${store.url}/api/users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          const data = await response.json();

          if (response.ok) {
            setStore({ users: data });
          } else {
            console.error("Error al cargar los usuarios:", data);
          }
        } catch (error) {
          console.error("Error en la solicitud de usuarios:", error);
        }
      },
      loadSubscriptions: async() => {
        try {
          const store = getStore();
          const response = await fetch(`${store.url}/api/subscriptions`)
          const data = await response.json();

          if (response.ok) {
            setStore({subscriptions: data});
          } else{
            console.error("Error loading suscriptions")
          }
        } catch (error) {
          console.error("Error fetching suscriptions", error)
        }
      },
      toggleSubscription: async(subscripionId) => {
        const store = getStore();
        let selectedSubscriptions = [...store.selectedSubscriptions]

        if (selectedSubscriptions.includes(subscripionId)) {
          selectedSubscriptions = selectedSubscriptions.filter(
            (id) => id !== subscripionId
          );
        } else {
          selectedSubscriptions.push(subscripionId);
        }
        setStore({selectedSubscriptions});
      },

      setShowLoginModal: (value) => {
         const store = getStore();
        setStore({
          ...store,
          showLoginModal: value
        });
      },
      /* termina aqui */
    },
  };
};

export default getState;
