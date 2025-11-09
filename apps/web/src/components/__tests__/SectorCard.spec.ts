import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SectorCard from "../SectorCard.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(SectorCard, { props: { index: 1, name: "化工品", score: 0.8 } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
