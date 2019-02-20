[![npm package](https://img.shields.io/npm/v/material-multi-picker.svg)](https://www.npmjs.com/package/material-multi-picker)
[![npm downloads](https://img.shields.io/npm/dw/material-multi-picker.svg)](https://www.npmjs.com/package/material-multi-picker)
[![licence](https://img.shields.io/npm/l/material-multi-picker.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://img.shields.io/codecov/c/gh/atropos-tech/material-multi-picker.svg)](https://codecov.io/gh/atropos-tech/material-multi-picker)
[![CircleCI](https://circleci.com/gh/atropos-tech/material-multi-picker/tree/master.svg?style=svg)](https://circleci.com/gh/atropos-tech/material-multi-picker/tree/master)
[![bundlephobia](https://img.shields.io/bundlephobia/min/material-multi-picker.svg)](https://bundlephobia.com/result?p=material-multi-picker)
[![LGTM alerts](https://img.shields.io/lgtm/alerts/g/atropos-tech/material-multi-picker.svg)](https://lgtm.com/projects/g/atropos-tech/material-multi-picker/alerts)
[![LGTM grade](https://img.shields.io/lgtm/grade/javascript/g/atropos-tech/material-multi-picker.svg)](https://lgtm.com/projects/g/atropos-tech/material-multi-picker/context:javascript)

Nested Preview component, uses React 15, material-ui 1, and downshift.

# Usage
Install with `npm install nested-preview` or `yarn add nested-preview`.

```jsx
import React from 'react';
import NestedPreview from 'nested-preview';

const FRUIT = [
    { id: "apple" }, { id: "banana" }, { id: "pear" }
]

function FruitPicker({ value, onChange }) {
    return <NestedPreview
        value={ value }
        onChange={ onChange }
        getSuggestedSections={ inputValue => FRUIT.filter(fruit => fruit.id.toLowerCase().includes(inputValue.toLowerCase()))  }
        addButtonLabel="Add another fruit"
        typeaheadLabel="Your favourite fruit"
        itemToPreviewHeader={ section => `Details for "${section.id}"` }
    />;
}
```

# Props

| Prop name | Type | Required? | Description |
| --------- | ---- | --------- | ----------- |
| `value`   | array | yes | The items that have been picked - a Preview will be displayed for each. |
| `onChange`   | function | yes | Triggers when the user adds or removed an item, either using the typeahead, or by removing a preview. |
| `getSuggestedSections`   | function | yes | Triggers when the user adds or removed an item, either using the typeahead, or by removing a preview. |
| `addButtonLabel` | string | yes | The label text for the button that appears when users can choose to select another item |
| `typeaheadLabel` | string | yes | The label text for the typeahead control |
| `itemToPreviewHeader` | function | yes | The title that appears in the preview header for an item |

