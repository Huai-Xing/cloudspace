/* jshint esversion: 6 */

import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;
import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = 'roboto';
Chart.elements.Rectangle.prototype.draw = function () {

  var ctx = this._chart.ctx;
  var vm = this._view;
  var left, right, top, bottom, signX, signY, borderSkipped, radius, width, height, x, y;
  var borderWidth = vm.borderWidth;
  var cornerRadius = 20;

  left = vm.x - vm.width / 2;
  right = vm.x + vm.width / 2;
  top = vm.y;
  bottom = vm.base;
  signX = 1;
  signY = bottom > top ? 1 : -1;
  borderSkipped = vm.borderSkipped || 'bottom';

  if (borderWidth) {
    var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
    borderWidth = borderWidth > barSize ? barSize : borderWidth;
    var halfStroke = borderWidth / 2;
    var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
    var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
    var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
    var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
    if (borderLeft !== borderRight) {
      top = borderTop;
      bottom = borderBottom;
    }
    if (borderTop !== borderBottom) {
      left = borderLeft;
      right = borderRight;
    }
  }

  ctx.beginPath();
  ctx.fillStyle = vm.backgroundColor;
  ctx.strokeStyle = vm.borderColor;
  ctx.lineWidth = borderWidth;

  var corners = [
    [left, bottom],
    [left, top],
    [right, top],
    [right, bottom]
  ];

  var borders = ['bottom', 'left', 'top', 'right'];
  var startCorner = borders.indexOf(borderSkipped, 0);
  if (startCorner === -1) {
    startCorner = 0;
  }

  function cornerAt(index) {
    return corners[(startCorner + index) % 4];
  }

  // Draw
  var corner = cornerAt(0);
  var nextCornerId;
  ctx.moveTo(corner[0], corner[1]);

  for (var i = 1; i < 4; i++) {
    corner = cornerAt(i);
    nextCornerId = i + 1;
    if (nextCornerId == 4) {
      nextCornerId = 0
    }

    width = corners[2][0] - corners[1][0];
    height = corners[0][1] - corners[1][1];
    x = corners[1][0];
    y = corners[1][1];

    //Fixed radius if too big
    var limit = 1.75;
    radius = cornerRadius;
    if (radius > height / limit) {
      radius = height / limit;
    } if (radius > width / limit) {
      radius = width / limit;
    }

    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  ctx.fill();
  if (borderWidth) {
    ctx.stroke();
  }
};

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}