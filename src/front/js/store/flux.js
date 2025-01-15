const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      url: "https://fuzzy-robot-7vrw4x76wpj7cr5qq-3001.app.github.dev/",
      consoles: [],
      videogames: [],
      accesorys: [],
    },
    actions: {
      loadInfo: async () => {
        try {
          const store = getStore();
          const url = `${store.url}/api/products`;
          const response = await fetch(url);
          const data = await response.json();

          const consoles = data.filter((item) => item.category === "console");
          const videogames = data.filter(
            (item) => item.category === "videogames"
          );
          const accesorys = data.filter(
            (item) => item.category === "accessory"
          );

          const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

          setStore({
            consoles: shuffleArray(consoles),
            videogames: shuffleArray(videogames),
            accesorys: shuffleArray(accesorys),
          });
        } catch (error) {
          console.error("Error loading data:", error);
        }
      },
    },
  };
};

export default getState;
