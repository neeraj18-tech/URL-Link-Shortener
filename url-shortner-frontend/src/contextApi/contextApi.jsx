import { createContext, useContext, useState } from "react";

const ContextApi = createContext(null);

export const ContextApiProvider = ({ children }) => {
  const getTokenSafe = () => {
    if (typeof window === "undefined") return null;

    try {
      return window.sessionStorage.getItem("JWT_TOKEN");
    } catch (err) {
      console.warn("SessionStorage blocked, using memory token only");
      return null;
    }
  };

  const [token, setToken] = useState(getTokenSafe);

  return (
    <ContextApi.Provider value={{ token, setToken }}>
      {children}
    </ContextApi.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useStoreContext must be used inside ContextApiProvider");
  }
  return context;
};


// import { createContext, useContext, useState } from "react";

// const ContextApi = createContext(null);

// export const ContextApiProvider = ({ children }) => {
//   const getTokenSafe = () => {
//     if (typeof window === "undefined") return null;

//     try {
//       return window.localStorage.getItem("JWT_TOKEN"); // ❌ no JSON.parse
//     } catch (err) {
//       console.warn("LocalStorage blocked, using memory token only");
//       return null;
//     }
//   };

//   const [token, setToken] = useState(getTokenSafe);

//   return (
//     <ContextApi.Provider value={{ token, setToken }}>
//       {children}
//     </ContextApi.Provider>
//   );
// };

// export const useStoreContext = () => {
//   const context = useContext(ContextApi);
//   if (!context) {
//     throw new Error("useStoreContext must be used inside ContextApiProvider");
//   }
//   return context;
// };
