<template lang="pug">
  canvas(width="300" height="300")
</template>

<script>
import Chart from 'chart.js';
export default {
  props: ['dataset'],
  data: () => ({
    chart: null
  }),
  methods: {
    createChart (time, potential, points) {
      points.reverse();
      this.chart = new Chart(this.$el.getContext('2d'), {
        type: 'line',
        data: {
          labels: time,
          datasets: [
            ...points,
            {
              label: 'Diferença de Potencial',
              data: potential,
              backgroundColor: 'rgba(230, 80, 80, .8)',
              borderColor: 'rgba(230, 80, 80, 1)',
              fill: false,
              lineTension: 0,
              pointRadius: 0,
              pointHoverRadius: 0,
              pointHoverBorderColor: 'black',
              pointHoverBackgroundColor: 'black',
              borderWidth: 1,
              pointDotRadius: 0,
              pointStrokeColor: 'none'
            }
          ]
        },
        options: {
          animation: false,
          responsive: true,
          maintainAspectRatio: false,
          hover: {
            display: false,
            intersect: false
          },
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltips: {
            intersect: false,
            mode: 'x',
            filter: (item) => {
              return item.datasetIndex < this.dataset.points.length;
            },
            callbacks: {
              title: (tooltipItem) => {
                const item = tooltipItem[0];
                if (!item) return null;
                const len = this.dataset.points.length;
                const did = item.datasetIndex;
                const timepoint = this.dataset.points[len - 1 - did].data[0].x;
                return 'Tempo: ' + timepoint + ' segundos';
              }
            }
          },
          scales: {
            xAxes: [{
              display: true,
              // distribution: 'linear',
              // beginAtZero: true,
              // stepSize: 0.5,
              scaleLabel: {
                display: true,
                labelString: 'Tempo (segundos)'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Diferença de Potencial'
              }
            }]
          }
        }
      });
    },
    updateChart () {
      const data = this.unrollData();
      if (this.chart) {
        this.chart.data.labels = data.time;
        this.chart.data.datasets[this.chart.data.datasets.length - 1].data = data.potential;
        this.chart.data.datasets.splice(0, this.chart.data.datasets.length - 1);
        data.points.forEach(point => {
          this.chart.data.datasets.unshift(point);
        });
        this.chart.update();
      } else {
        this.createChart(data.time, data.potential, data.points);
      }
    },
    unrollData () {
      const time = Array(this.dataset.items.length);
      const potential = Array(this.dataset.items.length);
      const points = this.dataset.points;
      this.dataset.items.forEach((d, i) => {
        time[i] = d.time;
        potential[i] = d.potential;
      });
      return { time, potential, points };
    }
  },
  mounted () {
    if (this.dataset.items.length) this.updateChart();
  },
  beforeDestroy () {
    if (this.chart) this.chart.destroy();
  }
};
</script>
