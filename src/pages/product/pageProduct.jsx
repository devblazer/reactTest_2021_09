import React, { memo, useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Page from "../../components/page/page";
import useFetch from "../../hooks/hookFetch";
import {Alert, Col, Row} from "shards-react";

// todo: this should be put in a better place, and probably abstracted as an api interface of some kind
const beersEndpoint = 'https://api.punkapi.com/v2/beers';

const PageProduct = memo(() => {
  const { beerId } = useParams();

  // todo: yep, definitely some api library or abstraction wanted
  const {data, error, isLoading} = useFetch(`${beersEndpoint}/${beerId}`);
  const beer = data?.[0];

  const breadCrumbs = useMemo(() => [
    {route: '/', label: 'Home'},
    ...(beer ? [{route: `/beer/${beer.id}`, label: beer.name}] : []),
  ], [beer]);

  // todo: this and usage of dismissable-alert can also be abstracted to a new component.
  const [showError, setShowError] = useState(true);
  const dismissErrorCallback = useCallback(() => setShowError(false), []);

  // loading and error state display and management can also be abstracted, but without more of the app having been
  // developed or planned out, would be unreasonable to decide on a methodology up front.
  return (
    <Page breadCrumbs={breadCrumbs}>
      {beer ? (
        <Row>
          <Col>
            {/* todo: basically, the whole product page */}
            Product goes here
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

export default PageProduct;

