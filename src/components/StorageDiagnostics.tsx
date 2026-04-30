import { useEffect, useState } from 'react';

export default function StorageDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<{
    localStorage: boolean;
    cookie: boolean;
  } | null>(null);

  useEffect(() => {
    const results = {
      localStorage: false,
      cookie: false
    };

    // localStorage テスト
    try {
      const test = '__test__' + Date.now();
      localStorage.setItem(test, test);
      const retrieved = localStorage.getItem(test);
      localStorage.removeItem(test);
      results.localStorage = retrieved === test;
    } catch (e) {
      results.localStorage = false;
    }

    // クッキー テスト
    try {
      const test = '__test__' + Date.now();
      document.cookie = test + '=' + test + ';path=/';
      results.cookie = document.cookie.includes(test);
      document.cookie = test + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    } catch (e) {
      results.cookie = false;
    }

    setDiagnostics(results);
  }, []);

  if (!diagnostics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg border-2 border-blue-500 shadow-lg text-sm font-mono z-50">
      <div className="font-bold mb-2">📊 ストレージ診断</div>
      <div>
        localStorage: {diagnostics.localStorage ? '✅ 使用可能' : '❌ 使用不可'}
      </div>
      <div>
        クッキー: {diagnostics.cookie ? '✅ 使用可能' : '❌ 使用不可'}
      </div>
      {!diagnostics.localStorage && !diagnostics.cookie && (
        <div className="text-red-600 mt-2 font-bold">⚠️ どちらも使用不可</div>
      )}
    </div>
  );
}
