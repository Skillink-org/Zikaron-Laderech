"use server";

import { getFilteredFallen } from "../service/fallen.service";

export async function queryFallen(formData) {
  const rawFormData = {
    searchQuery: formData.get("searchQuery"),
  };

  return await getFilteredFallen(rawFormData.searchQuery);

  // mutate data
  // revalidate cache
}
