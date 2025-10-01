// utils/api.ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, params } = options;

  // Build query string if params exist
  let url = endpoint;
  if (params) {
    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();
    url += `?${queryString}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body,
  };
  let response: Response;

  try {
    response = await fetch(`${baseUrl}/${url}`, fetchOptions);
  } catch (networkError: any) {
    throw new Error(`Network error: ${networkError.message}`);
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = null; // fallback if response is not JSON
  }

  if (!response.ok) {
    // Get error message from API response or fallback
    const errorMessage =
      data?.message ||
      data?.error ||
      JSON.stringify(data) ||
      response.statusText;
    throw new Error(errorMessage);
  }

  return data as T;
}
