const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      url: `${process.env.BACKEND_URL}`,
      consolas: [],
      videojuegos: [],
      accesorios: [],
      promoted:[],
      isLogged: false,
      Token:localStorage.getItem("Token")||null
    },
    actions: {

      login: async (formData1) =>{
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData1),
          });
      
          const data = await response.json();
          if (response.ok) {
              alert("Inicio de sesión exitoso");
              console.log("Token:", data.token);
              console.log("User:", data.user);
              localStorage.setItem('Token', data.token)
              console.log("Usuario recibido en el login:", data.user)
              setStore({isLogged: true, Token:data.token, user: data.user})
          } else {
              alert(data.msg || "Error en el inicio de sesión" );
          }
      } catch (error) {
          alert("Error al conectar con el servidor");
          console.error(error);
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
              localStorage.setItem('Token', data.token)
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
              isLogged: true
            });
          }
        }
        catch (error) {
          console.error("Error loading data:", error);
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
                alert(data.msg);
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

    //prueba de favorites
    // getFavorites: async () => {
    //   const store = getStore();
    //   try {
    //     const response = await fetch(`${store.url}/api/favorites`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${store.Token}`,
    //       },
    //     });
    
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log("Favorites fetched from backend:", data);
    //       setStore({ user: { ...store.user, favorites: data.favorites || [] } });
    //     } else {
    //       const errorData = await response.json();
    //       console.error("Error fetching favorites:", errorData.msg || "Unknown error");
    //       alert(errorData.msg || "Failed to fetch favorites");
    //     }
    //   } catch (error) {
    //     console.error("Error connecting to server:", error);
    //     alert("Error connecting to server");
    //   }
    // },
// hasta aqui    
    },
  };
};

export default getState;
