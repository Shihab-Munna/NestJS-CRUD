export function getSingleDataPlaceholder(payload: any) {
  const data = {
    message: `Get Single Data Success`,
    success: true,
    data: payload ? payload : null,
  };

  return data;
}

export const singInPlaceholder = (payload: any) => {
  const response = {
    message: `Loged In Successfully`,
    success: true,
    token: payload ? payload : null,
  };

  return response;
};

export function successPlaceholder(msg: string, payload?: any) {
  const data = {
    success: true,
    message: msg,
    data: payload,
  };

  return data;
}
