const PasswordStrength = ({ password }) => {
  const requirements = [
    { re: /.{8,}/, label: 'At least 8 characters' },
    { re: /[A-Z]/, label: 'Uppercase letter' },
    { re: /[a-z]/, label: 'Lowercase letter' },
    { re: /[0-9]/, label: 'Number' },
    { re: /[^A-Za-z0-9]/, label: 'Special character' }
  ];

  const strength = requirements.reduce((score, { re }) => 
    score + (re.test(password) ? 1 : 0), 0);

  const getStrengthClass = () => {
    if (strength <= 2) return 'progress-error';
    if (strength <= 3) return 'progress-warning';
    return 'progress-success';
  };

  return (
    <div className="space-y-2">
      <progress 
        className={`progress w-full ${getStrengthClass()}`} 
        value={strength * 20} 
        max="100"
      />
      <ul className="text-sm space-y-1">
        {requirements.map(({ re, label }, index) => (
          <li 
            key={index}
            className={`flex items-center gap-2 ${
              re.test(password) ? 'text-success' : 'text-base-content/50'
            }`}
          >
            <span className={re.test(password) ? '✓' : '○'}></span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength; 