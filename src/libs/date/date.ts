import { format, isValid, parseISO } from 'date-fns';

export const dateFormat = (
  date: Date,
  formatType = 'yyyy-MM-dd HH:mm:ss'
): string => {
  return format(date, formatType);
};

type DatetimeFormat = 'date' | 'time';

/**
 * iso8601形式で入力された日時を日付か時間を返す
 * @param datetime フォーマット対象の文字列
 * @param format 日付か時間のどちらの要素にフォーマットするか
 */
export const isoFormat = (
  datetime: string | undefined,
  format: DatetimeFormat
): string => {
  if (datetime === undefined) return '';
  if (isValid(parseISO(datetime))) {
    const date = new Date(datetime);
    if (format === 'date') return dateFormat(date, 'yyyy-MM-dd');
    else return dateFormat(date, 'HH:mm');
  } else {
    return '';
  }
};

/**
 * 日付と時間をくっつけてISO8601(UTC)形式で返す
 * @param date 日付(JST) yyyy-MM-dd
 * @param time 時間(JST) HH-mm
 */
export const joinDatetimeToISO = (date: string, time: string): string => {
  if (isValid(parseISO(date))) {
    const datetimeJST = time.match(/^\d{2}:\d{2}$/)
      ? new Date(`${date}T${time}:00+09:00`)
      : new Date(`${date}T00:00:00+09:00`);
    return datetimeJST.toISOString();
  } else {
    return '';
  }
};
