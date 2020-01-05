import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 's-input',
  styleUrl: 'input.scss',
  scoped: true
})
export class Input {
  input: HTMLInputElement;

  @State() hasFocus = false;

  /** The input's type, one of `text`, `number`, `email`, etc. */
  @Prop() type = 'text';

  /** The input's size, one of `small`, `medium`, or `large`. */
  @Prop() size = 'medium';

  /** The input's name attribute. */
  @Prop() name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true }) value = '';

  /** The input's placeholder text. */
  @Prop() placeholder: string;

  /** Set to true to disable the input. */
  @Prop() disabled = false;

  /** Set to true to disable the input. */
  @Prop() readonly = false;

  /** The input's minlength attribute. */
  @Prop() minlength: number;

  /** The input's maxlength attribute. */
  @Prop() maxlength: number;

  /** The input's min attribute. */
  @Prop() min: number;

  /** The input's max attribute. */
  @Prop() max: number;

  /** The input's step attribute. */
  @Prop() step: number;

  /** The input's autocaptialize attribute. */
  @Prop() autocapitalize: string;

  /** The input's autocorrect attribute. */
  @Prop() autocorrect: string;

  /** The input's autocomplete attribute. */
  @Prop() autocomplete: string;

  /** The input's autofocus attribute. */
  @Prop() autofocus: boolean;

  /** The input's autocomplete attribute. */
  @Prop() inputmode: string;

  /** Set to true to add a clear button when the input is populated. */
  @Prop() clearable = false;

  /** Sets focus on the input. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the input. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  render() {
    return (
      <div
        class={{
          's-input': true,

          // Sizes
          's-input--small': this.size === 'small',
          's-input--medium': this.size === 'medium',
          's-input--large': this.size === 'large',

          // States
          's-input--disabled': this.disabled,
          's-input--focused': this.hasFocus,
          's-input--empty': this.value.length === 0
        }}
        onClick={() => this.input.focus()}
      >
        <span class="s-input__prefix">
          <slot name="prefix" />
        </span>

        <input
          ref={el => (this.input = el)}
          class="s-input__control"
          type={this.type}
          name={this.name}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          minlength={this.minlength}
          maxlength={this.maxlength}
          min={this.min}
          max={this.max}
          step={this.step}
          autoCapitalize={this.autocapitalize}
          autoComplete={this.autocomplete}
          autoCorrect={this.autocorrect}
          autoFocus={this.autofocus}
          inputMode={this.inputmode}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onInput={() => (this.value = this.input.value)}
        />

        {this.clearable ? (
          <button
            class="s-input__clear"
            onMouseDown={event => event.preventDefault()}
            onClick={() => (this.value = '')}
            tabindex="-1"
          >
            <svg viewBox="0 0 53 53">
              <g stroke="none" stroke-width="1" fill="none">
                <g transform="translate(2.000000, 2.000000)" stroke="currentColor" stroke-width="4">
                  <path d="M17.3388247,17.3388247 L31.9410878,31.9410878" stroke-linecap="round"></path>
                  <path d="M17.3388247,31.9410878 L31.9410878,17.3388247" stroke-linecap="round"></path>
                  <circle cx="24.5" cy="24.5" r="24.5"></circle>
                </g>
              </g>
            </svg>
          </button>
        ) : (
          ''
        )}

        <span class="s-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
    );
  }
}