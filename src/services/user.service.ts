import api from "../api";

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
}
interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

interface UserProfileResponse {
  message: string;
  data: UserProfile;
}

export const userService = {
  uploadAvatar: async (formData: FormData): Promise<UserProfileResponse> => {
    const response = await api.patch<UserProfileResponse>(
      "/users/me/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<UserProfileResponse> => {
    const response = await api.patch<UserProfileResponse>("/users/me", payload);

    return response.data;
  },
  updatePassword: async (payload: UpdatePasswordPayload) => {
    const response = await api.patch("/users/me/password", payload);
    return response.data;
  },
};
