// ストレージの動作テスト
let useLocalStorage = false;
let useCookie = false;

try {
  const test = '__test__' + Date.now();
  localStorage.setItem(test, test);
  const retrieved = localStorage.getItem(test);
  localStorage.removeItem(test);
  useLocalStorage = retrieved === test;
  console.log('📝 localStorage テスト:', useLocalStorage ? '✅ 使用可能' : '❌ 使用不可');
} catch (e) {
  console.log('📝 localStorage テスト: ❌ エラー', e);
}

try {
  const test = '__test__' + Date.now();
  document.cookie = test + '=' + test + ';path=/';
  useCookie = document.cookie.includes(test);
  document.cookie = test + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
  console.log('📝 クッキー テスト:', useCookie ? '✅ 使用可能' : '❌ 使用不可');
} catch (e) {
  console.log('📝 クッキー テスト: ❌ エラー', e);
}

export const safeStorage = {
  getItem: (key: string): string | null => {
    if (useLocalStorage) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('❌ localStorage getItem エラー:', e);
      }
    }

    if (useCookie) {
      try {
        const name = key + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
          const cookie = cookieArray[i].trim();
          if (cookie.indexOf(name) === 0) {
            return decodeURIComponent(cookie.substring(name.length));
          }
        }
      } catch (e) {
        console.error('❌ クッキー getItem エラー:', e);
      }
    }

    return null;
  },

  setItem: (key: string, value: string): boolean => {
    if (useLocalStorage) {
      try {
        localStorage.setItem(key, value);
        console.log('✅ localStorage に保存:', key, value.length + 'bytes');
        return true;
      } catch (e) {
        console.error('❌ localStorage setItem エラー:', e);
      }
    }

    if (useCookie) {
      try {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 365 * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + expiryDate.toUTCString();
        document.cookie = key + '=' + encodeURIComponent(value) + ';' + expires + ';path=/';
        console.log('✅ クッキーに保存:', key, value.length + 'bytes');
        return true;
      } catch (e) {
        console.error('❌ クッキー setItem エラー:', e);
      }
    }

    console.warn('⚠️ 使用可能なストレージがありません');
    return false;
  }
};
