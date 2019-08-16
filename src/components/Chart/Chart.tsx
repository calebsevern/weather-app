import React from 'react';
import * as d3 from 'd3';
import './Chart.css';
const CHART_WIDTH = 500;
const CHART_HEIGHT = 350;
const MARGIN = 20;

interface Props {
  data: any[],
  label: string,
  yLabel: string,
  scaleFloor: number,
  scaleBuffer: number,
}

class Chart extends React.Component<Props> {
  render() {
    const { data, label, yLabel, scaleFloor, scaleBuffer } = this.props;
    const h = CHART_HEIGHT - (MARGIN * 2);
    const w = CHART_WIDTH - (MARGIN * 2);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.x) as any)
      .range([40, w]);

    const y = d3.scaleLinear()
      .domain([scaleFloor, d3.max(data, d => d.y + scaleBuffer)] as any)
      .range([h, 0])

    const line = d3.line()
      .x(d => x((d as any).x))
      .y(d => y((d as any).y))
      .curve(d3.curveCatmullRom.alpha(0.2));

    const xTicks = x.ticks(6).map((d, i: number) => (
      x(d) > MARGIN && x(d) < w ?
        <g key={`x-tick-${i}`} transform={`translate(${x(d)},${h + MARGIN})`}>
          <text>{new Date(d).toISOString().substring(0, 10)}</text>
          <line x1='0' x2='0' y1='0' y2='5' transform="translate(0,-20)"/>
        </g>
      : null
    ));

    const yTicks = y.ticks(5).map((d, i: number) => (
      y(d) > 10 && y(d) < h ?
        <g key={`y-tick-${i}`} transform={`translate(${40},${y(d)})`}>
          <text x="-20" y="5">{d}{yLabel}</text>
          <line x1='0' x2='5' y1='0' y2='0' transform="translate(-5,0)"/>
          <line className='gridline' x1='0' x2={w - 35} y1='0' y2='0' transform="translate(-5,0)"/>
        </g>
      : null
    ));

    return (
      <React.Fragment>
        <div className="pillar-chart-label">{label}</div>
        <svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          <line className="axis" x1={40} x2={w} y1={h} y2={h} />
          <line className="axis" x1={40} x2={40} y1={MARGIN} y2={h} />
          <path d={line(data as any) as any} />
          <g className="axis-labels">
            {xTicks}
          </g>
          <g className="axis-labels">
            {yTicks}
          </g>
        </svg>
      </React.Fragment>
    );
  }
}

export default Chart;
