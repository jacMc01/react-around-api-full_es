
import axios from "axios";


class Api {
  constructor(token) {
    this.api_base = axios.create({
      baseURL: "https://https://api.mackyuniverse.desarrollointerno.com"
    });

    this.authHeaders = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }

    this.authHeaders2 = {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  }


  async updateUserProfile(name, about) {
    const response = await this.api_base.patch("users/me", { name, about }, this.authHeaders);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  };


  async updateAvatar(avatar) {
    const response = await this.api_base.patch("users/me/avatar", { avatar }, this.authHeaders);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  }

  async getUserInfo() {
    const response = await this.api_base.get("users/me", this.authHeaders2);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  }

  async getCards() {
    const response = await this.api_base.get("cards", this.authHeaders2);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  }

  async postCard(name, link) {
    const response = await this.api_base.post("cards", { name, link }, this.authHeaders);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  }

  async deleteCard(cardId) {
    const response = await this.api_base.delete(`cards/${cardId}`, this.authHeaders);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  }

  async deleteLike(cardId) {
    const response = await this.api_base.delete(`cards/likes/${cardId}`, this.authHeaders2);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  }

  async putLike(cardId) {
    const response = await this.api_base.put(`cards/likes/${cardId}`, {} ,this.authHeaders2);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw new Error(`Error updating user profile: ${response.status}`);
    }
  }
}

const storedToken = localStorage.getItem("jwt");
const api = new Api(storedToken);

export default api;
