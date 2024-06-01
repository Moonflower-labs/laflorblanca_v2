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
  login: async function (data: FormData): Promise<void> {
    try {
      await login(data);
      this.isAuthenticated = true;
      storage.set("isAuthenticated", true);
    } catch (error) {
      console.error(error);
    }
  },
  logout: async function () {
    try {
      await logout();
      this.isAuthenticated = false;
      storage.remove("isAuthenticated");
    } catch (error) {
      console.error(error);
    }
  },
  register: async function (data: FormData) {
    try {
      await register(data);
      this.isAuthenticated = true;
    } catch (error) {
      console.error(error);
    }
  },
  checkAuthentication: async function () {
    try {
      const response = await api.get("api/current-user/get_user/");
      const user = response?.data;

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },
  checkPermissions: async function (plan: string) {
    try {
      const response = await api.get(`api/user-permissions/?plan=${plan}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },

  initialize: function () {
    const storedIsAuthenticated = storage.get<boolean>("isAuthenticated");
    this.isAuthenticated = storedIsAuthenticated || false;

  },
};
authProvider.initialize();

export default authProvider;
