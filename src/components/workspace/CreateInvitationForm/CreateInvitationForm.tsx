import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { workspaceService } from "../../../services/workspace.service";

import type { WorkspaceRole } from "../../../types/workspace";

import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import Button from "../../ui/Button/Button";

import "./CreateInvitationForm.scss";

interface CreateInvitationFormProps {
  workspaceId: string;
  onCancel: () => void;
  onSuccess?: () => Promise<void> | void;
}

type InvitationRole = Exclude<WorkspaceRole, "OWNER">;

function CreateInvitationForm({
  workspaceId,
  onCancel,
  onSuccess,
}: CreateInvitationFormProps) {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InvitationRole>("VIEWER");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizedEmail = email.trim().toLowerCase();
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  const getRoleLabel = (role: InvitationRole) => {
    return t(`workspace.roles.${role.toLowerCase()}`);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!workspaceId) {
      toast.error(t("workspace.no_active_workspace"));
      return;
    }

    if (!isEmailValid) {
      toast.error(t("workspace.invitation_email_validation"));
      return;
    }

    try {
      setIsSubmitting(true);

      await workspaceService.createInvitation(workspaceId, {
        email: normalizedEmail,
        role,
      });

      toast.success(t("workspace.invitation_create_success"), {
        description: t("workspace.invitation_create_success_desc", {
          email: normalizedEmail,
          role: getRoleLabel(role),
        }),
      });

      setEmail("");
      setRole("VIEWER");

      await onSuccess?.();
    } catch (error: any) {
      toast.error(t("workspace.invitation_create_failed"), {
        description:
          error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.message ||
          t("workspace.invitation_create_failed_desc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="create-invitation-form" onSubmit={handleSubmit}>
      <div className="create-invitation-form__content">
        <Input
          label={t("workspace.invitation_email")}
          value={email}
          placeholder={t("workspace.invitation_email_placeholder")}
          onChange={setEmail}
        />

        <Select
          label={t("workspace.role")}
          value={role}
          options={[
            { label: t("workspace.roles.editor"), value: "EDITOR" },
            { label: t("workspace.roles.viewer"), value: "VIEWER" },
          ]}
          onChange={(value) => setRole(value as InvitationRole)}
        />

        <div className="create-invitation-form__role-info">
          <p>
            <strong>{getRoleLabel(role)}:</strong>{" "}
            {t(`workspace.role_info.${role.toLowerCase()}`)}
          </p>
        </div>
      </div>

      <div className="create-invitation-form__actions">
        <Button
          variant="link"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t("no_delete")}
        </Button>

        <Button
          variant="primary"
          type="submit"
          disabled={!isEmailValid || isSubmitting}
          isLoading={isSubmitting}
        >
          {t("workspace.send_invitation")}
        </Button>
      </div>
    </form>
  );
}

export default CreateInvitationForm;
