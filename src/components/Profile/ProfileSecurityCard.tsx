import { useState } from "react";
import { FiLock, FiShield, FiCheckCircle, FiSave, FiX } from "react-icons/fi";
import { toast } from "sonner";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import { userService } from "../../services/user.service";
import { useTranslation } from "react-i18next";

function ProfileSecurityCard() {
  const { t } = useTranslation();
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCancel = () => {
    resetPasswordForm();
    setIsPasswordFormOpen(false);
  };

  const handlePasswordSave = async () => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error(t("profile.all_password_fields"));
      return;
    }

    if (newPassword.length < 6) {
      toast.error(t("profile.new_password_min_length"));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t("profile.new_password_not_match"));
      return;
    }

    if (currentPassword === newPassword) {
      toast.error(t("profile.new_password_same_as_current"));
      return;
    }

    try {
      setIsPasswordSaving(true);

      await userService.updatePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(t("profile.password_updated"));
      resetPasswordForm();
      setIsPasswordFormOpen(false);
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error(t("profile.password_update_failed"));
    } finally {
      setIsPasswordSaving(false);
    }
  };

  return (
    <article className="profile-card">
      <div className="profile-card__header">
        <div>
          <h2>
            <FiShield />
            {t("profile.security")}
          </h2>
          <p>{t("profile.security_description")}</p>
        </div>
      </div>

      <div className="profile-security">
        <div className="profile-security__item">
          <div>
            <h3>
              <FiLock />
              {t("profile.password")}
            </h3>
            <p>{t("profile.password_description")}</p>
          </div>

          {!isPasswordFormOpen && (
            <Button
              variant="primary"
              onClick={() => setIsPasswordFormOpen(true)}
            >
              <span className="profile-button-content">
                <FiLock />
                {t("profile.change_password")}
              </span>
            </Button>
          )}
        </div>

        {isPasswordFormOpen && (
          <div className="profile-password-form">
            <Input
              label={t("profile.current_password")}
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder={t("profile.current_password_placeholder")}
            />

            <Input
              label={t("profile.new_password")}
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder={t("profile.new_password_placeholder")}
            />

            <Input
              label={t("profile.confirm_password")}
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder={t("profile.confirm_password_placeholder")}
            />

            <div className="profile-password-form__actions">
              <Button
                variant="danger"
                onClick={handleCancel}
                disabled={isPasswordSaving}
              >
                <span className="profile-button-content">
                  <FiX />
                  {t("profile.cancel")}
                </span>
              </Button>

              <Button
                variant="success"
                onClick={handlePasswordSave}
                isLoading={isPasswordSaving}
              >
                <span className="profile-button-content">
                  <FiSave />
                  {t("profile.save")}
                </span>
              </Button>
            </div>
          </div>
        )}

        <div className="profile-security__item">
          <div>
            <h3>{t("profile.session")}</h3>
            <p>{t("profile.session_description")}</p>
          </div>

          <span className="profile-security__status">
            <FiCheckCircle />
            {t("profile.secure")}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProfileSecurityCard;
