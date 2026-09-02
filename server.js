require("dotenv").config();

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }

  res.json({
    message: "User signed up successfully",
    user: data.user
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }

  res.json({
    message: "Login successful",
    session: data.session
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});