<script>
  import Test from './Test.svelte'
  import Switch from '@/components/common/Switch.svelte'
  import Checkbox from '@/components/common/Checkbox.svelte'
  import Radio from '@/components/common/Radio.svelte'
  import ThemeSwitcher from './ThemeSwitcher.svelte'

  let switchGroup = [2]
  let checkboxGroup = [2]
  let radioGroup = 2
</script>

<ThemeSwitcher />

<hr />

<h4>Radio</h4>
<div class="flex gap-4 items-center">
  <Radio label="Disable" name="radio-name" bind:group={radioGroup} value={1} />
  <Radio label="Default" name="radio-name" bind:group={radioGroup} value={2} />
  <Radio
    class="mui-radio"
    label="Mui"
    name="radio-styled-name"
    disabled={radioGroup === 1}
    checked
    value={1}
  >
    <svelte:fragment slot="base">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
        />
      </svg>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M6.5 6.5a4.95 4.95 0 1 1 7 7 4.95 4.95 0 1 1-7-7z" />
      </svg>
    </svelte:fragment>
  </Radio>
  <Radio
    class="button-radio"
    name="radio-styled-name"
    disabled={radioGroup === 1}
    value={2}
  >
    <svelte:fragment slot="base">Button</svelte:fragment>
  </Radio>
  <Radio
    class="carbon-radio"
    label="Carbon"
    name="radio-styled-name"
    disabled={radioGroup === 1}
    value={3}
  />
</div>

<hr />

<h4>Checkbox</h4>
<div class="flex gap-4 items-center">
  <Checkbox label="Disable" bind:group={checkboxGroup} value={1} />
  <Checkbox
    label="Default"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  />
  <Checkbox
    class="mui-checkbox"
    label="Mui"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      slot="base"
      let:checked
      let:indeterminate
    >
      {#if indeterminate}
        <path
          d="M16 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-2 10H4V8h10Z"
        />
      {:else if checked}
        <path
          d="M16 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7 14 2 9l1.41-1.41L7 11.17l7.59-7.59L16 5Z"
        />
      {:else}
        <path
          d="M16 2v14H2V2h14m0-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"
        />
      {/if}
    </svg>
  </Checkbox>
  <Checkbox
    class="blueprint-checkbox"
    label="Blueprint"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg viewBox="0 0 16 16" slot="checked-icon">
      <path
        d="M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z"
      />
    </svg>
    <svg viewBox="0 0 16 16" slot="indeterminate-icon">
      <path
        d="M11 7H5c-.55 0-1 .45-1 1s.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1z"
      />
    </svg>
  </Checkbox>
  <Checkbox
    class="notify-checkbox"
    aria-label="Notify"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" slot="base" let:checked>
      {#if checked}
        <path
          d="M21.5 8.99992H19.5V8.80992C19.5 6.89992 18.39 5.18991 16.6 4.32991L17.47 2.52991C19.96 3.71991 21.5 6.12992 21.5 8.80992V8.99992ZM4.5 8.80992C4.5 6.89992 5.61 5.18991 7.4 4.32991L6.53 2.52991C4.04 3.71991 2.5 6.12992 2.5 8.80992V8.99992H4.5V8.80992ZM12 21.9999C13.1 21.9999 14 21.0999 14 19.9999H10C10 21.0999 10.9 21.9999 12 21.9999ZM20 17.3499V18.9999H4V17.3499L6 15.4699V10.3199C6 7.39991 7.56 5.09992 10 4.33992V3.95991C10 2.53991 11.49 1.45991 12.99 2.19991C13.64 2.51991 14 3.22991 14 3.95991V4.34991C16.44 5.09991 18 7.40991 18 10.3299V15.4799L20 17.3499Z"
        />
      {:else}
        <path
          d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"
        />
      {/if}
    </svg>
  </Checkbox>
  <Checkbox
    class="chakra-checkbox"
    label="Chakra UI"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg viewBox="0 0 12 10" slot="checked-icon">
      <polyline points="1.5 6 4.5 9 10.5 1" />
    </svg>
    <svg viewBox="0 0 24 24" slot="indeterminate-icon">
      <line x1="21" x2="3" y1="12" y2="12" />
    </svg>
  </Checkbox>
  <Checkbox
    class="yandex-checkbox"
    label="Yandex"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg width="18" height="18" slot="checked-icon">
      <path
        d="M15.623 1l-9.15 13.174-4.287-4.6L1 11.03 6.62 17 17 2.27 15.623 1z"
      />
    </svg>
    <svg width="17" height="17" slot="indeterminate-icon">
      <path d="M4 7h9v3H4z" />
    </svg>
  </Checkbox>
</div>

<hr />

<h4>Switch</h4>
<div class="flex gap-4 items-center">
  <Switch label="Disable" bind:group={switchGroup} value={1} />
  <Switch
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
    let:disabled
  >
    Disabled
    <a
      href="#123"
      tabindex={disabled ? -1 : null}
      style={disabled ? 'color: inherit' : ''}
    >
      Link
    </a>
  </Switch>
  <Switch
    class="android-switch"
    label="Android 12"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  >
    <svelte:fragment slot="track">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19,13H5V11H19V13Z" />
      </svg>
    </svelte:fragment>
  </Switch>
  <Switch
    class="ant-switch"
    label="Ant"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  />
  <Switch
    class="shoelace-switch"
    label="Shoelace"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  />
  <Switch
    class="MUI-switch"
    label="MUI"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  >
    <svg viewBox="0 0 20 20" aria-hidden="true" slot="thumb" let:checked>
      {#if checked}
        <path
          d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"
        />
      {:else}
        <path
          d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"
        />
      {/if}
    </svg>
  </Switch>
  <Switch
    class="mui-switch"
    label="Mui"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  />
</div>

<hr />

<Test />

<style lang="postcss" global>
  :root {
    color-scheme: light;
    --dark-theme: 0;
    --theme-color: hsl(179 51% 39%);
    --text-color: hsl(218 23% 23%);
    --bg-color: #ffffff;
    --divider-color: hsl(214 32% 91%);
    --button-text-color: #ffffff;
  }

  [data-theme='dark'] {
    color-scheme: dark;
    --dark-theme: 1;
    --theme-color: hsl(174 59% 56%);
    --text-color: hsl(0 0% 100% / 92%);
    --bg-color: hsl(220 26% 14%);
    --divider-color: rgb(255 255 255 / 16%);
    --button-text-color: #1a202c;
    --focus-ring-color: var(--text-color);
    --focus-ring-width: 2px;
    --focus-ring-offset: 3px;

    --switch-color: hsl(0 0% 100% / 24%);
    --checkbox-color: hsl(0 0% 100% / 50%);
    --checkbox-disabled-color: hsl(0 0% 100% / 30%);
    --checkbox-icon-color: hsl(230 21% 11%);
    --radio-color: hsl(0 0% 100% / 50%);
    --radio-disabled-color: hsl(0 0% 100% / 30%);
    --radio-dot-color: hsl(230 21% 11%);
  }

  .button.button {
    color: var(--button-text-color);
  }

  hr {
    background-color: var(--divider-color);
  }

  /* Radio */
  .mui-radio.radio {
    --radio-size: 20px;
    --radio-color: hsl(0 0% 0% / 60%);
    --radio-active-color: hsl(210 79% 46%);
    --radio-disabled-color: hsl(0 0% 0% / 26%);

    [data-theme='dark'] & {
      --radio-color: hsl(0 0% 100% / 70%);
      --radio-active-color: hsl(207 90% 77%);
      --radio-disabled-color: rgb(255 255 255 / 30%);
    }

    .radio__base {
      outline: 0;
      transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
      display: grid;

      &::before {
        width: 40px;
        height: 40px;
      }

      svg {
        grid-area: 1 / -1;

        &:last-child {
          transform: scale(0);
          transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
        }
      }
    }
    &_checked .radio__base {
      svg:last-child {
        transform: scale(1);
      }
    }
    &_focus-visible .radio__base::before {
      background-color: currentColor;
      animation: ripple-check 150ms var(--ease-out) forwards;
    }
    &_focus-visible&_checked .radio__base::before {
      animation: ripple-checked 150ms var(--ease-out) forwards;
    }
  }

  .button-radio.radio {
    --radio-border-color: #e2e8f0;

    [data-theme='dark'] & {
      --radio-border-color: rgba(255, 255, 255, 0.16);
    }

    .radio__base {
      display: block;
      padding: 4px 7px;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      border: 1px solid var(--radio-border-color);
      color: inherit;
      font-size: 14px;
      outline: 0;
    }
    &_checked .radio__base {
      background-color: rgb(44, 122, 123);
      border-color: rgb(44, 122, 123);
      color: #ffffff;
    }
    &_focus-visible .radio__base {
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
    }
    &_disabled .radio__base {
      filter: grayscale(1) opacity(0.6);
    }
  }

  .carbon-radio.radio {
    --radio-size: 18px;
    --radio-color: #161616;
    --radio-active-color: var(--radio-color);
    --radio-disabled-color: #c6c6c6;
    --radio-dot-color: var(--radio-color);
    --radio-dot-disabled-color: var(--radio-disabled-color);
    --radio-focus-ring-color: rgb(15, 98, 254);

    [data-theme='dark'] & {
      --radio-color: #f4f4f4;
      --radio-disabled-color: #6f6f6f;
      --radio-focus-ring-color: rgb(255, 255, 255);
    }

    .radio__base {
      outline: 0;
    }
    &_focus-visible .radio__base {
      box-shadow: 0 0 0 2px var(--radio-focus-ring-color);
    }
    .radio__box {
      font-size: 8px;
      border-width: 1px;
    }
    &_checked .radio__box {
      background-color: transparent;
    }
    &_checked&_disabled .radio__box {
      background-color: transparent;
    }
  }

  /* Checkbox */
  @define-mixin ripple $name {
    @keyframes $name {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: var(--ripple-opacity, 0.15);
      }
    }
  }
  @mixin ripple ripple-check;
  @mixin ripple ripple-checked;

  .mui-checkbox.checkbox {
    --checkbox-size: 18px;
    --checkbox-color: hsl(0 0% 0% / 60%);
    --checkbox-active-color: hsl(210 79% 46%);
    --checkbox-disabled-color: hsl(0 0% 0% / 26%);

    [data-theme='dark'] & {
      --checkbox-color: hsl(0 0% 100% / 70%);
      --checkbox-active-color: hsl(207 90% 77%);
      --checkbox-disabled-color: rgb(255 255 255 / 30%);
    }

    .checkbox__base {
      outline: 0;
      border-radius: 50%;

      &::before {
        width: 40px;
        height: 40px;
      }
    }
    &_focus-visible .checkbox__base::before {
      background-color: currentColor;
      animation: ripple-check 150ms var(--ease-out) forwards;
    }
    &_focus-visible&_checked .checkbox__base::before {
      animation: ripple-checked 150ms var(--ease-out) forwards;
    }
  }

  .blueprint-checkbox.checkbox {
    --checkbox-size: 16px;
    --checkbox-label-line-height: 1.28581;
    --checkbox-color: #f5f8fa;
    --checkbox-active-color: #137cbd;
    --checkbox-disabled-color: rgba(206, 217, 224, 0.5);
    --checkbox-icon-color: #ffffff;

    --checkbox-hover-color: #ebf1f5;
    --checkbox-box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
      inset 0 -1px 0 rgba(16, 22, 26, 0.1);
    --checkbox-box-gradient: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.8),
      hsla(0, 0%, 100%, 0)
    );
    --checkbox-box-active-gradient: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.1),
      hsla(0, 0%, 100%, 0)
    );

    [data-theme='dark'] & {
      --checkbox-color: #394b59;
      --checkbox-disabled-color: rgba(57, 75, 89, 0.5);
      --checkbox-hover-color: #30404d;
      --checkbox-box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
      --checkbox-box-gradient: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0.05),
        hsla(0, 0%, 100%, 0)
      );
    }

    &:hover {
      --checkbox-active-color: #106ba3;
      --checkbox-color: var(--checkbox-hover-color);
    }

    .checkbox__base {
      border-radius: 3px;
    }
    &_focus-visible .checkbox__base {
      outline: 2px auto rgba(19, 124, 189, 0.6);
      outline-offset: 2px;
    }
    .checkbox__box {
      border: 0;
      background-image: var(--checkbox-box-gradient);
      background-color: var(--checkbox-color);
      box-shadow: var(--checkbox-box-shadow);
    }
    &_checked .checkbox__box,
    &_indeterminate .checkbox__box {
      background-image: var(--checkbox-box-active-gradient);
      background-color: var(--checkbox-active-color);
    }
    &_disabled .checkbox__box {
      background: var(--checkbox-disabled-color);
      box-shadow: none;
    }
    .checkbox__label {
      font-size: 14px;
    }
  }

  .notify-checkbox.checkbox {
    --checkbox-size: 24px;
    --checkbox-color: currentColor;
    --checkbox-active-color: var(--checkbox-color);

    .checkbox__base {
      outline: 0;
      border-radius: 50%;

      &::before {
        width: 40px;
        height: 40px;
      }
    }

    &_focus-visible .checkbox__base::before {
      background-color: currentColor;
      animation: ripple-check 150ms var(--ease-out) forwards;
    }

    &_focus-visible&_checked .checkbox__base::before {
      animation: ripple-checked 150ms var(--ease-out) forwards;
    }
  }

  .chakra-checkbox.checkbox {
    --checkbox-size: 16px;
    --checkbox-color: #e2e8f0;
    --checkbox-active-color: #3182ce;
    --checkbox-active-hover-color: #2b6cb0;
    --checkbox-disabled-color: #e2e8f0;
    --checkbox-icon-color: #ffffff;
    --checkbox-icon-disabled-color: #718096;

    [data-theme='dark'] & {
      --checkbox-color: rgb(255 255 255 / 0.16);
      --checkbox-active-color: #90cdf4;
      --checkbox-active-hover-color: #63b3ed;
      --checkbox-disabled-color: rgb(255 255 255 / 0.16);
      --checkbox-icon-color: #171923;
      --checkbox-icon-disabled-color: rgba(255 255 255 / 0.36);
    }

    .checkbox__base {
      outline: 0;

      &:hover {
        --checkbox-active-color: var(--checkbox-active-hover-color);
      }
    }
    &_focus-visible .checkbox__base {
      box-shadow: 0 0 0 3px rgb(66 153 225 / 0.6);
    }
    .checkbox__box {
      border-width: 2px;

      svg {
        fill: none;
        stroke: currentcolor;
      }
    }
    &_checked .checkbox__box {
      font-size: 10px;

      svg {
        stroke-width: 2;
        stroke-dasharray: 16;
        animation: checked-icon 250ms cubic-bezier(0.4, 0, 0.2, 1) both;
      }

      @keyframes checked-icon {
        0% {
          opacity: 0.5;
          stroke-dashoffset: 16;
        }
        100% {
          opacity: 1;
          stroke-dashoffset: 0;
        }
      }
    }
    &_indeterminate .checkbox__box {
      font-size: 12px;

      svg {
        stroke-width: 4;
        animation: indeterminate-icon 200ms cubic-bezier(0.4, 0, 0.2, 1) both;
      }

      @keyframes indeterminate-icon {
        0% {
          opacity: 0.5;
          transform: scaleX(0.7);
        }
        100% {
          opacity: 1;
          transform: none;
        }
      }
    }
    &_indeterminate&_disabled .checkbox__box {
      color: var(--checkbox-icon-color);
    }
    &_disabled .checkbox__box {
      background-color: var(--checkbox-disabled-color);
      border-color: transparent;
    }
  }

  .yandex-checkbox.checkbox {
    --checkbox-size: 17px;
    --checkbox-color: rgba(0, 0, 0, 0.2);
    --checkbox-active-color: hsl(47 100% 81%);
    --checkbox-disabled-color: hsl(218 10% 74%);
    --checkbox-icon-color: #000000;
    --checkbox-hover-color: rgba(0, 0, 0, 0.3);
    --checkbox-border-active-color: rgba(153, 122, 0, 0.5);
    --checkbox-border-active-hover-color: rgba(129, 103, 0, 0.6);

    [data-theme='dark'] & {
      --checkbox-color: rgba(255, 255, 255, 0.3);
      --checkbox-hover-color: rgba(255, 255, 255, 0.4);
      --checkbox-disabled-color: hsl(0 0% 100% / 30%);
      --checkbox-border-active-color: hsl(47 100% 81%);
      --checkbox-border-active-hover-color: hsl(47 90% 62%);
    }

    &:hover {
      --checkbox-color: var(--checkbox-hover-color);
      --checkbox-border-active-color: var(--checkbox-border-active-hover-color);
    }

    .checkbox__base {
      border-radius: 3px;
      outline: 0;
    }
    .checkbox__box {
      border-width: 1px;
      background-clip: padding-box;

      svg {
        height: auto;
      }
    }
    &_checked .checkbox__box {
      svg {
        position: relative;
        left: 3px;
        bottom: 4px;
      }
    }
    &_checked .checkbox__box,
    &_indeterminate .checkbox__box {
      border-color: var(--checkbox-border-active-color);
    }
    &_focus-visible .checkbox__box {
      border-width: 2px;
      border-color: #ffdb4d;
    }
    &_checked&_disabled .checkbox__box,
    &_indeterminate&_disabled .checkbox__box {
      border-color: var(--checkbox-disabled-color);
    }
    &_focus-visible&_checked .checkbox__box {
      border-color: #fc0;
    }
  }

  /* Switch */
  .android-switch.switch {
    --switch-width: 42px;
    --switch-height: 22px;
    --switch-thumb-size: 16px;
    --switch-color: hsl(0 0% 0% / 0.38);
    --switch-active-color: hsl(210 79% 46% / 0.5);
    --switch-thumb-color: #ffffff;
    --switch-thumb-active-color: #1976d2;
    --switch-track-icon-color: #ffffff;
    --ripple-opacity: 0.2;

    [data-theme='dark'] & {
      --switch-color: rgb(255 255 255 / 0.3);
      --switch-active-color: hsl(210 60% 46% / 0.7);
      --switch-thumb-color: rgb(224 224 224);
      --switch-thumb-active-color: rgb(144 202 249);
      --switch-track-icon-color: rgba(0 0 0 / 0.87);
    }

    .switch__base {
      outline: 0;
    }
    .switch__track {
      font-size: 16px;
      color: var(--switch-track-icon-color);
      position: relative;

      svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &:first-child {
          left: 4px;
        }
        &:last-child {
          right: 4px;
        }
      }
    }
    &_focus-visible .switch__thumb::before {
      content: '';
      position: absolute;
      width: 240%;
      height: 240%;
      top: 50%;
      left: 50%;
      border-radius: inherit;
      background-color: inherit;
      animation: ripple-check 200ms var(--ease-out) forwards;
    }
    &_focus-visible&_checked .switch__thumb::before {
      animation: ripple-checked 200ms var(--ease-out) forwards;
    }
  }

  .ant-switch.switch {
    --switch-width: 44px;
    --switch-height: 22px;
    --switch-thumb-size: 18px;
    --switch-transition: 0.2s ease-in-out;
    --switch-color: hsl(0 0% 0% / 25%);
    --switch-active-color: hsl(209 100% 55%);
    --switch-thumb-color: #ffffff;
    --switch-thumb-active-color: var(--switch-thumb-color);
    --focus-ring-color: hsl(0 0% 0% / 10%);
    --focus-ring-active-color: hsl(199 100% 95%);
    --focus-ring-width: 3px;
    --focus-ring-offset: 0;

    :where([data-theme='dark']) & {
      --switch-color: hsl(0 0% 100% / 30%);
      --switch-active-color: hsl(209 81% 48%);
      --focus-ring-color: rgb(255 255 255 / 10%);
      --focus-ring-active-color: hsl(209 81% 48% / 30%);
    }

    &_checked {
      --focus-ring-color: var(--focus-ring-active-color);
    }

    /* &:not(.switch_focus-visible) .switch__base {
      outline-color: transparent;
    } */
    .switch__thumb {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        border-radius: inherit;
        transition: inherit;
        transition-property: left, right;
        box-shadow: 0 2px 4px hsl(139 100% 7% / 20%);
      }
    }
    &:active .switch__thumb {
      &:before {
        right: -30%;
      }
    }
    &_checked:active .switch__thumb {
      &:before {
        right: 0;
        left: -30%;
      }
    }
  }

  .shoelace-switch.switch {
    --switch-width: 32px;
    --switch-height: 16px;
    --switch-thumb-size: 20px;
    --switch-color: hsl(240 5% 65%);
    --switch-active-color: hsl(200 98% 39%);
    --switch-thumb-color: #ffffff;
    --switch-focus-ring-color: rgb(14 165 233 / 0.4);

    [data-theme='dark'] & {
      --switch-color: hsl(240 5% 35%);
      --switch-active-color: hsl(199 98% 62%);
      --switch-thumb-color: var(--bg-color);
      --switch-focus-ring-color: rgb(31 170 238 / 0.4);
    }

    .switch__base {
      outline: 0;
    }
    .switch__thumb {
      border: 1px solid var(--switch-color);
    }
    &_checked .switch__thumb {
      border-color: var(--switch-active-color);
    }
    &_focus-visible .switch__thumb {
      border-color: var(--switch-active-color);
      box-shadow: 0 0 0 3px var(--switch-focus-ring-color);
    }
  }

  .MUI-switch.switch {
    --switch-width: 48px;
    --switch-height: 20px;
    --switch-thumb-size: 32px;
    --switch-thumb-left: -1px;
    --switch-color: hsl(210 13% 71%);
    --switch-active-color: var(--switch-color);
    --switch-thumb-color: #001e3c;
    --ripple-opacity: 0.4;

    [data-theme='dark'] & {
      --switch-color: #8796a5;
      --switch-thumb-color: #003892;
      --ripple-opacity: 0.3;
    }

    .switch__base {
      outline: 0;
    }
    .switch__thumb {
      color: #ffffff;
      font-size: 20px;
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    }
    &_focus-visible .switch__thumb::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      border-radius: inherit;
      background-color: #ffffff;
      animation: ripple-check 200ms var(--ease-out) forwards;
    }
    &_focus-visible&_checked .switch__thumb::before {
      animation: ripple-checked 200ms var(--ease-out) forwards;
    }
  }

  .mui-switch.switch {
    --switch-width: 34px;
    --switch-height: 14px;
    --switch-thumb-size: 20px;
    --switch-color: hsl(0 0% 0% / 0.38);
    --switch-active-color: hsl(210 79% 46% / 0.5);
    --switch-thumb-color: #ffffff;
    --switch-thumb-active-color: hsl(210 79% 46%);
    --ripple-opacity: 0.3;

    [data-theme='dark'] & {
      --switch-color: hsl(0 0% 100% / 0.3);
      --switch-active-color: hsl(207 90% 77% / 0.5);
      --switch-thumb-color: #ffffff;
      --switch-thumb-active-color: hsl(207 90% 77%);
    }

    .switch__base {
      outline: 0;
    }
    .switch__thumb {
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    }
    &_focus-visible .switch__thumb::before {
      content: '';
      position: absolute;
      width: 190%;
      height: 190%;
      top: 50%;
      left: 50%;
      border-radius: inherit;
      background-color: inherit;
      animation: ripple-check 200ms var(--ease-out) forwards;
    }
    &_focus-visible&_checked .switch__thumb::before {
      animation: ripple-checked 200ms var(--ease-out) forwards;
    }
  }
</style>
