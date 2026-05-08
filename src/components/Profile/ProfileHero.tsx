import type { ChangeEvent, RefObject } from "react";
import Button from "../ui/Button/Button";
import { FiCamera } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface ProfileHeroProps {
  fullName: string;
  email: string;
  avatarSrc: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isAvatarUploading: boolean;
  onAvatarButtonClick: () => void;
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ProfileHero({
  fullName,
  email,
  avatarSrc,
  fileInputRef,
  isAvatarUploading,
  onAvatarButtonClick,
  onAvatarChange,
}: ProfileHeroProps) {
  const { t } = useTranslation();
  return (
    <div className="profile-hero">
      <div className="profile-hero__avatar-wrapper">
        <img src={avatarSrc} alt={fullName} className="profile-hero__avatar" />

        <div className="profile-hero__avatar-button">
          <Button
            variant="primary"
            onClick={onAvatarButtonClick}
            disabled={isAvatarUploading}
            isLoading={isAvatarUploading}
          >
            <span className="profile-button-content">
              <FiCamera />
              {t("profile.photo_change")}
            </span>
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={onAvatarChange}
          hidden
        />
      </div>

      <div className="profile-hero__content">
        <span className="profile-hero__badge">{t("profile.profile")}</span>

        <div>
          <h1>{fullName}</h1>
          <p>{email}</p>
        </div>

        <div className="profile-hero__meta">
          <span>{t("profile.active_account")}</span>
          <span>{t("profile.user")}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;
