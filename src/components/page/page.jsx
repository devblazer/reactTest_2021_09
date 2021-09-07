import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem, Container} from "shards-react";

const Page = memo(({breadCrumbs, children}) => (
  <Fragment>
    <Breadcrumb role="navigation">
      {breadCrumbs.map(({route, label}, ind) => (
        <BreadcrumbItem key={route} active={ind === breadCrumbs.length - 1}>
          <Link role="link" to={route}>{label}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
    <Container>
      {children}
    </Container>
  </Fragment>
));

Page.defaultProps = {
  breadCrumbs: [],
};

Page.propTypes = {
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired),
};

export default Page;