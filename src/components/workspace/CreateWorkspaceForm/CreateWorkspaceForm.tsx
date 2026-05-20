import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { workspaceService } from "../../../services/workspace.service";

import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

import "./CreateWorkspaceForm.scss";

interface CreateWorkspaceFormProps {
  onCancel: () => void;
  onSuccess: () => Promise<void> | void;
}

function CreateWorkspaceForm({
  onCancel,
  onSuccess,
}: CreateWorkspaceFormProps) {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    description: false,
  });

  const trimmedName = name.trim();
  const trimmedDescription = description.trim();

  const nameError = useMemo(() => {
    if (!isSubmittedOnce && !touchedFields.name) return "";

    if (trimmedName.length === 0) {
      return t("workspace.name_required");
    }

    if (trimmedName.length < 2) {
      return t("workspace.name_min_length");
    }

    if (trimmedName.length > 80) {
      return t("workspace.name_max_length");
    }

    return "";
  }, [trimmedName, isSubmittedOnce, touchedFields.name, t]);

  const descriptionError = useMemo(() => {
    if (!isSubmittedOnce && !touchedFields.description) return "";

    if (trimmedDescription.length > 250) {
      return t("workspace.description_max_length");
    }

    return "";
  }, [trimmedDescription, isSubmittedOnce, touchedFields.description, t]);

  const isFormValid =
    trimmedName.length >= 2 &&
    trimmedName.length <= 80 &&
    trimmedDescription.length <= 250;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmittedOnce(true);
    setTouchedFields({
      name: true,
      description: true,
    });

    if (!isFormValid) {
      toast.error(t("workspace.form_invalid"));
      return;
    }

    try {
      setIsSubmitting(true);

      await workspaceService.createWorkspace({
        name: trimmedName,
        description: trimmedDescription || undefined,
      });

      toast.success(t("workspace.create_success"), {
        description: t("workspace.create_success_desc"),
      });

      setName("");
      setDescription("");
      setIsSubmittedOnce(false);
      setTouchedFields({
        name: false,
        description: false,
      });

      await onSuccess();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(error);
      }

      toast.error(t("workspace.create_failed"), {
        description: t("workspace.create_failed_desc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="create-workspace-form" onSubmit={handleSubmit}>
      <Input
        label={t("workspace.name")}
        value={name}
        placeholder={t("workspace.name_placeholder")}
        onChange={(value) => {
          setName(value);
          setTouchedFields((prev) => ({
            ...prev,
            name: true,
          }));
        }}
        error={nameError}
      />

      <Input
        label={t("workspace.description")}
        value={description}
        placeholder={t("workspace.description_placeholder")}
        onChange={(value) => {
          setDescription(value);
          setTouchedFields((prev) => ({
            ...prev,
            description: true,
          }));
        }}
        error={descriptionError}
      />

      <div className="create-workspace-form__actions">
        <Button
          type="button"
          variant="danger"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t("cancel")}
        </Button>

        <Button
          type="submit"
          variant="primary"
          disabled={!isFormValid || isSubmitting}
          isLoading={isSubmitting}
        >
          {t("workspace.create")}
        </Button>
      </div>
    </form>
  );
}

export default CreateWorkspaceForm;
