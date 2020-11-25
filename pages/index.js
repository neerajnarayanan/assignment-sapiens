import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { BASE_URL, BASE_PATH } from "../constants/urlConstants";
import styles from '../styles/Home.module.css';
import Filter from '../components/filterpanel';
import ContentBox from '../components/contentbox';

export default function SpaceHome(props) {

  const { launches } = props;
  const router = useRouter();
  const { land_success, launch_success, launch_year } = router.query;
  const [filterParam, setFilterParam] = useState({ year: launch_year ? launch_year : '', launch: launch_success ? launch_success : '', landing: land_success ? land_success : '' });
  const [flights, setFlights] = useState(launches);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const yearFilter = launch_year ? launch_year : ""
    const launchFilter = launch_success ? launch_success : ""
    const landingFilter = land_success ? land_success : ""
    setLoading(true)
    axios.get(`${BASE_PATH}launch_year=${yearFilter}&launch_success=${launchFilter}&land_success=${landingFilter}`)
      .then(res => {
        setFlights(res.data)
        setLoading(false);
      })
  }, [land_success, launch_success, launch_year]);


  const updateFilterState = (key, value) => {
    setFilterParam(prevState => ({
      ...prevState,
      [key]: value
    }));
    const _year = (key === 'year' && value) ? value : launch_year;
    const _land = (key === 'landing' && value) ? value : land_success;
    const _launch = (key === 'launch' && value) ? value : launch_success;

    router.push(`/?launch_success=${_launch ? _launch : ''}&land_success=${_land ? _land : ''}&launch_year=${_year ? _year : ''}`, undefined, { shallow: true });

  }

  const listFlights = (flights) => {
    return (
      <>
        {flights && flights.length > 0 && flights.map(flight => <Col md="3" sm="6" xs="12" className={styles.padtop}>
          <ContentBox
            missionName={flight.mission_name}
            flightNumber={flight.flight_number}
            imageURL={flight.links.mission_patch_small}
            missionIds={flight.mission_id}
            launchYear={flight.launch_year}
            launchSuccess={flight.launch_success === null ? '' : flight.launch_success.toString()}
            landSuccess={flight.rocket.first_stage.cores[0].land_success === null ? '' : flight.rocket.first_stage.cores[0].land_success.toString()}
          />
        </Col>)
        }
      </>
    )
  };

  const filterComponent = () => {
    return (
      <Filter
        updateFilter={(key, value) => updateFilterState(key, value)}
        cuttentSelectedYear={filterParam.year}
        launchProp={filterParam.launch}
        landingProp={filterParam.landing} />
    )
  }


  return (
    <Container fluid={true} className={styles.app}>
      <Row>
        <Col><h2 style={{ float: 'left' }}>SpaceX Launch Programs</h2></Col>
      </Row>
      <Row xs="12" sm="12" style={{marginLeft: '0px'}}>
        <Col xs="12" sm="4" md="3" className={styles.panelalign} style={{
          backgroundColor: 'white !important'
        }}>
          {filterComponent()}
        </Col>
        <Col xs="12" sm="8" md="9">
          <Row xs="12" sm="8">
            {listFlights(flights)}
            {loading && <Col><h4>Loading Data, Please wait..</h4></Col>}
            {!loading && flights.length === 0 && <Col><h4>No Data</h4></Col>}
          </Row>
        </Col>


      </Row>
      <Row xl="12">
        <Col><h2>Developed By : Neeraj Narayanan</h2></Col>
      </Row>

    </Container>
  )
}

export async function getStaticProps() {

  const res = await axios.get(BASE_URL);
  return {
    props: {
      launches: res.data,
    },
  }
}
