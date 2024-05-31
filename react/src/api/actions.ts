import { AxiosError } from "axios";
import { api, handleApiError } from "./axios";

export const postActions = {
  getAllPosts: async function (searchQuery?: URLSearchParams) {
    try {
      const queryParams =
        searchQuery?.toString() !== "" ? `?${searchQuery?.toString()}` : "";

      const response = await api.get(`api/posts/${queryParams}`);
      const data = response.data;
      return { data };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
  getPost: async function (id: string | undefined) {
    if (id === undefined) {
      return;
    }
    try {
      const response = await api.get(`api/posts/${id}`);
      const post = response.data;
      return { post };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
  addToFavorites: async function (id: string, formData: FormData) {
    try {
      const response = await api.post(
        `api/posts/${id}/manage_favorites/`,
        formData
      );
      const data = response.data;
      return { data };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
  ratePost: async function (id: string, formData: FormData) {
    try {
      const response = await api.post(
        `api/posts/${id}/manage_rating/`,
        formData
      );
      const data = response.data;
      return { data };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
};
export const videoLinkActions = {
  getLinksSection: async function (
    section: string,
    searchQuery?: URLSearchParams
  ) {
    try {
      const queryParams =
        searchQuery?.toString() !== "" ? `&${searchQuery?.toString()}` : "";
      const response = await api.get(
        `api/video-link?section=${section}${queryParams}`
      );
      const data = response.data;
      return { data };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
  getVideo: async function (
    id: string | undefined,
    searchQuery?: URLSearchParams
  ) {
    if (id === undefined) {
      return;
    }

    try {
      const queryParams =
        searchQuery?.toString() !== "" ? `?${searchQuery?.toString()}` : "";
      const response = await api.get(`api/video-link/${id}/${queryParams}`);
      const video = response.data;
      return { video };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
  addToFavorites: async function (id: string, formData: FormData) {
    try {
      const response = await api.post(
        `api/video-link/${id}/manage_favorites/`,
        formData
      );
      const data = response.data;
      return { data };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
};
export const commentActions = {
  createComment: async function (formData: FormData) {
    try {
      const response = await api.post("api/comment/", formData);
      const data = response.data;
      return { data };
    } catch (error) {
      handleApiError(error as Error | AxiosError<unknown>);
      return null;
    }
  },
};
export const submitLike = async (formData: FormData) => {
  try {
    const response = await api.post("api/like/", formData);
    const data = response.data;
    return { data };
  } catch (error) {
    handleApiError(error as Error | AxiosError<unknown>);
    return null;
  }
};
