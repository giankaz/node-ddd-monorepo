import { deepFreeze } from '../../utils';

export abstract class ValueObject<Value> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toJSON = () => JSON.parse(JSON.stringify(this._value));

  toString = () => {
    if (typeof this.value !== 'object' || this.value === null) {
      try {
        return String(this.value);
      } catch (e) {
        return this.value + '';
      }
    }
    const valueStr = this.value.toString();
    return valueStr === '[object Object]'
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
