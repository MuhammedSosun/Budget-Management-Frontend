import { useTranslation } from "react-i18next";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import { FiEdit2, FiMail, FiUser, FiSave, FiX } from "react-icons/fi";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

interface ProfileInfoCardProps {
  user: User;
  isEditing: boolean;
  isProfileSaving: boolean;
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

function ProfileInfoCard({
  user,
  isEditing,
  isProfileSaving,
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onEdit,
  onCancel,
  onSave,
}: ProfileInfoCardProps) {
  const { t } = useTranslation();
  return (
    <article className="profile-card">
      <div className="profile-card__header">
        <div>
          <h2>
            <FiUser />
            {t("profile.personal_info")}
          </h2>
          <p>{t("profile.personal_info_description")}</p>
        </div>

        {!isEditing ? (
          <Button variant="link" onClick={onEdit}>
            <span className="profile-button-content">
              <FiEdit2 />
              {t("profile.edit")}
            </span>
          </Button>
        ) : (
          <div className="profile-card__actions">
            <Button
              variant="danger"
              onClick={onCancel}
              disabled={isProfileSaving}
            >
              <span className="profile-button-content">
                <FiX />
                {t("profile.cancel")}
              </span>
            </Button>

            <Button
              variant="success"
              onClick={onSave}
              isLoading={isProfileSaving}
            >
              <span className="profile-button-content">
                <FiSave />
                {t("profile.save")}
              </span>
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="profile-info-list">
          <div className="profile-info-list__item">
            <span>
              <FiUser />
              {t("profile.first_name")}
            </span>
            <strong>{user.firstName}</strong>
          </div>

          <div className="profile-info-list__item">
            <span>
              <FiUser />
              {t("profile.last_name")}
            </span>
            <strong>{user.lastName}</strong>
          </div>

          <div className="profile-info-list__item">
            <span>
              <FiMail />
              {t("profile.email")}
            </span>
            <strong>{user.email}</strong>
          </div>
        </div>
      ) : (
        <div className="profile-form">
          <Input
            label={t("profile.first_name")}
            value={firstName}
            onChange={onFirstNameChange}
            placeholder={t("profile.first_name_placeholder")}
          />

          <Input
            label={t("profile.last_name")}
            value={lastName}
            onChange={onLastNameChange}
            placeholder={t("profile.last_name_placeholder")}
          />

          <div className="profile-readonly-field">
            <span>{t("profile.email")}</span>
            <strong>{user.email}</strong>
            <small>{t("profile.email_info")}</small>
          </div>
        </div>
      )}
    </article>
  );
}

export default ProfileInfoCard;
