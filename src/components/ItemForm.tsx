import { useState } from 'react';
import type { ListItem, Category } from '../types';

interface Props {
  onSubmit: (item: Omit<ListItem, 'id'>) => void;
  onCancel: () => void;
}

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'clothing', label: '衣類', icon: '👕' },
  { value: 'accessories', label: '靴・アクセサリー', icon: '👠' },
  { value: 'electronics', label: '電子機器', icon: '📱' },
  { value: 'documents', label: '書類', icon: '📄' },
  { value: 'toiletries', label: 'トイレタリー', icon: '🧴' },
  { value: 'other', label: 'その他', icon: '📦' },
];

export default function ItemForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('アイテム名を入力してください');
      return;
    }

    onSubmit({
      name: name.trim(),
      category,
      checked: false,
      quantity: quantity ? parseInt(quantity) : undefined,
      weight: weight || undefined,
    });

    setName('');
    setCategory('other');
    setQuantity('');
    setWeight('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          アイテム名 *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: Tシャツ"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          カテゴリ
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            数量
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="例: 5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            重さ
          </label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="例: 500g"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          追加
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
