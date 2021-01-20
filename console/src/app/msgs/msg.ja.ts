import { format } from 'date-fns';

export const msgs = {
  common: {
    back: '戻る',
    next: '次へ',
    cancel: 'キャンセル',
    close: '閉じる',
    ok: 'OK',
    or: 'または',
    datetime: (d: number) => {
      if (d > 0) {
        return format(d, 'yyyy/MM/dd H:mm');
      }
    },
  },
  signIn: {
    title: 'ログイン',
    social: {
      google: 'Googleでログイン',
    },
  },
  home: {
    title: 'Home',
    signOut: 'ログアウト',
    announces: {
      postCount: '投稿数',
      lastPostDate: '最終投稿',
      postBtn: '投稿',
      configBtn: '設定',
    },
  },
};
