export type Category = 'clothing' | 'accessories' | 'electronics' | 'documents' | 'toiletries' | 'other';

export interface ListItem {
  id: string;
  name: string;
  category: Category;
  checked: boolean;
  quantity?: number;
  weight?: string;
}

export interface PackingList {
  id: string;
  name: string;
  createdAt: string;
  items: ListItem[];
}

export interface Template {
  name: string;
  items: Omit<ListItem, 'id' | 'checked'>[];
}
