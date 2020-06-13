const MESSAGES = {
  'ja': {
    'validation': {
      'valueMissing': 'このフィールドを入力してください。',
      'typeMismatch': {
        'email': 'メールアドレスを入力してください。',
        'url': 'URLを入力してください。',
      },
      'badInput': '有効な値を入力してください。',
      'patternMismatch': '指定されている形式で入力してください。',
      'tooLong': '{}文字以内で入力してください。',
      'tooShort': '{}文字以上で入力してください。',
      'rangeOverflow': '{}以下の値を入力してください。',
      'rangeUnderflow': '{}以上の値を入力してください。',
      'stepMismatch': '有効な値を入力してください。',
      'shoudBeNextDay': '翌日以降の日付を入力してください。',
      'shouldBeThreeMonth': '3ヶ月以内の日付を入力してください。',
      'mailOrAddressMismatch': 'メールアドレスまたはパスワードが違います。',
      'existsMail': 'このメールアドレスはすでに登録済みです。',
      'passwordUnmatch': '入力されたパスワードと一致しません。',
      'underTenKb': 'ファイルサイズは10KB以下にしてください。',
      'onlyImageFile': '画像ファイルを選択してください。',
    },
    'user': {
      'rank': {
        'premium': 'プレミアム会員',
        'normal': '一般会員',
      },
      'unregistered': '未登録',
      'notification': {
        'true': '受け取る',
        'false': '受け取らない',
      },
      'deleteConfirm': '退会すると全ての情報が削除されます。\nよろしいですか？',
      'deleteAlert': '退会処理を完了しました。ご利用ありがとうございました。',
    },
    'plans': {
      'premiumOnly': '❤️プレミアム会員限定❤️',
      'memberOnly': '会員限定',
      'oneAdult': '大人1名',
      'minHeadCount': '{}名様から',
      'reserveButton': 'このプランで予約',
    },
    'reserve': {
      'planDescLong': 'お一人様1泊{}〜、土日は25%アップ。{}名様〜{}名様、最長{}泊',
      'planDescShort': 'お一人様1泊{}〜、土日は25%アップ',
      'roomInfo': '部屋情報',
      'totalBill': '合計 {}（税込み）',
      'term': '{} 〜 {} {}泊',
      'headCount': '{}名様',
      'breakfast': '朝食バイキング',
      'earlyCheckIn': '昼からチェックインプラン',
      'sightseeing': 'お得な観光プラン',
      'nothing': 'なし',
      'username': '{}様',
      'contact': {
        'no': '希望しない',
        'email': 'メール：{}',
        'tel': '電話：{}',
      },
    },
  },
};

/**
 * Get translated message
 * @param {string} key
 * @param {...string} params
 * @return {string} 
 */
export function t(key, ...params) {
  const locale = document.getElementsByTagName('html')[0].lang;
  let messageStore = MESSAGES[locale];
  const keys = key.split('.');
  let message;
  for (const k of keys) {
    message = messageStore[k];
    if (typeof message === 'string') {
      break;
    } else {
      messageStore = messageStore[k];
    }
  }
  for (const p of params) {
    message = message.replace('{}', p);
  }
  return message;
}