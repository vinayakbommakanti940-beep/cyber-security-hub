// ---------- Password Strength Checker ----------
const input = document.getElementById('pwdInput');
const fill = document.getElementById('meterFill');
const result = document.getElementById('pwdResult');
const tips = document.getElementById('pwdTips');

input.addEventListener('input', () => {
  const pwd = input.value;
  let score = 0;
  const missing = [];

  if (pwd.length >= 12) score++; else missing.push('Use at least 12 characters');
  if (/[a-z]/.test(pwd)) score++; else missing.push('Add lowercase letters');
  if (/[A-Z]/.test(pwd)) score++; else missing.push('Add uppercase letters');
  if (/[0-9]/.test(pwd)) score++; else missing.push('Add numbers');
  if (/[^A-Za-z0-9]/.test(pwd)) score++; else missing.push('Add a symbol (!@#$)');

  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#00ff9d'];

  if (pwd.length === 0) {
    fill.style.width = '0%';
    result.textContent = 'Start typing to check strength';
    tips.innerHTML = '';
    return;
  }

  fill.style.width = (score / 5) * 100 + '%';
  fill.style.background = colors[score - 1] || colors[0];
  result.textContent = 'Strength: ' + (levels[score - 1] || 'Very Weak');
  tips.innerHTML = missing.map(m => `<li>• ${m}</li>`).join('');
});

// ---------- OWASP Top 10 Cards ----------
const attacks = [
  { name: 'SQL Injection', desc: 'Untrusted input is executed as a database query.' },
  { name: 'Cross-Site Scripting (XSS)', desc: "Attacker JavaScript runs in another user's browser." },
  { name: 'Broken Access Control', desc: 'A normal user can reach admin pages or other users\' data.' },
  { name: 'Broken Authentication', desc: 'Weak sessions, stolen tokens, credential stuffing.' },
  { name: 'CSRF', desc: 'A browser is tricked into sending an action the user never intended.' },
  { name: 'Security Misconfiguration', desc: 'Debug mode on, default passwords, open ports.' },
  { name: 'Sensitive Data Exposure', desc: 'No HTTPS, weak hashing, secrets committed to Git.' },
  { name: 'SSRF', desc: 'The server is tricked into requesting internal systems.' },
  { name: 'Insecure Deserialization', desc: 'Malicious serialized objects lead to code execution.' },
  { name: 'Vulnerable Components', desc: 'Outdated libraries with known CVEs.' }
];

const grid = document.getElementById('cardGrid');
grid.innerHTML = attacks.map(a => `
  <div class="card">
    <h3>${a.name}</h3>
    <p>${a.desc}</p>
  </div>
`).join('');