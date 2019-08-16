import React from 'react';
import './WeatherControls.css';
import Constants from '../../utils/Constants';
import { Button, TextInput, Select } from '../../components';

interface Props {
  onSubmitCoordinates: (latitude: string, longitude: string) => void,
  onSubmitCityOrZip: (city: string) => void,
  onChangeTempUnit: (tempUnit: string) => void,
  recentSearches: any[],
  tempUnit: string, // F or C
}

interface State {
  searchMethod: string,
  lat: string,
  lon: string,
  cityOrZip: string,
}

class WeatherControlsView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchMethod: Constants.SEARCH_OPTIONS[0].value,
      lat: '',
      lon: '',
      cityOrZip: '',
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location: any) => {
        this.onReceiveUserLocation(
          `${location.coords.latitude}`,
          `${location.coords.longitude}`,
        );
      }, (err: any) => {
        console.error(err);
      });
    }
  }

  onReceiveUserLocation = (lat: string, lon: string) => {
    const { onSubmitCoordinates } = this.props;
    this.setState({ lat, lon, searchMethod: 'coordinate' }, () => {
      onSubmitCoordinates(lat, lon); 
    });
  }

  onChangeSearchMethod = (searchMethod: string) => {
    this.setState({ searchMethod });
  }

  onChangeLat = (lat: string) => {
    this.setState({ lat });
  }

  onChangeLon = (lon: string) => {
    this.setState({ lon });
  }

  onChangeCityOrZip = (cityOrZip: string) => {
    this.setState({ cityOrZip });
  }

  onSubmitSearch = () => {
    const { onSubmitCoordinates, onSubmitCityOrZip } = this.props;
    const { lat, lon, cityOrZip, searchMethod } = this.state;
    if (searchMethod === 'coordinate') {
      onSubmitCoordinates(lat, lon); 
    } else if (searchMethod === 'city') {
      onSubmitCityOrZip(cityOrZip);
    }
  }

  renderRecentSearches() {
    const { recentSearches } = this.props;
    if (!recentSearches || !recentSearches.length) return null;

    const els = recentSearches.slice(0, 3).map((search: any, i: number) => (
      <div key={`search-no-${i}`}>
        {search.city} ({new Date(search.timestamp).toISOString()})
      </div>
    ));

    return (
      <div className="pillar-recent-searches">
        <b>Recent Searches</b>
        {els}
      </div>
    );
  }

  renderCityNameControls() {
    const { searchMethod, cityOrZip } = this.state;
    if (searchMethod !== 'city') return null;

    return (
      <React.Fragment>
        <div className="pillar-controls-row">
          <TextInput
            label="City or zip"
            value={cityOrZip}
            placeholder="e.g. Kalamazoo"
            onChange={this.onChangeCityOrZip}
          />
        </div>
      </React.Fragment>
    );
  }

  renderCoordinateControls() {
    const { searchMethod, lat, lon } = this.state;
    if (searchMethod !== 'coordinate') return null;

    return (
      <React.Fragment>
        <div className="pillar-controls-row">
          <TextInput
            label="Latitude"
            placeholder="e.g. 0°"
            value={lat}
            onChange={this.onChangeLat}
          />
        </div>
        <div className="pillar-controls-row">
          <TextInput
            label="Longitude"
            placeholder="e.g. 0°"
            value={lon}
            onChange={this.onChangeLon}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { searchMethod } = this.state;
    const { tempUnit, onChangeTempUnit } = this.props;

    return (
      <div className="pillar-controls-wrapper">
        {this.renderRecentSearches()}
        <div className="pillar-controls-row">
          <Select
            label="Temperature Unit"
            options={Constants.TEMP_OPTIONS}
            selectedValue={tempUnit}
            onChange={onChangeTempUnit}
          />
        </div>
        <div className="pillar-controls-row">
          <Select
            label="Search by"
            options={Constants.SEARCH_OPTIONS}
            selectedValue={searchMethod}
            onChange={this.onChangeSearchMethod}
          />
        </div>
        {this.renderCityNameControls()}
        {this.renderCoordinateControls()}
        <div className="pillar-controls-row">
          <Button
            onClick={this.onSubmitSearch}
          >
            Let's go!
          </Button>
        </div>
      </div>
    );
  }
}

export default WeatherControlsView;
