process.env.mode = 'test';

import { shallowMount, createLocalVue } from "@vue/test-utils";
const localVue = createLocalVue();

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

import App from "@/App.vue";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const wrapper = shallowMount(App, {
  localVue,
  propsData: {},
  mocks: {},
  stubs: {},
  methods: {},
});

describe('App', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});

describe("App", () => {
  it("should have a Navbar component", () => {
    const nav = wrapper.findComponent(Navbar)
    expect(nav.exists()).toBe(true)
  });
  it("should have a Footer component", () => {
    const ft = wrapper.findComponent(Footer)
    expect(ft.exists()).toBe(true)
  });
});
