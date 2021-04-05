/* jshint esversion: 6 */

import { Radar } from 'vue-chartjs';

// Uncomment below when bind with database
import fb from '../../firebase.js'; //Import database

export default {
  extends: Radar,
  data: function () {
    return {
      user: fb.auth().currentUser.uid,

      chartdata: {
        //labels: ['GEH1000', 'BT3102', 'BT3103', 'IS3103', 'CS2040'],
        labels: [],
        datasets: [
          {
            label: 'Avg Actual Time (sec)',
            backgroundColor: [
              'rgba(64, 191, 128, 0.45)',
            ],
            borderColor: 'rgba(64, 191, 128, 0.45)',

            radius: 4,
            pointRadius: 4, //The size of the plotted points
            pointBorderWidth: 2,
            pointBackgroundColor: 'limegreen',
            pointBorderColor: 'rgba(64, 191, 128, 0.6)',
            pointHoverRadius: 7,

            data: [],
          },
          // dummy data testing
          /**
          {
            label: 'January', //Comparing the avg time spent for the most recent 2 or 3mths here?
            data: [23, 84, 59, 67, 93], //dummy testing dataset here, need bind to database later on

            backgroundColor: 'transparent',
            borderColor: 'rgba(64, 191, 128, 0.45)',

            radius: 4,
            pointRadius: 4, //The size of the plotted points
            pointBorderWidth: 2,
            pointBackgroundColor: 'limegreen',
            pointBorderColor: 'rgba(64, 191, 128, 0.6)',
            pointHoverRadius: 7,
          },

          {
            label: 'February', //Comparing the avg time spent for the most recent 2 or 3mths here?
            data: [62, 63, 14, 72, 53], //dummy testing dataset here, need bind to database later on

            backgroundColor: 'transparent',
            borderColor: 'rgba(200, 0, 0, 0.45)',

            radius: 4,
            pointRadius: 4, //The size of the plotted points
            pointBorderWidth: 2,
            pointBackgroundColor: 'orange',
            pointBorderColor: 'rgba(200, 0, 0, 0.6)',
            pointHoverRadius: 7,
          },

          {
            label: 'March', //Comparing the avg time spent for the most recent 2 or 3mths here?
            data: [15, 36, 77, 0, 28], //dummy testing dataset here, need bind to database later on

            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 200, 0.45)',

            radius: 4,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointBackgroundColor: 'cornflowerblue',
            pointBorderColor: 'rgba(0, 0, 200, 0.6)',
            pointHoverRadius: 7,
          },
          */
        ],
      },

      options: {
        legend: {
          position: 'top',
          display: false,
        },
        layout: {
          padding: {
            left: -30,
          },
        },
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 20,
          },

          pointLabels: {
            fontSize: 14,
          },
        },

        tooltips: { // When hovering over the points, show the tooltip label
          callbacks: {
            'title': (tooltipItem, dataPt) => dataPt.labels[tooltipItem[0].index],
          },
        },

        responsive: true,
        maintainAspectRatio: false,
      },

    };
  },

  // mounted() { // tentatively using this mounted() for the dummy data at the moment
  //   this.renderChart(this.chartdata, this.options);
  // },

  methods: {

    // Uncomment this part when bind with database
    fetchItems: function () {
      console.log("currentUser: ", this.user);

      let allCat = [];
      let uniqueCat = [];
      fb.firestore().collection('tasks').doc(this.user).collection('tasksList').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          //console.log([doc.id, doc.data()]);
          //console.log("task_id: ", doc.id);
          //console.log(doc.data()); // each task details
          //console.log(doc.data().category);

          // To push in the unique task category into labels array
          allCat.push(doc.data().category);
          //console.log(allCat);
          uniqueCat = allCat.filter((item, index, arrRef) => arrRef.indexOf(item) == index);
          //console.log(uniqueCat);
        });
        for (let i = 0; i < uniqueCat.length; i++) {
          this.chartdata.labels.push(uniqueCat[i]);
        }
        //this.chartdata.labels.push(uniqueCat);
        //console.log(this.chartdata.labels);
      });


      fb.firestore().collection('tasks').doc(this.user).collection('tasksList').get().then(snapshot => {

        // To push in the actualTime accordingly for each category
        //console.log(this.chartdata.labels.length);
        let length = this.chartdata.labels.length;
        let timeArr = []; // to init an array by the szie of category available
        for (let i = 0; i < length; i++) {
          timeArr[i] = 0;
          //console.log(timeArr[i]);
        }

        snapshot.docs.forEach(doc => {
          let currCategory = doc.data().category;
          //console.log(currCategory);

          for (let i = 0; i < doc.data().category.length; i++) {
            //console.log('task category: ', doc.data().category,
            //'; actualTime: ', doc.data().actualTime);

            let currCatActualTime = doc.data().actualTime;
            //console.log(currCatActualTime);
            if (currCategory == this.chartdata.labels[i]) {
              timeArr[i] += parseInt(currCatActualTime);
            }
            //console.log(timeArr[i]);
          }
        });

        // To keep track of the appearance of each category
        let catCount = Array.from(new Set(allCat)).map(val => allCat.filter(v => v === val).length);

        for (let i = 0; i < timeArr.length; i++) { // the catCount is the same length as the timeArr
          console.log(catCount[i], ",", timeArr[i]);
          //console.log(timeArr[i] / catCount[i]);

          timeArr[i] = parseFloat(timeArr[i] / catCount[i]).toFixed(3); // to 3 dec place
          console.log(timeArr[i]);
          this.chartdata.datasets[0].data.push(timeArr[i]);
        }

        this.renderChart(this.chartdata, this.options); // render the chart
      });

    },

  },

  created() {
    this.fetchItems();
  },
};
