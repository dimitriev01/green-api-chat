import { CredentialsForm } from '@features/authenticate-instance';
import styles from './AuthPage.module.scss';

export function AuthPage() {
  return (
    <main className={styles.page}>
      <CredentialsForm />
    </main>
  );
}
