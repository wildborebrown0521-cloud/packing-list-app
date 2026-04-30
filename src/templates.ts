import type { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    name: 'オーストラリア旅行',
    items: [
      // 衣類
      { name: 'Tシャツ', category: 'clothing', quantity: 5 },
      { name: 'ショーツ/パンツ', category: 'clothing', quantity: 3 },
      { name: 'アンダーウェア', category: 'clothing', quantity: 5 },
      { name: 'ソックス', category: 'clothing', quantity: 5 },
      { name: 'ジャケット', category: 'clothing', quantity: 1 },
      { name: 'スイムウェア', category: 'clothing', quantity: 1 },
      // 靴・アクセサリー
      { name: '帽子', category: 'accessories', quantity: 1 },
      { name: 'サングラス', category: 'accessories', quantity: 1 },
      { name: 'スニーカー', category: 'accessories', quantity: 1 },
      { name: 'ビーチサンダル', category: 'accessories', quantity: 1 },
      // 電子機器
      { name: 'スマートフォン', category: 'electronics', quantity: 1 },
      { name: 'スマートフォン充電器', category: 'electronics', quantity: 1 },
      { name: 'モバイルバッテリー', category: 'electronics', quantity: 1 },
      { name: 'カメラ', category: 'electronics', quantity: 1 },
      { name: '変圧器/変換プラグ', category: 'electronics', quantity: 1 },
      // 書類
      { name: 'パスポート', category: 'documents', quantity: 1 },
      { name: 'ビザ（必要な場合）', category: 'documents', quantity: 1 },
      { name: '航空券（e-チケット）', category: 'documents', quantity: 1 },
      { name: 'ホテル予約確認書', category: 'documents', quantity: 1 },
      { name: '旅行保険証', category: 'documents', quantity: 1 },
      { name: 'クレジットカード/デビットカード', category: 'documents', quantity: 2 },
      // トイレタリー
      { name: '日焼け止め（高SPF）', category: 'toiletries', quantity: 1 },
      { name: 'シャンプー/リンス', category: 'toiletries', quantity: 1 },
      { name: '石鹸/ボディウォッシュ', category: 'toiletries', quantity: 1 },
      { name: '歯ブラシ/歯磨き粉', category: 'toiletries', quantity: 1 },
      { name: '薬（常用薬）', category: 'toiletries', quantity: 1 },
      { name: 'タオル', category: 'toiletries', quantity: 2 },
      // その他
      { name: 'バックパック/スーツケース', category: 'other', quantity: 1 },
      { name: '水筒', category: 'other', quantity: 1 },
      { name: 'ガイドブック', category: 'other', quantity: 1 },
    ],
  },
  {
    name: '登山',
    items: [
      // 衣類
      { name: '登山シャツ（速乾性）', category: 'clothing', quantity: 2 },
      { name: 'パンツ', category: 'clothing', quantity: 1 },
      { name: 'アンダーウェア', category: 'clothing', quantity: 3 },
      { name: 'ソックス（厚手）', category: 'clothing', quantity: 4 },
      { name: 'フリース/ジャケット', category: 'clothing', quantity: 1 },
      { name: 'レインジャケット', category: 'clothing', quantity: 1 },
      // 靴・アクセサリー
      { name: '帽子', category: 'accessories', quantity: 1 },
      { name: 'グローブ', category: 'accessories', quantity: 1 },
      { name: '登山靴', category: 'accessories', quantity: 1 },
      // 電子機器
      { name: 'ヘッドランプ', category: 'electronics', quantity: 1 },
      { name: '電池', category: 'electronics', quantity: 4 },
      { name: 'GPS/トレッキングアプリ', category: 'electronics', quantity: 1 },
      // 書類
      { name: 'トレッキングマップ', category: 'documents', quantity: 1 },
      { name: '保険情報', category: 'documents', quantity: 1 },
      // トイレタリー
      { name: '日焼け止め', category: 'toiletries', quantity: 1 },
      { name: 'リップバーム', category: 'toiletries', quantity: 1 },
      { name: 'バンドエイド', category: 'toiletries', quantity: 1 },
      { name: '鎮痛薬', category: 'toiletries', quantity: 1 },
      { name: 'ハイドレーションタブレット', category: 'toiletries', quantity: 1 },
      // その他
      { name: 'バックパック', category: 'other', quantity: 1 },
      { name: '水筒/ハイドレーション', category: 'other', quantity: 1 },
      { name: 'ロープ/カラビナ', category: 'other', quantity: 1 },
      { name: 'ナイフ/マルチツール', category: 'other', quantity: 1 },
      { name: 'ライター/マッチ', category: 'other', quantity: 1 },
      { name: '食料（エネルギーバー等）', category: 'other', quantity: 1 },
    ],
  },
  {
    name: 'ビジネス出張',
    items: [
      // 衣類
      { name: 'スーツ', category: 'clothing', quantity: 1 },
      { name: 'ドレスシャツ', category: 'clothing', quantity: 2 },
      { name: 'ネクタイ', category: 'clothing', quantity: 2 },
      { name: 'ビジネスパンツ', category: 'clothing', quantity: 1 },
      { name: 'アンダーウェア', category: 'clothing', quantity: 2 },
      { name: 'ソックス', category: 'clothing', quantity: 3 },
      // 靴・アクセサリー
      { name: 'ビジネスシューズ', category: 'accessories', quantity: 1 },
      // 電子機器
      { name: 'ノートパソコン', category: 'electronics', quantity: 1 },
      { name: 'チャージャー', category: 'electronics', quantity: 1 },
      { name: 'スマートフォン', category: 'electronics', quantity: 1 },
      { name: 'マウス/キーボード', category: 'electronics', quantity: 1 },
      // 書類
      { name: 'パスポート', category: 'documents', quantity: 1 },
      { name: '会社のID', category: 'documents', quantity: 1 },
      { name: 'プレゼン資料', category: 'documents', quantity: 1 },
      { name: 'クレジットカード', category: 'documents', quantity: 2 },
      // トイレタリー
      { name: 'トイレタリーバッグ', category: 'toiletries', quantity: 1 },
      { name: 'シェービングキット', category: 'toiletries', quantity: 1 },
      { name: 'スキンケア', category: 'toiletries', quantity: 1 },
      // その他
      { name: 'ビジネスバッグ', category: 'other', quantity: 1 },
      { name: 'メモ帳/ペン', category: 'other', quantity: 1 },
    ],
  },
  {
    name: 'ビーチリゾート',
    items: [
      // 衣類
      { name: 'Tシャツ', category: 'clothing', quantity: 5 },
      { name: 'ショーツ', category: 'clothing', quantity: 3 },
      { name: 'アンダーウェア', category: 'clothing', quantity: 5 },
      { name: 'ソックス', category: 'clothing', quantity: 2 },
      { name: 'ドレス/スカート', category: 'clothing', quantity: 2 },
      { name: 'ジャケット', category: 'clothing', quantity: 1 },
      { name: 'スイムウェア', category: 'clothing', quantity: 2 },
      // 靴・アクセサリー
      { name: 'ビーチサンダル', category: 'accessories', quantity: 1 },
      { name: '帽子', category: 'accessories', quantity: 1 },
      { name: 'サングラス', category: 'accessories', quantity: 1 },
      // 電子機器
      { name: 'スマートフォン', category: 'electronics', quantity: 1 },
      { name: 'スマートフォン充電器', category: 'electronics', quantity: 1 },
      { name: 'カメラ', category: 'electronics', quantity: 1 },
      { name: 'ワイヤレスイヤフォン', category: 'electronics', quantity: 1 },
      // 書類
      { name: 'パスポート', category: 'documents', quantity: 1 },
      { name: 'ホテル予約確認', category: 'documents', quantity: 1 },
      { name: 'クレジットカード', category: 'documents', quantity: 2 },
      // トイレタリー
      { name: '日焼け止め（SPF50+）', category: 'toiletries', quantity: 1 },
      { name: '虫よけ', category: 'toiletries', quantity: 1 },
      { name: 'アフターサンケア', category: 'toiletries', quantity: 1 },
      { name: 'シャンプー/ボディウォッシュ', category: 'toiletries', quantity: 1 },
      { name: 'タオル', category: 'toiletries', quantity: 2 },
      // その他
      { name: 'スーツケース/バックパック', category: 'other', quantity: 1 },
      { name: 'ビーチバッグ', category: 'other', quantity: 1 },
      { name: 'ドライバッグ', category: 'other', quantity: 1 },
      { name: '水筒', category: 'other', quantity: 1 },
    ],
  },
];
