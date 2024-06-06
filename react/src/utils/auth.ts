import { api, login, logout, register } from "../api/axios";
import { User } from "./definitions";
import { storage } from "./storage";

interface AuthProvider {
  isAuthenticated: boolean;
  user: User | null;
  login(data: FormData): Promise<void>;
  logout(): Promise<void>;
  register(data: FormData): Promise<void>;
  checkAuthentication(): Promise<User | null>;
  checkPermissions(plan: string): Promise<{user_permissions:string} | null>;
  initialize(): void;
}


const authProvider: AuthProvider = {
  isAuthenticated: false,
  user: null,
  async login (data) {
  try {
     const user = await login(data);
     if(user){
      authProvider.isAuthenticated = true;
     }
  } catch (error) {
    return 
  }
  },
  async logout() {
    try {
      await logout();
      authProvider.isAuthenticated = false;
      storage.remove("isAuthenticated");
    } catch (error) {
      console.error(error);
    }
  },
    async register (data) {
      try {
        await register(data);
        authProvider.isAuthenticated = true;
      } catch (error) {
        console.error(error);
      }
    },
    async checkAuthentication () {
      try {
        const response = await api.get("api/current-user/get_user/");
        const user = response?.data;

        return user;
      } catch (error) {
        console.error("Error authenticating:", error);
        return null;
      }
    },
  async checkPermissions (plan) {
    try {
      const response = await api.get(`api/user-permissions/?plan=${plan}`);

      return response.data;
    } catch (error) {
      console.error("Error checking permissions:", error);
      return null;
    }
  },

  async initialize() {
    const user = await authProvider.checkAuthentication()
    if(user) {
      authProvider.isAuthenticated = true
    } 
  },
};
authProvider.initialize();

export default authProvider;
