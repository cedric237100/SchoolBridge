import { useState } from 'react';

const colors = {
  green: '#1a7a4a',
  green2: '#25a165',
  red: '#ce1126',
  yellow: '#f6c90e',
  bg: '#f7f5f0',
  dark: '#111810',
  muted: '#6b7160',
  card: '#ffffff',
  border: '#e4e0d8',
};

const styles = {
  page: {
    minHeight: '100vh',
    background: colors.bg,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 5vw',
    background: colors.card,
    borderBottom: `1px solid ${colors.border}`,
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 800,
    fontSize: '1.3rem',
    textDecoration: 'none',
    color: colors.dark,
  },
  logoSpan: {
    color: colors.green,
  },
  navLink: {
    fontSize: '0.85rem',
    color: colors.muted,
    textDecoration: 'none',
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1rem',
  },
  card: {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(26,122,74,0.1)',
    border: `1px solid rgba(26,122,74,0.25)`,
    color: colors.green,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0.35rem 0.9rem',
    borderRadius: '100px',
    marginBottom: '1rem',
  },
  dot: {
    width: '6px',
    height: '6px',
    background: colors.green2,
    borderRadius: '50%',
    display: 'inline-block',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.7rem',
    fontWeight: 800,
    color: colors.dark,
    margin: '0 0 0.4rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.88rem',
    color: colors.muted,
    margin: 0,
  },
  switcher: {
    display: 'flex',
    background: colors.bg,
    border: `1.5px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '4px',
    marginBottom: '1.8rem',
    gap: '4px',
  },
  switcherBtn: (active) => ({
    flex: 1,
    padding: '0.6rem',
    border: 'none',
    borderRadius: '9px',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: active ? colors.green : 'transparent',
    color: active ? '#fff' : colors.muted,
    boxShadow: active ? '0 2px 8px rgba(26,122,74,0.25)' : 'none',
  }),
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1.2rem',
  },
  label: {
    fontSize: '0.82rem',
    fontWeight: 600,
    color: colors.dark,
  },
  input: (focused) => ({
    padding: '0.75rem 1rem',
    border: `1.5px solid ${focused ? colors.green : colors.border}`,
    borderRadius: '10px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.9rem',
    background: colors.bg,
    color: colors.dark,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: focused ? '0 0 0 3px rgba(26,122,74,0.1)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }),
  pwdWrap: {
    position: 'relative',
  },
  pwdInput: (focused) => ({
    padding: '0.75rem 3rem 0.75rem 1rem',
    border: `1.5px solid ${focused ? colors.green : colors.border}`,
    borderRadius: '10px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.9rem',
    background: colors.bg,
    color: colors.dark,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: focused ? '0 0 0 3px rgba(26,122,74,0.1)' : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }),
  eyeBtn: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: colors.muted,
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  forgotLink: {
    fontSize: '0.8rem',
    color: colors.green,
    textDecoration: 'none',
    fontWeight: 600,
    display: 'block',
    textAlign: 'right',
    marginTop: '-0.6rem',
    marginBottom: '1.4rem',
  },
  submitBtn: (hovered) => ({
    width: '100%',
    padding: '0.85rem',
    background: hovered ? colors.green2 : colors.green,
    color: '#fff',
    border: 'none',
    borderRadius: '100px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.22s',
    boxShadow: hovered
      ? '0 8px 30px rgba(26,122,74,0.4)'
      : '0 4px 16px rgba(26,122,74,0.25)',
    transform: hovered ? 'translateY(-2px)' : 'none',
    marginBottom: '1rem',
  }),
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    margin: '0.2rem 0 1rem',
    color: colors.muted,
    fontSize: '0.8rem',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: colors.border,
  },
  googleBtn: (hovered) => ({
    width: '100%',
    padding: '0.8rem',
    background: hovered ? '#f5f5f5' : colors.card,
    color: colors.dark,
    border: `1.5px solid ${colors.border}`,
    borderRadius: '100px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
  }),
  registerWrap: {
    textAlign: 'center',
    marginTop: '1.6rem',
    fontSize: '0.85rem',
    color: colors.muted,
  },
  registerLink: {
    color: colors.green,
    fontWeight: 700,
    textDecoration: 'none',
  },
  footer: {
    textAlign: 'center',
    padding: '1.2rem',
    fontSize: '0.78rem',
    color: colors.muted,
    borderTop: `1px solid ${colors.border}`,
  },
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2045c0-.638-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087C16.6582 14.0127 17.64 11.8055 17.64 9.2045z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3441 0-4.3296-1.5832-5.0386-3.7105H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
      <path d="M3.9614 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1027-1.17.2827-1.71V4.9582H.9574C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9574 4.0418L3.9614 10.71z" fill="#FBBC05"/>
      <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9574 4.9582L3.9614 7.29C4.6704 5.1627 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export default function Login() {
  const [role, setRole] = useState('parent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [googleHovered, setGoogleHovered] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ role, email, password });
  }

  function handleGoogle() {
    window.location.href = '/api/auth/google';
  }

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <a href="index.html" style={styles.logo}>
          School<span style={styles.logoSpan}>Bridge</span>
        </a>
        <a href="inscription.html" style={styles.navLink}>
          Pas encore inscrit ? <strong style={{ color: colors.green }}>S'inscrire</strong>
        </a>
      </nav>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.badge}>
              <span style={styles.dot} />
              SchoolBridge · Cameroun
            </div>
            <h1 style={styles.title}>Bon retour 👋</h1>
            <p style={styles.subtitle}>Connectez-vous à votre espace personnel</p>
          </div>

          {/* Role switcher */}
          <div style={styles.switcher} role="group" aria-label="Type de compte">
            <button
              type="button"
              style={styles.switcherBtn(role === 'parent')}
              onClick={() => setRole('parent')}
            >
              👪 Parent
            </button>
            <button
              type="button"
              style={styles.switcherBtn(role === 'repetiteur')}
              onClick={() => setRole('repetiteur')}
            >
              👨‍🏫 Répétiteur
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={styles.fieldWrap}>
              <label htmlFor="email" style={styles.label}>Adresse email</label>
              <input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={styles.input(emailFocused)}
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div style={styles.fieldWrap}>
              <label htmlFor="password" style={styles.label}>Mot de passe</label>
              <div style={styles.pwdWrap}>
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPwdFocused(true)}
                  onBlur={() => setPwdFocused(false)}
                  style={styles.pwdInput(pwdFocused)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? 'Masquer le mot de passe' : 'Voir le mot de passe'}
                  tabIndex={-1}
                >
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            <a href="#" style={styles.forgotLink}>Mot de passe oublié ?</a>

            {/* Submit */}
            <button
              type="submit"
              style={styles.submitBtn(submitHovered)}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
            >
              Se connecter
            </button>
          </form>

          {/* Divider */}
          <div style={styles.divider}>
            <span style={styles.dividerLine} />
            ou
            <span style={styles.dividerLine} />
          </div>

          {/* Google */}
          <button
            type="button"
            style={styles.googleBtn(googleHovered)}
            onMouseEnter={() => setGoogleHovered(true)}
            onMouseLeave={() => setGoogleHovered(false)}
            onClick={handleGoogle}
          >
            <GoogleIcon />
            Continuer avec Google
          </button>

          {/* Register link */}
          <p style={styles.registerWrap}>
            Pas encore de compte ?{' '}
            <a href="inscription.html" style={styles.registerLink}>
              S'inscrire gratuitement
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2026 SchoolBridge · Cameroun 🇨🇲
      </footer>
    </div>
  );
}
