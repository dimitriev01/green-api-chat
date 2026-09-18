import { FormEvent, useState } from 'react';
import { useInstanceStore } from '@entities/instance';
import { getStateInstance } from '../api/getStateInstance';
import styles from './CredentialsForm.module.scss';
import { getApiErrorMessage } from '@shared/api';

export function CredentialsForm() {
  const setCredentials = useInstanceStore((state) => state.setCredentials);
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    const normalizedApiUrl = apiUrl.trim().replace(/\/+$/, '');

    if (!normalizedApiUrl || !idInstance.trim() || !apiTokenInstance.trim()) {
      setError('Enter API URL, ID Instance and API Token Instance.');
      return;
    }

    try {
      const url = new URL(normalizedApiUrl);

      if (url.protocol !== 'https:') {
        throw new Error();
      }
    } catch {
      setError('Enter a valid HTTPS API URL.');
      return;
    }

    const credentials = {
      apiUrl: normalizedApiUrl,
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };

    try {
      setIsLoading(true);
      const response = await getStateInstance(credentials);

      if (response.stateInstance !== 'authorized') {
        setError(`Instance is not authorized: ${response.stateInstance}`);
        return;
      }

      setCredentials(credentials);
    } catch (error) {
      setError(
        getApiErrorMessage(error, 'Unable to validate GREEN-API credentials.'),
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.brand}>GREEN-API Chat</div>

      <label>
        API URL
        <input
          value={apiUrl}
          onChange={(event) => setApiUrl(event.target.value)}
          placeholder="https://3100.api.green-api.com"
          autoComplete="off"
        />
      </label>

      <label>
        ID Instance
        <input
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
          placeholder="1101000001"
          autoComplete="off"
        />
      </label>

      <label>
        API Token Instance
        <input
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.target.value)}
          placeholder="Enter token"
          type="password"
          autoComplete="off"
        />
      </label>

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Checking…' : 'Log in'}
      </button>
    </form>
  );
}
