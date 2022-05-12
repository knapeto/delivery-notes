import { useLocale, useSetLocale } from 'react-admin';

import Button from '@material-ui/core/Button';

const LocaleSwitcher = () => {
  const locale = useLocale();
  const setLocale = useSetLocale();

  const onClick = newLocale => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  };

  return (
    <div>
      {locale === 'de' && <Button onClick={() => onClick('en')}>EN</Button>}
      {locale === 'en' && <Button onClick={() => onClick('de')}>DE</Button>}
    </div>
  );
};

export default LocaleSwitcher;
