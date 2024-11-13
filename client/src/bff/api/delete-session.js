export const deleteSession = async (sessionId) =>
  fetch(`http://localhost:3010/sessions/${sessionId}`, {
    method: "DELETE",
  });
