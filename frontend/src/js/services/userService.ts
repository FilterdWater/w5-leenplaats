import type { ApiResponse } from "@/js/types/api-response";
import type { User, UserDTO } from "@/js/models/user";
import { API_BASE_URL } from "../config";

// GET: all User
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/api/users`);

  return await res.json();
}

// GET: User with id
export async function fetchUser(id: number): Promise<ApiResponse> {
  const res = await fetch(`${API_BASE_URL}/api/users/${id}`);

  return await res.json();
}

// Get: Check User Email exist
export async function checkEmailExists(email: string): Promise<boolean> {
  const res = await fetch(
    `${API_BASE_URL}/api/users/email/${encodeURIComponent(email)}`
  );

  if (!res.ok) {
    return false;
  }

  const data = await res.json();
  return data.exists === true;
}

// POST: new User
export async function createUser(user: UserDTO): Promise<ApiResponse> {
  const exists = await checkEmailExists(user.email);

  if (exists) {
    return {
      success: false,
      message: "This email is already being used.",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }

      return { success: true, data };
    } else {
      return {
        success: false,
        errors: data.errors,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error. Please try again.",
    };
  }
}
