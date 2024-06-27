export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const makeApiRequest = async (
  method: API_METHODS,
  url: string,
  data?: any,
  idToken?: any,
) => {
  try {
    if (method === API_METHODS.GET)
      return await fetch(url, {
        method,
        headers: { "Content-type": "application/json", Authorization: idToken },
        cache: "no-cache",
      });

    return await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json", Authorization: idToken },
      cache: "no-cache",
    });
  } catch (error) {
    console.error(error);
  }
};
