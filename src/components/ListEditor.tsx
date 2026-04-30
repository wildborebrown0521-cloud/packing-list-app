import { useState } from 'react';
import type { PackingList, ListItem, Category } from '../types';
import ItemList from './ItemList';
import ItemForm from './ItemForm';

interface Props {
  list: PackingList;
  onUpdateItem: (id: string, updates: Partial<ListItem>) => void;
  onDeleteItem: (id: string) => void;
  onAddItem: (item: Omit<ListItem, 'id'>) => void;
  onUpdateList: (updates: Partial<PackingList>) => void;
  onSave?: () => boolean;
}

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'clothing', label: '衣類', icon: '👕' },
  { value: 'accessories', label: '靴・アクセサリー', icon: '👠' },
  { value: 'electronics', label: '電子機器', icon: '📱' },
  { value: 'documents', label: '書類', icon: '📄' },
  { value: 'toiletries', label: 'トイレタリー', icon: '🧴' },
  { value: 'other', label: 'その他', icon: '📦' },
];

export default function ListEditor({
  list,
  onUpdateItem,
  onDeleteItem,
  onAddItem,
  onUpdateList,
  onSave,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const filteredItems =
    selectedCategory === 'all'
      ? list.items
      : list.items.filter(item => item.category === selectedCategory);

  const checkedCount = list.items.filter(item => item.checked).length;
  const totalCount = list.items.length;

  const reorderItems = (newItems: ListItem[]) => {
    onUpdateList({ items: newItems });
  };

  const moveItem = (itemId: string, direction: 'up' | 'down') => {
    // カテゴリ内のアイテムのみを対象にする
    const targetItems = selectedCategory === 'all'
      ? list.items
      : list.items.filter(item => item.category === selectedCategory);

    const index = targetItems.findIndex(item => item.id === itemId);
    if (
      (direction === 'up' && index <= 0) ||
      (direction === 'down' && index >= targetItems.length - 1)
    ) {
      return;
    }

    // 全アイテムの中での位置を取得
    const itemToMove = list.items.find(item => item.id === itemId);
    const itemToSwap = targetItems[direction === 'up' ? index - 1 : index + 1];

    const fullIndex = list.items.findIndex(item => item.id === itemToMove?.id);
    const swapIndex = list.items.findIndex(item => item.id === itemToSwap?.id);

    const newItems = [...list.items];
    [newItems[fullIndex], newItems[swapIndex]] = [newItems[swapIndex], newItems[fullIndex]];
    onUpdateList({ items: newItems });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{list.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              作成日: {new Date(list.createdAt).toLocaleDateString('ja-JP')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {showSaveMessage && (
              <div className="text-green-600 text-sm font-semibold animate-pulse">
                ✓ 保存完了
              </div>
            )}
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              💾 保存
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">進捗度</span>
            <span className="text-sm text-gray-600">
              {checkedCount} / {totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: totalCount > 0 ? `${(checkedCount / totalCount) * 100}%` : '0%' }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-sm transition ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            すべて
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedCategory === cat.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Section */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {selectedCategory === 'all' ? (
          <>
            {list.items.length > 0 ? (
              <ItemList
                items={list.items}
                onUpdateItem={onUpdateItem}
                onDeleteItem={onDeleteItem}
                onMoveItem={moveItem}
                onReorderItems={reorderItems}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>アイテムがありません</p>
              </div>
            )}
          </>
        ) : (
          <>
            {filteredItems.length > 0 ? (
              <ItemList
                items={filteredItems}
                onUpdateItem={onUpdateItem}
                onDeleteItem={onDeleteItem}
                onMoveItem={moveItem}
                onReorderItems={reorderItems}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>アイテムがありません</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Item Section */}
      <div className="border-t border-gray-200 bg-white p-4 sm:p-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            + アイテムを追加
          </button>
        ) : (
          <ItemForm
            onSubmit={(item) => {
              onAddItem(item);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}
