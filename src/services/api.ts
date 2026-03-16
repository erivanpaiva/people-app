import { RandomUserResponse, RandomUser } from "../types/randomUser";

const API_URL = "https://randomuser.me/api/";

export async function fetchUsers(
  page: number = 1,
  gender?: string,
  nationality?: string,
): Promise<RandomUser[]> {
  const params = new URLSearchParams({
    page: page.toString(),
    results: "20",
    seed: "peopleapp",
  });

  if (gender) {
    params.append("gender", gender);
  }

  if (nationality) {
    params.append("nat", nationality);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.statusText}`);
  }

  const data = (await response.json()) as RandomUserResponse;

  return data.results;
}
