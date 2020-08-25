process.env.mode = 'test';

import { shallowMount, createLocalVue } from "@vue/test-utils";
import router from "@/router/index.ts";
const localVue = createLocalVue();

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

import PokeDetails from "@/views/PokeDetails.vue";

describe('PokeDetails', () => {
  it('renders pokemon details', () => {
    const $route = { name: 'details', params: {name: 'test'} };
    const wrapper = shallowMount(PokeDetails,{
      localVue,
      router,
      mocks: {
        $route
      },
      stubs: ['router-link']
    });
    const pDetails = wrapper.findComponent(PokeDetails);
    expect(pDetails.exists()).toBe(true);
  })
})