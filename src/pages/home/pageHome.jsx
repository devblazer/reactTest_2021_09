import React, { memo, useState, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {Alert, Button, Card, CardBody, CardHeader, CardTitle, Col, Row,} from "shards-react";
import Page from "../../components/page/page";
import useFetch from "../../hooks/hookFetch";
import LayoutProductsGrid from "../../components/layout/productsGrid/layoutProductsGrid";

/**
 * Manually figuring out breadcrumbs per component is not an ideal approach, but systemizing this in some way requires
 * much more of a product to be built first to come up with a solution that won't screw you eventually.  That or good
 * foresight and adequate planning ahead of time, none of which we have for a 'test' project.
 */
const breadCrumbs = [
  {route: '/', label: 'Home'},
];

// todo: this should be put in a better place, and probably abstracted as an api interface of some kind
const beersEndpoint = 'https://api.punkapi.com/v2/beers';

const PageHome = memo(() => {
  const {data, error, isLoading} = useFetch(beersEndpoint);
  // todo: this and usage of dismissable-alert can also be abstracted to a new component.
  const [showError, setShowError] = useState(true);
  const dismissErrorCallback = useCallback(() => setShowError(false), []);

  // loading and error state display and management can also be abstracted, but without more of the app having been
  // developed or planned out, would be unreasonable to decide on a methodology up front.

  // if the list of products gets too long, pagination, filtering, load more or virtualization should be addressed.

  // todo: flatter longer cards would probably work better to incorporate the mostly vertical beer images
  return (
    <Page breadCrumbs={breadCrumbs}>
      {data ? (
        <Row>
          <Col>
            <LayoutProductsGrid data={data}>
              {({id, name, tagline, description}) => (
                // todo: make component for individual product card
                <Card role="listitem" key={id} data-key={id}>
                  <CardHeader>{name}</CardHeader>
                  <CardBody>
                    <CardTitle>{tagline}</CardTitle>
                    {/* todo: fix up styling and move to css file.  Recommend using css line-clamp to limit text, but only if we also limit header otherwise some kind of fader */}
                    <p style={{height: 192, overflow: 'hidden' }}>{description}</p>
                    <Link to={`/beer/${id}`}><Button role="link">Read more &rarr;</Button></Link>
                  </CardBody>
                </Card>
              )}
            </LayoutProductsGrid>
          </Col>
        </Row>
      ) : null}
      {isLoading ? (
        <Row>
          <Col>
            Loading...
          </Col>
        </Row>
      ) : null}
      {error ? (
        <Row>
          <Col>
            <Alert theme="danger" dismissible={dismissErrorCallback} open={showError}>
              {error}
            </Alert>
          </Col>
        </Row>
      ) : null}
    </Page>
  )
});

// todo: give proper consideration to responsive design
export default PageHome;

