/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import NestedPicker from "./index";

describe("Nested Picker", () => {
    it("renders", () => {
        const wrapper = mount(<NestedPicker value={[]} />);
        expect(wrapper).not.toBeEmptyRender();
    });
});
