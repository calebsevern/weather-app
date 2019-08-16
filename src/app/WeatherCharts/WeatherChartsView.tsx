import React from 'react';
import './WeatherCharts.css';
import { Chart } from '../../components';

interface Props {
  weatherData: any,
  tempUnit: string,
  error?: string,
}

const convertTemp = (k: number, unit: string) => {
  if (unit === 'F') {
    return (k * 9 / 5) - 459.67;
  }

  return k - 273.15;
};

class WeatherChartsView extends React.Component<Props> {
  renderCharts() {
    const { weatherData, tempUnit } = this.props;
    if (!weatherData) return null;

    const temperature = weatherData.list.map((data: any) => ({
      x: data.dt * 1000,
      y: convertTemp(data.main.temp, tempUnit),
    }));

    const humidity = weatherData.list.map((data: any) => ({
      x: data.dt * 1000,
      y: data.main.humidity,
    }));

    const pressure = weatherData.list.map((data: any) => ({
      x: data.dt * 1000,
      y: data.main.pressure,
    }));

    return (
      <div>
        <h3>Weather for {weatherData.city.name}, US</h3>
        <Chart
          data={temperature}
          label="Temperature"
          yLabel={tempUnit}
          scaleFloor={0}
          scaleBuffer={20}
        />
        <Chart
          data={humidity}
          label="Humidity"
          yLabel="%"
          scaleFloor={0}
          scaleBuffer={20}
        />
        <Chart
          data={pressure}
          label="Pressure"
          yLabel="hPa"
          scaleFloor={900}
          scaleBuffer={100}
        />
      </div>
    );
  }

  renderPrompt() {
    const { weatherData } = this.props;
    if (!!weatherData) return null;
    
    return (
      <div className="pillar-charts-prompt">
        Search by city / coordinates to see weather data.
      </div>
    );
  }

  renderError() {
    const { error } = this.props;
    if (!error) return null;

    return (
      <div className="pillar-charts-error">
        {error}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderError()}
        {this.renderPrompt()}
        {this.renderCharts()}
      </div>
    );
  }
}

export default WeatherChartsView;
