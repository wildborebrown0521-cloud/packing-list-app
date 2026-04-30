import { useState } from 'react';
import type { ListItem } from '../types';

interface Props {
  items: ListItem[];
  onUpdateItem: (id: string, updates: Partial<ListItem>) => void;
  onDeleteItem: (id: string) => void;
  onMoveItem?: (itemId: string, direction: 'up' | 'down') => void;
  onReorderItems?: (newItems: ListItem[]) => void;
}

export default function ItemList({ items, onUpdateItem, onDeleteItem, onMoveItem, onReorderItems }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedId(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (itemId: string) => {
    setDragOverId(itemId);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId || !onReorderItems) return;

    const draggedIndex = items.findIndex(item => item.id === draggedId);
    const targetIndex = items.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newItems = [...items];
    [newItems[draggedIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[draggedIndex]];

    onReorderItems(newItems);
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={handleDragOver}
          onDragEnter={() => handleDragEnter(item.id)}
          onDrop={(e) => handleDrop(e, item.id)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-3 p-3 rounded-lg border transition group cursor-move ${
            draggedId === item.id
              ? 'opacity-50 bg-blue-50 border-blue-300'
              : dragOverId === item.id
              ? 'bg-blue-100 border-blue-500'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) => onUpdateItem(item.id, { checked: e.target.checked })}
            className="w-5 h-5 cursor-pointer accent-green-500"
          />
          <div className="flex-1 min-w-0">
            <label
              className={`block text-sm font-medium cursor-pointer ${
                item.checked
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              }`}
            >
              {item.name}
            </label>
            {item.quantity && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">数量:</span>
                {editingId === item.id ? (
                  <div className="flex gap-1">
                    <input
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                      className="w-12 px-2 py-1 text-xs border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min="1"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        const qty = parseInt(editQuantity);
                        if (qty > 0) {
                          onUpdateItem(item.id, { quantity: qty });
                          setEditingId(null);
                        }
                      }}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setEditQuantity(item.quantity?.toString() || '1');
                    }}
                    className="text-xs text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    {item.quantity} 個
                  </button>
                )}
              </div>
            )}
            {item.weight && (
              <p className="text-xs text-gray-500">重さ: {item.weight}</p>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            {onMoveItem && (
              <>
                <button
                  onClick={() => onMoveItem(item.id, 'up')}
                  className="text-gray-400 hover:text-blue-500 p-1"
                  title="上へ移動"
                  disabled={items[0]?.id === item.id}
                >
                  ⬆️
                </button>
                <button
                  onClick={() => onMoveItem(item.id, 'down')}
                  className="text-gray-400 hover:text-blue-500 p-1"
                  title="下へ移動"
                  disabled={items[items.length - 1]?.id === item.id}
                >
                  ⬇️
                </button>
              </>
            )}
            <button
              onClick={() => {
                if (confirm(`「${item.name}」を削除しますか？`)) {
                  onDeleteItem(item.id);
                }
              }}
              className="text-gray-400 hover:text-red-500"
              title="削除"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
