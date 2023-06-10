import React from "react";
import { useContext } from "react";

export const CurrentUserContext = React.createContext();

export function useCards(){
  const context = useContext(CurrentUserContext);
  if(!context){
    throw new Error("useCards must be used within a CurrentUserContext");
  }
  return context;
}
