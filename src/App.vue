<template>
  <div id="app">
    <vue-slider v-model="currentIndex" v-bind="options"></vue-slider>
    <section class="digits">
      <span v-for="i in additionalDigitsShown" :key="i" :class="[{hidden: !pi[currentIndex-i]},`previous${additionalDigitsShown- i+1}`]">
        {{pi[currentIndex-i -1]||0}}
      </span>
      <span :class="[{incorrect:!correct},{hidden:!pi[currentIndex]}]" class="currentDigit">
        {{pi[currentIndex]||0}}
      </span>
      <span v-for="i in additionalDigitsShown" :key="currentIndex+additionalDigitsShown+ i+1" :class="[{hidden:!showNextDigits}, `next${i}`]">
        {{pi[currentIndex+i]}}
      </span>
    </section>

    <section class="info">
      <span>Current Digit: {{currentIndex+1}}</span>
      <span>Best: {{bestIndex+1}}</span>
    </section>

    <section class="input">
      <span v-for="i in 10" @click="input(i-1)" :class="[{incorrect:incorrectInput(i-1)}, `digit-${i-1}`]" :key="i">
        {{i-1}}
      </span>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import Pi from './Pi'

export default Vue.extend({
  name: 'app',
  components: {
    VueSlider,
  },
  data() {
    return {
      pi: Pi,
      currentIndex: 0,
      correct: false,
      additionalDigitsShown: 2,
      bestIndex: 0,
      showNextDigits: false,
      options: {
        min: 0,
        max: 2000,
        interval: 50,
        tooltip: 'off',
      },
    }
  },
  computed: {
    currentDigit(): number {
      return parseInt(this.pi.charAt(this.currentIndex))
    },
    nextDigit(): number {
      return parseInt(this.pi.charAt(this.currentIndex + 1))
    },
  },
  watch: {
    currentIndex(newIndex) {
      if (newIndex > this.bestIndex) {
        this.bestIndex = newIndex
      }
    },
  },
  methods: {
    input(number: number) {
      this.correct = number === this.nextDigit
      if (this.correct) {
        this.currentIndex++
      }
    },
    incorrectInput(number: number) {
      return !this.correct && number === this.currentDigit
    },
  },
})
</script>

<style lang="stylus">
:root {
  --blue: #125ace;
  --orange: #ff741e;
  --wrong: crimson;
}

body {
  background: #000000;
  color: snow;
}

.hidden {
  visibility: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 1rem;
  text-align: center;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.digits {
  align-items: flex-end;
  display: grid;
  font-size: 15vh;
  grid-auto-flow: column;
  height: 75%;
  justify-content: center;
  line-height: @height;
  margin-bottom: 3vh;
  margin-top: @margin-bottom * 1.5;

  .incorrect {
    color: var(--wrong);
  }

  [class^=previous] {
    color: var(--blue);
  }

  [class^=next] {
    color: var(--orange);
  }

  .previous1, .next1 {
    font-size: 65%;
  }

  .previous2, .next2 {
    font-size: 45%;
  }

  .currentDigit {
    font-size: 100%;
  }

  >span {
    padding-left: 0.5rem;
    padding-right: @padding-left;
  }
}

.info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.3rem;
  padding-top: @padding-bottom;
}

.input {
  display: grid;
  grid-gap: 2px;
  grid-template-areas: 'd7 d8 d9' 'd4 d5 d6' 'd1 d2 d3' '. d0 .';
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 35vh;

  span {
    border: 3px solid var(--blue);
    display: grid;
    font-size: 1.4rem;
    padding: 10%;
    place-items: center;
    user-select: none;

    &:active, &:focus, &:hover {
      border-color: var(--orange);
    }
  }

  for num in (0 .. 9) {
    .digit-{num} {
      grid-area: s('d%s', num);
    }
  }
}
</style>
