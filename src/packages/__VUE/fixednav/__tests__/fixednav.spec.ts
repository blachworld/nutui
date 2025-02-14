import { config, DOMWrapper, mount } from '@vue/test-utils';
import FixedNav from '../index.vue';
import { nextTick } from 'vue';
import { Left } from '@nutui/icons-vue';
import nutOverlay from '../../overlay/index.vue';
beforeAll(() => {
  config.global.components = {
    Left,
    nutOverlay
  };
});

afterAll(() => {
  config.global.components = {};
});
describe('FixedNav', () => {
  test('base nut-fixed-nav', () => {
    const wrapper = mount(FixedNav);
    const rate = wrapper.find('.nut-fixed-nav');
    expect(rate.exists()).toBe(true);
  });

  test('should be displayed after setting the visible', () => {
    const wrapper = mount(FixedNav, {
      props: {
        visible: true,
        overlay: true
      }
    });
    const _html: DOMWrapper<Element> = wrapper.find('.nut-fixed-nav__list');
    expect(_html.exists()).toBe(true);
  });
  test('should be displayed after setting the type', () => {
    const wrapper = mount(FixedNav, {
      props: {
        type: 'left'
      }
    });
    const _html: DOMWrapper<Element> = wrapper.find('.left');
    expect(_html.exists()).toBe(true);
  });

  test('should be displayed after setting the un-active-text', async () => {
    const wrapper = mount(FixedNav, {
      props: {
        'un-active-text': '展开',
        'active-text': '收起'
      }
    });
    const _html1 = wrapper.find('.nut-overlay');
    expect(_html1.exists()).toBe(true);
    const _html = wrapper.find('.nut-fixed-nav__btn');
    expect(_html.html()).toContain('展开');
    wrapper.find('.nut-fixed-nav__btn').trigger('click');
    await nextTick();
    expect(wrapper.emitted('update:visible')![0]).toEqual([true]);
  });

  test('should be displayed after setting the position', () => {
    const wrapper = mount(FixedNav, {
      props: {
        position: { top: '210px' }
      }
    });
    const _html = wrapper.find('.nut-fixed-nav');
    expect((_html.element as HTMLElement).style.top).toBe('210px');
  });
});
