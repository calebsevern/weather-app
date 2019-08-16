import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Actions from '../actions/AppActions';
import AppHeaderView from './AppHeaderView';
import WeatherControlsView from './WeatherControls/WeatherControlsView';
import WeatherChartsView from './WeatherCharts/WeatherChartsView';

interface Props {
  fetchByCoordinates: (lat: string, lon: string) => Promise<void>,
  fetchByCityOrZip: (city: string) => Promise<void>,
  weatherData: any,
  error?: string,
  recentSearches: any[],
}

interface State {
  tempUnit: string, // C or F
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { tempUnit: 'F' };;
  }

  onChangeTempUnit = (tempUnit: string) => {
    this.setState({ tempUnit });
  }

  render() {
    const {
      fetchByCoordinates,
      fetchByCityOrZip,
      weatherData,
      recentSearches,
      error,
    } = this.props;
    const { tempUnit } = this.state;

    return (
      <div className="App">
        <AppHeaderView />
        <WeatherControlsView
          tempUnit={tempUnit}
          onSubmitCoordinates={fetchByCoordinates}
          onSubmitCityOrZip={fetchByCityOrZip}
          onChangeTempUnit={this.onChangeTempUnit}
          recentSearches={recentSearches}
        />
        <WeatherChartsView
          error={error}
          tempUnit={tempUnit}
          weatherData={weatherData}
        />
      </div>
    );
  }
}

export default connect((state: any) => ({
  weatherData: state.appReducer.weatherData,
  error: state.appReducer.error,
  recentSearches: state.appReducer.recentSearches,
}), {
  ...Actions,
})(App);
