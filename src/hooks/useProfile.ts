import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { userService } from "../services/user.service";

export const useProfile = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  useEffect(() => {
    if (!user || isEditing) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user, isEditing]);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  const avatarSrc = user
    ? user.avatarUrl ||
      `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
    : "";

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsAvatarUploading(true);

      const response = await userService.uploadAvatar(formData);

      updateUser(response.data);
      toast.success(t("profile.profile_photo_updated"));
    } catch (error) {
      console.error("Avatar upload failed:", error);
      toast.error(t("profile.profile_photo_update_failed"));
    } finally {
      setIsAvatarUploading(false);
      event.target.value = "";
    }
  };

  const handleProfileCancel = () => {
    if (!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

  const handleProfileSave = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      toast.error(t("profile.first_last_name_required"));
      return;
    }

    try {
      setIsProfileSaving(true);

      const response = await userService.updateProfile({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
      });

      updateUser(response.data);

      toast.success(t("profile.profile_info_updated"));
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(t("profile.profile_info_update_failed"));
    } finally {
      setIsProfileSaving(false);
    }
  };

  return {
    user,
    fullName,
    avatarSrc,
    fileInputRef,

    isAvatarUploading,
    isEditing,
    setIsEditing,
    isProfileSaving,

    firstName,
    lastName,
    setFirstName,
    setLastName,

    handleAvatarButtonClick,
    handleAvatarChange,
    handleProfileCancel,
    handleProfileSave,
  };
};
