import { apiFetch } from "../api-fetch";
import { API_PATHS } from "@/api/constant";
import { getToken } from "../utils";

export const addRating = async (data: any) => {
    const token = getToken(); // get it fresh every time
    const response = await apiFetch(API_PATHS.ADD_RATING, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response;
};