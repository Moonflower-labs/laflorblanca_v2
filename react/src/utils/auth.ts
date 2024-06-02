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
  isAuthenticated: storage.get<boolean>("isAuthenticated") || false,
  user: null,
  async login (data) {
    try {
      await login(data);
      authProvider.isAuthenticated = true;
      storage.set("isAuthenticated", true);
    } catch (error) {
      console.error(error);
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
        console.error("Error fetching user:", error);
        return null;
      }
    },
  async checkPermissions (plan) {
    try {
      const response = await api.get(`api/user-permissions/?plan=${plan}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },

  initialize() {
    const storedIsAuthenticated = storage.get<boolean>("isAuthenticated");
    authProvider.isAuthenticated = storedIsAuthenticated || false;

  },
};
authProvider.initialize();

export default authProvider;
