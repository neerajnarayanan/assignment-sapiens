import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import styles from '../styles/Home.module.css';
import Filter from '../components/FilterPanel/filterpanel';
import ContentBox from '../components/ContentBox/contentbox';

export default function Home(props) {

  const { launches } = props;
  const router = useRouter();
  const { land_success, launch_success, launch_year } = router.query;
  const [filter, setFilter] = useState({ year: launch_year ? launch_year : '', launch: launch_success ? launch_success : '', landing: land_success ? land_success : '' });
  const [flights, setFlights] = useState(launches);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const yearFilter = launch_year ? launch_year : ""
    const launchFilter = launch_success ? launch_success : ""
    const landingFilter = land_success ? land_success : ""
    setLoading(true)
    axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_year=${yearFilter}&launch_success=${launchFilter}&land_success=${landingFilter}`)
      .then(res => {
        setFlights(res.data)
        setLoading(false);
      })
  }, [land_success, launch_success, launch_year]);


  const updateFilterState = (key, value) => {
    setFilter(prevState => ({
      ...prevState,
      [key]: value
    }));
    const _year = (key === 'year' && value) ? value : launch_year;
    const _land = (key === 'landing' && value) ? value : land_success;
    const _launch = (key === 'launch' && value) ? value : launch_success;

    router.push(`/?launch_success=${_launch ? _launch : ''}&land_success=${_land ? _land : ''}&launch_year=${_year ? _year : ''}`, undefined, { shallow: true });

  }


  return (
    <Container fluid={true} className={styles.app}>
      <Row>
        <Col><h2 style={{ float: 'left' }}>SpaceX Launch Programs</h2></Col>
      </Row>
      <Row xs="12" sm="12">
        <Col xs="12" sm="4" md="3" className={styles.panelalign} style={{
          'background-color': 'white',
          height: 'max-content !important'
        }}>
          <Filter
            updateFilter={(key, value) => updateFilterState(key, value)}
            yearProp={filter.year}
            launchProp={filter.launch}
            landingProp={filter.landing} /></Col>
        <Col xs="12" sm="8" md="9">
          <Row xs="12" sm="8">
            {flights && flights.length > 0 && flights.map(flight => <Col md="3" sm="6" xs="12" className={styles.padtop}>
              <ContentBox
                missionName={flight.mission_name}
                flightNumber={flight.flight_number}
                imageURL={flight.links.mission_patch_small}
                missionIds={flight.mission_id}
                launchYear={flight.launch_year}
                launchSuccess={flight.launch_success === null ? '' : flight.launch_success.toString()}
                launchLanding={flight.rocket.first_stage.cores[0].land_success === null ? '' : flight.rocket.first_stage.cores[0].land_success.toString()}
              />

            </Col>)}

            {loading && <Col><h4>Loading, Please wait...........</h4></Col>}
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

  const res = await axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_year=""&launch_success=""&land_success=""`);
  return {
    props: {
      launches: res.data,
    },
  }
}
