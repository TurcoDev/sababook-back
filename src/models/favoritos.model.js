// src/models/favoritesModel.js
import { supabase } from "../lib/supabaseClient.js";

export const FavoritesModel = {
  async getByUserId(userId) {
    const { data, error } = await supabase
      .from("favorites")
      .select(`
        book_id,
        books (
          id,
          titulo,
          autor
        )
      `)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data;
  },
};
