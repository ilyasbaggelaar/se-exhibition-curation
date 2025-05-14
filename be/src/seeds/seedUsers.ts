import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const seedUsers = async () => {
  console.log('🌱 Seeding real users via Admin API...');

  const users = [
    {
      email: 'ada@example.com',
      password: 'password123',
      user_metadata: {
        full_name: 'Ada Lovelace',
        avatar_url: 'https://example.com/ada.png',
      },
    },
    {
      email: 'claude@example.com',
      password: 'password123',
      user_metadata: {
        full_name: 'Claude Shannon',
        avatar_url: 'https://example.com/claude.png',
      },
    },
    {
      email: 'alan@example.com',
      password: 'password123',
      user_metadata: {
        full_name: 'Alan Turing',
        avatar_url: 'https://example.com/alan.png',
      },
    },
  ];

  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      user_metadata: user.user_metadata,
    });

    if (error) {
      console.error(`❌ Failed to create ${user.email}:`, error.message);
    } else {
      console.log(`✅ Created user: ${user.email}`);
    }
  }
};

seedUsers();
