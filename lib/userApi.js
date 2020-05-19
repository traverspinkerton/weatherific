export const getUserMetadata = (id, token) =>
  fetch(`https://travers.auth0.com/api/v2/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => response.json());

export const patchUserMetadata = (id, token, userMetadata) =>
  fetch(`https://travers.auth0.com/api/v2/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user_metadata: userMetadata,
    }),
  })
    .then((response) => response.json())
    .then(({ user_metadata }) => {
      user_metadata;
    });
