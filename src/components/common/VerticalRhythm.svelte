<script>
  let showGrid = true

  $: document.body.classList.toggle('show-grid', showGrid)
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="vertical-rhythm">
  <h1>Lorem ipsum dolor sit amet consectetur</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione assumenda incidunt sequi velit enim facilis! Fugiat
    voluptatem aperiam corporis iste explicabo quae.
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione assumenda incidunt sequi velit enim facilis! Fugiat
    voluptatem aperiam corporis iste explicabo quae.
  </p>
  <h2>Lorem ipsum dolor sit amet consectetur, adipisicing</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione assumenda incidunt sequi velit enim facilis! Fugiat
    voluptatem aperiam corporis iste explicabo quae.
  </p>
  <h3>Lorem ipsum dolor sit amet consectetur, adipisicing</h3>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione assumenda incidunt sequi velit enim facilis! Fugiat
    voluptatem aperiam corporis iste explicabo quae.
  </p>
  <h4>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione
  </h4>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione assumenda incidunt sequi velit enim facilis! Fugiat
    voluptatem aperiam corporis iste explicabo quae.
  </p>
  <h5>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione assumenda
  </h5>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
    numquam earum ratione assumenda incidunt sequi velit enim facilis! Fugiat
    voluptatem aperiam corporis iste explicabo quae.
  </p>
  <p class="footnote">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero quos
    explicabo impedit labore hic vel officiis fugiat perspiciatis ab, aliquam
    velit esse quasi accusamus, exercitationem nemo ducimus totam delectus
    tempore.
  </p>

  <button type="button" on:click={() => (showGrid = !showGrid)}>
    Toggle baseline grid
  </button>
</div>

<style lang="postcss" global>
  .show-grid {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1000%;
      z-index: 100000;
      background: linear-gradient(
        to bottom,
        transparent,
        transparent 4px,
        rgb(239 42 42 / 15%) 4px
      );
      background-size: 100% 8px;
      pointer-events: none;
      background-position-y: 0px;
    }

    .vertical-rhythm {
      p {
        background-color: rgb(255 0 0 / 40%);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        background-color: rgb(0 0 255 / 40%);
      }
    }
  }

  .vertical-rhythm {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.5; /* 24px */

    p {
      margin: 0 0 16px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 24px 0 12px;
      line-height: 1.2;
      font-weight: 500;

      &:first-child {
        margin-top: 0;
      }
    }

    h1 {
      /* font-size: 3.052 * 16px; // 48.832px
      line-height: 1.147; // 56px */

      font-size: linear(28.83px, 48.832px, 320px, 630px);
      /* line-height: linear(36px, 56px, 320px, 630px);
      @include steps(
        font-size,
        28.83px,
        48.832px,
        320px,
        630px,
        $step: 4.0004px
      ); */
      @mixin steps line-height, 36px, 56px, 320px, 630px, 4px;

      /* @include down(sm) {
        font-size: 1.802 * 16px; // 28.83px
        line-height: 1.249; // 36px
      } */
    }
    h2 {
      /* font-size: 2.441 * 16px; // 39.056px
      line-height: 1.229; // 48px */

      font-size: linear(25.63px, 39.056px, 320px, 630px);
      @mixin steps line-height, 32px, 48px, 320px, 630px, 4px;

      /* @include down(sm) {
        font-size: 1.602 * 16px; // 25.63px
        line-height: 1.24843945em; // 32px
      } */
    }
    h3 {
      /* font-size: 1.953 * 16px; // 31.248px
      line-height: 1.28; // 40px */

      font-size: linear(22.78px, 31.248px, 320px, 630px);
      @mixin steps line-height, 32px, 40px, 320px, 630px, 4px;

      /* @include down(sm) {
        font-size: 1.424 * 16px; // 22.78px
        line-height: 1.4044944em; // 32px
      } */
    }
    h4 {
      /* font-size: 1.563 * 16px; // 25.008px
      line-height: 1.28; // 32px */

      font-size: linear(20.25px, 25.008px, 320px, 630px);
      @mixin steps line-height, 28px, 32px, 320px, 630px, 4px;

      /* @include down(sm) {
        font-size: 1.266 * 16px; // 20.25px
        line-height: 1.38231em; // 28px
      } */
    }
    h5 {
      /* font-size: 1.25 * 16px; // 20px
      line-height: 1.4; // 28px */

      font-size: linear(18px, 20px, 320px, 630px);
      @mixin steps line-height, 24px, 28px, 320px, 630px, 4px;

      /* @include down(sm) {
        font-size: 1.125 * 16px; // 18px
        line-height: 1.3333333; // 24px
      } */
    }

    .footnote {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.67;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-top: 15px;
    }
  }
</style>
