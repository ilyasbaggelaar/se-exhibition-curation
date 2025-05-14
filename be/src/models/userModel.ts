import { supabase } from "../config/supabase";

export interface UserProfile {
id: string;
full_name: string;
avatar_url: string;
created_at: string;
}

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
