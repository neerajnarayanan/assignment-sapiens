import React, { useEffect, useState } from 'react';
import Button from './button';
import { years } from "../constants/YearConstants";
import {rocketLaunch,  rocketLanding } from "../constants/launchDetails";

const rocketLaunchDetails= rocketLaunch;
const rocketLandingDetails =rocketLanding;


const updateArray = (item, updatedvalue,key) => {
    if (item[key] == updatedvalue) {
        return { ...item, active: true }
    }
    else {
        return { ...item, active: false }
    }
}

function Filter(props) {
    const { cuttentSelectedYear,launchProp,landingProp, updateFilter} = props;
    const [year, setYear] = useState(years);
    const [launch, setLaunch] = useState(rocketLaunchDetails);
    const [landing, setLanding] = useState(rocketLandingDetails);
    
    useEffect(() => {
        if (cuttentSelectedYear) {
            const updatedYear = year.map(y => updateArray(y, cuttentSelectedYear, 'year'));
            setYear(updatedYear);
      }
    }, [cuttentSelectedYear])
    
    useEffect(() => {
        if (launchProp) {
            const updatedLaunch = launch.map(lan => updateArray(lan, launchProp, 'launch')); 
            setLaunch(updatedLaunch); 
        }
    }, [launchProp])

    useEffect(() => {
        if (landingProp) {
            const updatedLanding = landing.map(l => updateArray(l, landingProp, 'landing'));
        setLanding(updatedLanding)
        }
        
    }, [landingProp])
    
    const renderFilterButton = (arr,key) => {
        return arr.map((y) => <Button
            key={y[key]}
            updatingData={key}
            text={y[key]}
            status={y.active}
            handleClick={updateFilter}
        />)
    }

    
  return (
      <div className="FilterMain">
          <h3>Filter</h3>
          <h5>Launch year</h5>
          <hr />
          <div className="Filter-Btns">
              {year && year.length > 0 && renderFilterButton(year,'year') }
          </div>
          <h5>Successful Launch</h5>
          <hr />
          <div className="Filter-Btns">
              {launch && launch.length > 0 && renderFilterButton(launch,'launch')}
          </div>
          <h5>Successful Landing</h5>
          <hr />
          <div className="Filter-Btns">
              {landing && landing.length > 0 && renderFilterButton(landing,'landing')}
          </div>
      </div>
  );
}

export default Filter;
