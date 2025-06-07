import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const seedUsers = async () => {
  console.log(" seeing users via Supabase...");

  const users = [
    {
      email: "exampleemail@gmail.com",
      password: "test012",
      user_metadeta: {
        full_name: "example test",
        avatar_url: "https://example.com/example.png",
      }
    },
  ];

  for (const user of users) {
    const {error} = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        user_metadata: user.user_metadeta,
    })

    if (error) {
        console.error(`failed to create ${user.email}`, error.message)
    } else{
        console.log("SUCCESS! users have spread around the DB!")
    }
  }
};

seedUsers().then(() => {
    console.log("seedUsers has run successfully")
    process.exit(0);
})
