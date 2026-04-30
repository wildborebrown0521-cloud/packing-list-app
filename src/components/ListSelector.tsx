import type { PackingList, Template } from '../types';

interface Props {
  lists: PackingList[];
  selectedListId: string | null;
  onSelectList: (id: string) => void;
  onDeleteList: (id: string) => void;
  onCreateClick: () => void;
  showCreateForm: boolean;
  templates: Template[];
  onCreateFromTemplate: (name: string) => void;
}

export default function ListSelector({
  lists,
  selectedListId,
  onSelectList,
  onDeleteList,
  onCreateClick,
  showCreateForm,
  templates,
  onCreateFromTemplate,
}: Props) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Create Button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onCreateClick}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {showCreateForm ? '✕ キャンセル' : '+ 新規リスト'}
        </button>
      </div>

      {/* Template Selection */}
      {showCreateForm && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <p className="text-sm font-semibold text-gray-700 mb-3">テンプレートを選択</p>
          <div className="space-y-2">
            {templates.map(template => (
              <button
                key={template.name}
                onClick={() => onCreateFromTemplate(template.name)}
                className="w-full text-left text-sm px-3 py-2 hover:bg-blue-100 rounded transition text-gray-700"
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lists */}
      <div className="flex-1 overflow-y-auto">
        {lists.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            <p>リストはまだありません</p>
            <p className="mt-2 text-xs">テンプレートから作成しましょう</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {lists.map(list => (
              <li key={list.id}>
                <button
                  onClick={() => onSelectList(list.id)}
                  className={`w-full text-left px-4 py-3 transition flex justify-between items-center group ${
                    selectedListId === list.id
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{list.name}</p>
                    <p className="text-xs text-gray-500">
                      {list.items.length} 個のアイテム
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`「${list.name}」を削除しますか？`)) {
                        onDeleteList(list.id);
                      }
                    }}
                    className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                    title="削除"
                  >
                    🗑️
                  </button>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
