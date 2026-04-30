import { useState, useEffect } from 'react';
import type { PackingList, ListItem } from '../types';
import { TEMPLATES } from '../templates';
import { safeStorage } from '../utils/storage';
import ListSelector from './ListSelector';
import ListEditor from './ListEditor';
import StorageDiagnostics from './StorageDiagnostics';

export default function PackingListManager() {
  const [lists, setLists] = useState<PackingList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const saved = safeStorage.getItem('packing-lists');
    console.log('🔍 リロード時のデータ(raw):', saved);
    console.log('🔍 データの長さ:', saved?.length);
    if (saved && saved !== '[]') {
      try {
        const parsedLists = JSON.parse(saved);
        console.log('🔍 解析されたリスト:', parsedLists);
        setLists(parsedLists);
        const firstList = parsedLists[0];
        if (firstList) setSelectedListId(firstList.id);
      } catch (e) {
        console.error('❌ JSON解析エラー:', e, saved);
      }
    } else {
      console.log('⚠️ 保存されたデータがありません');
    }
  }, []);

  useEffect(() => {
    safeStorage.setItem('packing-lists', JSON.stringify(lists));
  }, [lists]);

  const selectedList = lists.find(l => l.id === selectedListId);

  const createListFromTemplate = (templateName: string) => {
    const template = TEMPLATES.find(t => t.name === templateName);
    if (!template) return;

    const newList: PackingList = {
      id: Date.now().toString(),
      name: template.name,
      createdAt: new Date().toISOString(),
      items: template.items.map(item => ({
        ...item,
        id: Date.now().toString() + Math.random(),
        checked: false,
      })),
    };

    const newLists = [...lists, newList];
    setLists(newLists);
    safeStorage.setItem('packing-lists', JSON.stringify(newLists));
    setSelectedListId(newList.id);
    setShowCreateForm(false);
    console.log('✅ テンプレートから作成・保存完了');
  };

  const deleteList = (id: string) => {
    const newLists = lists.filter(l => l.id !== id);
    setLists(newLists);
    safeStorage.setItem('packing-lists', JSON.stringify(newLists));
    if (selectedListId === id) {
      setSelectedListId(newLists[0]?.id || null);
    }
  };

  const updateItem = (itemId: string, updates: Partial<ListItem>) => {
    if (!selectedList) return;
    const updated = selectedList.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    updateList(selectedListId!, { items: updated });
  };

  const deleteItem = (itemId: string) => {
    if (!selectedList) return;
    const updated = selectedList.items.filter(item => item.id !== itemId);
    updateList(selectedListId!, { items: updated });
  };

  const updateList = (listId: string, updates: Partial<PackingList>) => {
    const newLists = lists.map(list =>
      list.id === listId ? { ...list, ...updates } : list
    );
    setLists(newLists);
    // 確実に保存
    const dataToSave = JSON.stringify(newLists);
    safeStorage.setItem('packing-lists', dataToSave);
    console.log('💾 保存しました');
  };

  const addItem = (item: Omit<ListItem, 'id'>) => {
    if (!selectedList) return;
    const newItem: ListItem = {
      ...item,
      id: Date.now().toString(),
    };
    updateList(selectedListId!, {
      items: [...selectedList.items, newItem],
    });
  };

  const saveToStorage = () => {
    safeStorage.setItem('packing-lists', JSON.stringify(lists));
    return true;
  };

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col">
      <StorageDiagnostics />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📦</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Packing List</h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ListSelector
          lists={lists}
          selectedListId={selectedListId}
          onSelectList={setSelectedListId}
          onDeleteList={deleteList}
          onCreateClick={() => setShowCreateForm(!showCreateForm)}
          showCreateForm={showCreateForm}
          templates={TEMPLATES}
          onCreateFromTemplate={createListFromTemplate}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {selectedList ? (
            <ListEditor
              list={selectedList}
              onUpdateItem={updateItem}
              onDeleteItem={deleteItem}
              onAddItem={addItem}
              onUpdateList={(updates) => updateList(selectedListId!, updates)}
              onSave={saveToStorage}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p className="text-center">
                <span className="block text-4xl mb-2">📋</span>
                リストを作成してください
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
