import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { workspaceService } from "../services/workspace.service";
import { useAuth } from "../hooks/useAuth";
import type { Workspace, WorkspaceRole } from "../types/workspace";

interface WorkspaceContextType {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  activeWorkspaceId: string | null;
  activeRole: WorkspaceRole | null;
  isWorkspaceLoading: boolean;
  setActiveWorkspaceById: (workspaceId: string) => void;
  refreshWorkspaces: () => Promise<void>;
  canViewTransactions: boolean;
  canManageTransactions: boolean;
  canManageWorkspace: boolean;
}

const ACTIVE_WORKSPACE_STORAGE_KEY = "activeWorkspaceId";

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export { WorkspaceContext };

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceProvider = ({ children }: WorkspaceProviderProps) => {
  const { user, isChecking } = useAuth();

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(
    null,
  );
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(false);

  const selectInitialWorkspace = useCallback((workspaceList: Workspace[]) => {
    if (workspaceList.length === 0) {
      setActiveWorkspace(null);
      localStorage.removeItem(ACTIVE_WORKSPACE_STORAGE_KEY);
      return;
    }

    const storedWorkspaceId = localStorage.getItem(
      ACTIVE_WORKSPACE_STORAGE_KEY,
    );

    const storedWorkspace = workspaceList.find(
      (workspace) => workspace.id === storedWorkspaceId,
    );

    if (storedWorkspace) {
      setActiveWorkspace(storedWorkspace);
      return;
    }

    const defaultWorkspace = workspaceList.find(
      (workspace) => workspace.isDefault,
    );

    const workspaceToSelect = defaultWorkspace || workspaceList[0];

    setActiveWorkspace(workspaceToSelect);
    localStorage.setItem(ACTIVE_WORKSPACE_STORAGE_KEY, workspaceToSelect.id);
  }, []);

  const refreshWorkspaces = useCallback(async () => {
    if (!user) {
      setWorkspaces([]);
      setActiveWorkspace(null);
      localStorage.removeItem(ACTIVE_WORKSPACE_STORAGE_KEY);
      return;
    }

    setIsWorkspaceLoading(true);

    try {
      const response = await workspaceService.getMyWorkspaces();
      const workspaceList = response.data || [];

      setWorkspaces(workspaceList);
      selectInitialWorkspace(workspaceList);
    } catch (error) {
      console.error(error);
      setWorkspaces([]);
      setActiveWorkspace(null);
    } finally {
      setIsWorkspaceLoading(false);
    }
  }, [user, selectInitialWorkspace]);

  useEffect(() => {
    if (isChecking) return;

    refreshWorkspaces();
  }, [isChecking, refreshWorkspaces]);

  const setActiveWorkspaceById = useCallback(
    (workspaceId: string) => {
      const selectedWorkspace = workspaces.find(
        (workspace) => workspace.id === workspaceId,
      );

      if (!selectedWorkspace) return;

      setActiveWorkspace(selectedWorkspace);
      localStorage.setItem(ACTIVE_WORKSPACE_STORAGE_KEY, selectedWorkspace.id);
    },
    [workspaces],
  );

  const activeRole = activeWorkspace?.role || null;

  const canViewTransactions =
    activeRole === "OWNER" ||
    activeRole === "EDITOR" ||
    activeRole === "VIEWER";

  const canManageTransactions =
    activeRole === "OWNER" || activeRole === "EDITOR";

  const canManageWorkspace = activeRole === "OWNER";

  const value = useMemo(
    () => ({
      workspaces,
      activeWorkspace,
      activeWorkspaceId: activeWorkspace?.id || null,
      activeRole,
      isWorkspaceLoading,
      setActiveWorkspaceById,
      refreshWorkspaces,
      canViewTransactions,
      canManageTransactions,
      canManageWorkspace,
    }),
    [
      workspaces,
      activeWorkspace,
      activeRole,
      isWorkspaceLoading,
      setActiveWorkspaceById,
      refreshWorkspaces,
      canViewTransactions,
      canManageTransactions,
      canManageWorkspace,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};
