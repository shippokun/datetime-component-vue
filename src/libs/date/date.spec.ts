import { dateFormat, isoFormat, joinDatetimeToISO } from './date';

describe('date.ts', () => {
  describe('dateFormat', () => {
    it('指定した形式で返すこと', () => {
      const date = new Date('2020-12-23T12:34:56.000Z');

      const result = dateFormat(date);
      expect(result).toBe('2020-12-23 21:34:56');
    });
  });
  describe('isoFormat', () => {
    it('指定した形式で返すこと', () => {
      const date = '2020-12-23T10:00:00.000Z';

      const dateResult = isoFormat(date, 'date');
      expect(dateResult).toBe('2020-12-23');

      const timeResult = isoFormat(date, 'time');
      expect(timeResult).toBe('19:00');
    });
    it('時間要素がなくても09:00で返すこと', () => {
      const date = '2020-12-23';

      const dateResult = isoFormat(date, 'date');
      expect(dateResult).toBe('2020-12-23');

      const timeResult = isoFormat(date, 'time');
      expect(timeResult).toBe('09:00');
    });
    it('ISO8601形式じゃない場合は空文字を返すこと', () => {
      const date = '2020-13-31T00:00:00.000Z';

      const result = isoFormat(date, 'date');
      expect(result).toBe('');
    });
    it('入力がundefinedの場合は空文字を返すこと', () => {
      const result = isoFormat(undefined, 'date');
      expect(result).toBe('');
    });
  });
  describe('joinDatetimeToISO', () => {
    it('入力した内容をUTCで返すこと', () => {
      const date = '2020-12-23';
      const time = '10:00';

      const result = joinDatetimeToISO(date, time);
      expect(result).toBe('2020-12-23T01:00:00.000Z');
    });
    it('日付のみ入力した場合、0時で返ってくること', () => {
      const date = '2020-12-23';

      const result = joinDatetimeToISO(date, '');
      expect(result).toBe('2020-12-22T15:00:00.000Z');
    });
    it('invalidな日付が入力された場合は、空文字が返ってくること', () => {
      const date = '2020-13-31';

      const result = joinDatetimeToISO(date, '');
      expect(result).toBe('');
    });
    it('不正な時間が入力された場合、0時で返ってくること', () => {
      const date = '2020-12-23';
      const time = 'test';

      const result = joinDatetimeToISO(date, time);
      expect(result).toBe('2020-12-22T15:00:00.000Z');
    });
  });
});
