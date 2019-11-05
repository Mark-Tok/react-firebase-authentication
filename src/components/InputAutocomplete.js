import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import Dialog from './Popup';
import Grid from '@material-ui/core/Grid';
import {requestApiData} from './../store/fetch/actions'
import { connect } from 'react-redux';
import {putActionGeoCoordinate} from '../store/fetchUrl/actions'

const styleInput = {
    height: '51px',
    fontSize: '20px',
    boder: '1px solid #4285f4',
    color: '#85878a',
    width: '100%'
}

class InputAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            geo: [],
            lat: null,
            lng: null,
            time: props.fetchData.timezone,
            placeholder: ''
        }
    }
    handlePlaceinArray = (value) => {
        if(value.formatted_address === undefined) {
            alert('Выберете город из выпадающего списка')
        }
        else {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.formatted_address}&key=AIzaSyD7wnsf-UqPzXtMXLjXCQ29Nw053bj_KSk`)
            .then(response => response.json())
            .then(place =>  this.setState((state, props) => {
                return {geo: [...state.geo, place]};
              }))
            .then(() => {
                let {putActionGeoCoordinate} = this.props;
                this.state.geo.map((item) => {
                    let url = `https://maps.googleapis.com/maps/api/timezone/json?location=${item.results[0].geometry.location.lat},${item.results[0].geometry.location.lng}&timestamp=1331161200&key=AIzaSyD7wnsf-UqPzXtMXLjXCQ29Nw053bj_KSk`
                    return putActionGeoCoordinate(url)
                })
            })
            .then(() => {
                let {requestApiData} = this.props;
                requestApiData()
            }).then(() => {
                this.setState({placeholder: ''})
            })
        }
       
    }
    handleChangeValue = (event) => {
        this.setState({placeholder: event.target.value})
    } 
    render() {
        return (
            <div className='autocomplete'>
                <Grid justify="center" 
                    alignItems="center" container>
                    <Grid item xs={12}>
                        <Autocomplete
                            style={styleInput}
                            placeholder='Введите название города'
                            onChange={this.handleChangeValue}
                            value={this.state.placeholder}
                            onPlaceSelected={(place, event) => {
                                this.handlePlaceinArray(place, event);
                            }}
                        />
                        <Dialog />
                    <div className="list">  
                      {
                        this.state.geo.map((item, index) => {
                              return <ul key={index}>
                                  <li><span>Город: </span>{item.results[0].formatted_address}</li>
                                  <li><span>Координаты: </span> {item.results[0].geometry.location.lat}/{item.results[0].geometry.location.lng}</li>
                              </ul>
                          }) 
                      }
                    </div> 
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetchData: state.fetch,
    }
}

const mapActionToProps =  {
    requestApiData,
    putActionGeoCoordinate
}

export default connect(mapStateToProps, mapActionToProps)(InputAutocomplete);