const { createApp } = Vue;

createApp({
  data() {
    return {
      brojac: 0
    }
  },
  methods: {
    povecaj() {
      this.brojac++;
    },
    smanji() {
      this.brojac--; // Ova linija omogućuje smanjivanje
    },
    reset() {
      this.brojac = 0;
    },
    povecaj2() {
      this.brojac += 2;
    },
    smanji2() {
      this.brojac -= 2;
    }
  }
}).mount('#app');