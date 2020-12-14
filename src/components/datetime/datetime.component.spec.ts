import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VuetifyType from 'vuetify/types';

import DatetimeComponent from './datetime.component.vue';
import * as DateLibs from '@/libs/date';

jest.mock('@/libs/date', () => ({
  isoFormat: jest.fn(),
  joinDatetimeToISO: jest.fn()
}));

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('datetime.component.vue', () => {
  let vuetify: VuetifyType;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render', () => {
    const wrapper = mount(DatetimeComponent, {
      localVue,
      vuetify,
      propsData: {
        value: ''
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
  it('call emitted', async () => {
    const isoFormatMock = jest
      .spyOn(DateLibs, 'isoFormat')
      .mockImplementation(() => '');
    const joinDateTimeToISOMock = jest.spyOn(DateLibs, 'joinDatetimeToISO');

    const wrapper = mount(DatetimeComponent, {
      localVue,
      vuetify,
      propsData: {
        value: ''
      }
    });

    expect(isoFormatMock.mock.calls.length).toBe(2);
    expect(isoFormatMock.mock.calls[0]).toEqual(['', 'date']);
    expect(isoFormatMock.mock.calls[1]).toEqual(['', 'time']);

    expect(joinDateTimeToISOMock.mock.calls.length).toBe(1);
    expect(joinDateTimeToISOMock.mock.calls[0]).toEqual(['', '']);

    const inputData = '09:00';
    jest.spyOn(DateLibs, 'joinDatetimeToISO').mockReturnValue(inputData);
    const timeInput = wrapper.find('input[type="time"]');
    await timeInput.setValue(inputData);
    expect(
      (wrapper.find('input[type="time"]').element as HTMLInputElement).value
    ).toBe(inputData);

    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')?.[0]).toStrictEqual([inputData]);

    const nextProp = '1990-01-01';
    await wrapper.setProps({ value: nextProp });

    expect(isoFormatMock.mock.calls.length).toBe(4);
    expect(isoFormatMock.mock.calls[2]).toEqual([nextProp, 'date']);
    expect(isoFormatMock.mock.calls[3]).toEqual([nextProp, 'time']);
  });
});
