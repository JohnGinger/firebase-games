import React, { createContext } from "react";
import app from "firebase/app";

const FirebaseContext = createContext(null);
export { FirebaseContext };

const FirebaseProvider = ({ children, firebaseConfig }) => {
  if (!app.apps.length) {
    app.initializeApp(firebaseConfig);
  }

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
export { FirebaseProvider };
