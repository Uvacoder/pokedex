process.env.mode = 'test';

import { shallowMount, createLocalVue } from "@vue/test-utils";
const localVue = createLocalVue();

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

import PokeList from "@/views/PokeList.vue";

describe("PokeList", () => {
  it("component exists and required prop 'pokeList' is defined", () => {
    const pokeList: object[] = [];
    const wrapper = shallowMount(PokeList, {
      localVue,
      propsData: { pokeList },
      stubs: ['router-link']
    });
    const pList = wrapper.findComponent(PokeList);
    expect(pList.exists()).toBe(true);
    expect(wrapper.props('pokeList')).toHaveLength(0);
  });
});
