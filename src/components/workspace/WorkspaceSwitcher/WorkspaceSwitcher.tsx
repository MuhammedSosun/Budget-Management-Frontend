import { useState } from "react";
import { useWorkspace } from "../../../hooks/useWorkspace";
import Select from "../../ui/Select/Select";
import Button from "../../ui/Button/Button";
import "./WorkspaceSwitcher.scss";
import { useTranslation } from "react-i18next";

interface WorkspaceSwitcherProps {
  variant?: "full" | "compact";
}

function WorkspaceSwitcher({ variant = "full" }: WorkspaceSwitcherProps) {
  const {
    workspaces,
    activeWorkspaceId,
    activeWorkspace,
    activeRole,
    setActiveWorkspaceById,
    isWorkspaceLoading,
  } = useWorkspace();

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  if (isWorkspaceLoading) {
    return (
      <div
        className={`workspace-switcher workspace-switcher--${variant} workspace-switcher--loading`}
      >
        {t("workspace.loading")}
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className={`workspace-switcher workspace-switcher--${variant}`}>
        <span className="workspace-switcher__empty">
          {t("workspace.empty")}
        </span>
      </div>
    );
  }

  return (
    <div className={`workspace-switcher workspace-switcher--${variant}`}>
      <div className="workspace-switcher__select">
        <Select
          label=""
          value={activeWorkspaceId || ""}
          options={workspaces.map((workspace) => ({
            label:
              variant === "compact"
                ? `${workspace.name} (${t(`workspace.roles.${workspace.role.toLowerCase()}`)})`
                : workspace.name,
            value: workspace.id,
          }))}
          onChange={(value) => {
            setActiveWorkspaceById(value);
            setIsOpen(false);
          }}
        />
      </div>

      {variant === "full" && activeWorkspace && (
        <div className="workspace-switcher__info">
          <span className="workspace-switcher__name">
            {activeWorkspace.name}
          </span>

          <span
            className={`workspace-switcher__role workspace-switcher__role--${activeRole?.toLowerCase()}`}
          >
            {activeRole ? t(`workspace.roles.${activeRole}`) : ""}
          </span>
        </div>
      )}

      {variant === "full" && (
        <div className="workspace-switcher__actions">
          <Button variant="link" onClick={() => setIsOpen((prev) => !prev)}>
            ⚙
          </Button>

          {isOpen && (
            <div className="workspace-switcher__menu">
              <button type="button" className="workspace-switcher__menu-item">
                {t("workspace.actions.create")}
              </button>

              <button type="button" className="workspace-switcher__menu-item">
                {t("workspace.actions.manageMembers")}
              </button>

              <button type="button" className="workspace-switcher__menu-item">
                {t("workspace.actions.invitations")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkspaceSwitcher;
