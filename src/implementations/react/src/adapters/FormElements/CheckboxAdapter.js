/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */
import * as HIG from 'hig-vanilla';

import HIGElement from '../../elements/HIGElement';
import * as PropTypes from 'prop-types';
import createComponent from '../createComponent';

export class CheckboxAdapter extends HIGElement {
  constructor(initialProps) {
    super(HIG.Checkbox, initialProps);
  }

  componentDidMount() {
    var commitProps = [];
    if (this.initialProps.disabled) {
      commitProps.push('disabled',this.initialProps.disabled);
    }
    if (this.initialProps.required) {
      commitProps.push('required',this.initialProps.required)
    }
    if (this.initialProps.checked) {
      commitProps.push('checked',this.initialProps.checked)
    }
    if (this.initialProps.onChange) {
      commitProps.push('onChange',this.initialProps.onChange)
    }
    if (this.initialProps.onFocus) {
      commitProps.push('onFocus',this.initialProps.onFocus)
    }
    if (this.initialProps.onHover) {
      commitProps.push('onHover',this.initialProps.onHover)
    }
    this.commitUpdate(commitProps);

  }

  forceReset(props) {
    this.commitUpdate(['checked', props.checked]);
  }


  commitUpdate(updatePayload, oldProps, newProps) {
    for (let i = 0; i < updatePayload.length; i += 2) {
      const propKey = updatePayload[i];
      const propValue = updatePayload[i + 1];
      switch (propKey) {
        case 'label':
          this.hig.setLabel(propValue);
          break;
        case 'name':
          this.hig.setName(propValue);
          break;
        case 'value':
          this.hig.setValue(propValue);
          break;
        case 'required':
          propValue
            ? this.hig.required(propValue)
            : this.hig.noLongerRequired();
          break;
        case 'checked':
          propValue ? this.hig.check() : this.hig.uncheck();
          break;
        case 'disabled':
          propValue ? this.hig.disable() : this.hig.enable();
          break;
        case 'onChange': {
          const dispose = this._disposeFunctions.get('onChangeDispose');
          if (dispose) {
            dispose();
          }
          this._disposeFunctions.set(
            'onChangeDispose',
            this.hig.onChange(propValue)
          );
          break;
        }
        case 'onFocus': {
          const dispose = this._disposeFunctions.get('onFocusDispose');
          if (dispose) {
            dispose();
          }
          this._disposeFunctions.set(
            'onFocusDispose',
            this.hig.onFocus(propValue)
          );
          break;
        }
        case 'onHover': {
          const dispose = this._disposeFunctions.get('onHoverDispose');
          if (dispose) {
            dispose();
          }
          this._disposeFunctions.set(
            'onHoverDispose',
            this.hig.onHover(propValue)
          );
          break;
        }
        default:
          console.warn('Unknown key, not handled: ', propKey);
      }
    }
  }
}

const CheckboxAdapterComponent = createComponent(CheckboxAdapter);

CheckboxAdapterComponent.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  required: PropTypes.string,
  onHover: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string
};

CheckboxAdapterComponent.__docgenInfo = {
  props: {
    checked: {
      description: 'boolean - sets whether the checkbox is checked'
    },
    disabled: {
      description: 'boolean - sets whether the checkbox is disabled'
    },
    label: {
      description: 'sets the label text for the checkbox'
    },
    name: {
      description: 'sets the name attribute of the checkbox input'
    },
    required: {
      description: 'string - sets the whether the checkbox is required and displays the provided message'
    },
    value: {
      description: 'sets the value attribute of the checkbox input'
    },
    onHover: {
      description: 'triggers when you hover over the button'
    },
    onChange: {
      description: 'triggers when you check/uncheck the checkbox'
    },
    onFocus: {
      description: 'triggers the checkbox component receives focus'
    }
  }
};

export default CheckboxAdapterComponent;