import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Supabase initialization
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ensure environment variables are set
    if (!supabaseUrl || !supabaseAnonKey) {
      setError('Supabase URL and Anon Key must be set.');
      console.error('Supabase URL and Anon Key must be set.');
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError('Error signing in: ' + error.message);
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col items-center">
          <h1 className='text-5xl mb-5'>Welcome to Custicate!</h1>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="px-4 dark:bg-blue-600 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
