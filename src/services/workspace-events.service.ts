import { fetchEventSource } from "@microsoft/fetch-event-source";
import api from "../api";

const BASE_URL = "http://localhost:3000/api";

interface CreateWorkspaceEventStreamParams {
  workspaceId: string;
  signal: AbortSignal;
  onMessage: (eventName: string, data: string) => void;
  onError?: (error: unknown) => void;
}

export const createWorkspaceEventStream = ({
  workspaceId,
  signal,
  onMessage,
  onError,
}: CreateWorkspaceEventStreamParams) => {
  const authorizationHeader = api.defaults.headers.common["Authorization"];

  return fetchEventSource(
    `${BASE_URL}/workspace-events/${workspaceId}/events`,
    {
      method: "GET",
      credentials: "include",
      signal,
      headers: {
        Accept: "text/event-stream",
        ...(authorizationHeader
          ? { Authorization: String(authorizationHeader) }
          : {}),
      },
      onmessage(message) {
        if (!message.event || !message.data) return;

        onMessage(message.event, message.data);
      },
      onerror(error) {
        onError?.(error);
        throw error;
      },
    },
  );
};
