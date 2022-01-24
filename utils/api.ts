export async function get<Res, Req = any>(path: string, payload?: Req): Promise<Res> {
  const apiUrl = (process.env.NEXT_PUBLIC_API_HOST as string) + path;
  const response = await fetch(apiUrl, {
    method: 'GET',
    body: JSON.stringify(payload),
  });
  const data: Res = await response.json();
  if (response.ok && data) {
    return data;
  } else {
    return Promise.reject(new Error(`API call failed for ${apiUrl}. Code: ${response.status}`));
  }
}

export async function post<Res, Req = any>(path: string, payload?: Req): Promise<Res> {
  const apiUrl = (process.env.NEXT_PUBLIC_API_HOST as string) + path;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data: Res = await response.json();
  if (response.ok && data) {
    return data;
  } else {
    return Promise.reject(new Error(`API call failed for ${apiUrl}. Code: ${response.status}`));
  }
}
