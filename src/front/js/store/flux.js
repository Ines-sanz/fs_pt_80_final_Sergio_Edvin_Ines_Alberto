const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      url: `${process.env.BACKEND_URL}`,
      consolas: [],
      videojuegos: [],
      accesorios: [],
      promoted:[],
      isLogged: localStorage.getItem("Token") ? true : false, 
      Token: localStorage.getItem("Token") || null,
      user: JSON.parse(localStorage.getItem("user")) || "",
      shoppingCart:[]
    },
    actions: {

      login: async (formData1) => {
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
                getActions().userShoppingCart();
            } else {
                alert(data.msg || "Error en el inicio de sesión");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert("Error al conectar con el servidor");
        }
    },

      register: async (formData) =>{
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
              setStore({isLogged: true, Token:data.token, user: data.user})
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
        try{
          const store = getStore();

          if (store.Token) {
            setStore({
              isLogged: true,
              user: JSON.parse(localStorage.getItem("user")),
            });
          }
        }
        catch (error) {
          console.error("Error loading data:", error);
        }
      },

      userShoppingCart: async () => {
        try {
          const store = getStore();
          
          if (store.user) {
            const shoppingCartIds = store.user.shoppingCart;      
            const allProducts = [...store.consolas, ...store.videojuegos, ...store.accesorios]; 
            const productsInCart = allProducts.filter(product => shoppingCartIds.includes(parseInt(product.id))); 
            console.log("Carrito actualizado:", productsInCart);
            setStore({ shoppingCart: productsInCart });
            
          }
        } catch (error) {
          console.error("Error al cargar los productos del carrito:", error);
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
      toggleFav: async (newFav) => {
        const store = getStore();
        console.log("Datos enviados a favoritos:", newFav)
        try {
            const response = await fetch(`${store.url}/api/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${store.Token}` 
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
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
            console.error(error);
        }
    }
    },
  };
};

export default getState;
