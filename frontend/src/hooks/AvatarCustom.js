import {useEffect} from "react";
import Api from "../utils/api";
import { useCards } from "../contexts/CurrentUserContext";

export function AvatarCustom(){

  const { setCurrentUser } = useCards()

  useEffect(() => {

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return
    }
    const fetchAvatar = async () => {
      try {

        const response = await Api.getUserInfo();
        setCurrentUser(response);

      } catch (error) {
        console.log(error);
      }
    };

    fetchAvatar();

  }, [setCurrentUser]);


  const handleSubmitAvatar = async (e) => {
    e.preventDefault();

    const { popup1__name } = e.target;

    try {
      const response = await Api.updateAvatar(popup1__name.value);
      setCurrentUser(response);
    } catch (error) {
      console.log(error);
    }
  };


  return {handleSubmitAvatar}
}
