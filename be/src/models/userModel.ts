import { supabase } from "../config/supabase";
import UserProfile from "../types";



export const fetchUsers = async (): Promise<UserProfile[]> => {
  const {data, error} = await supabase
      .from('profiles')
      .select('*')
      .order('full_name', { ascending: true })
      if (error || !data) {
        throw error || new Error('No data found');
      }

      return data;
  };
