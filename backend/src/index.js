import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5300;

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Server Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', server: 'running smoothly' });
});

// Dual Login Route: Accepts Username OR Email
app.post('/api/auth/login', async (req, res) => {
  const { identifier, password } = req.body; 

  try {
    let targetEmail = identifier;

    // 1. If it's a username (no @ symbol), search the database to resolve the email
    if (!identifier.includes('@')) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', identifier)
        .single();

      if (profileError || !profile) {
        return res.status(400).json({ error: 'Username not found.' });
      }
      targetEmail = profile.email;
    }

    // 2. Pull permissions to ensure this role has authorization to log in
    const { data: userProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('role, title, can_login')
      .eq('email', targetEmail)
      .single();

    if (fetchError || !userProfile) {
      return res.status(400).json({ error: 'User profile does not exist.' });
    }

    // Guardrail check: Blocks non-dashboard staff instantly
    if (!userProfile.can_login) {
      return res.status(403).json({ 
        error: `Access Denied. The role '${userProfile.role}' does not have dashboard access.` 
      });
    }

    // 3. Complete authentication securely via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: targetEmail,
      password,
    });

    if (authError) throw authError;

    // 4. Respond with success along with explicit dashboard routing targets
    res.json({
      message: 'Login successful!',
      token: authData.session.access_token,
      user: {
        email: targetEmail,
        role: userProfile.role,
        title: userProfile.title,
        redirectTo: userProfile.role === 'teacher' ? `/dashboard/${userProfile.title}` : `/dashboard/${userProfile.role}`
      }
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server sprinting smoothly on port ${PORT}`);
});