import React from 'react';
import styles from './layoutProductsGrid.module.scss';
// I prefer css in js techs over css modules.  Using modules here for expedience.

// left memo off for ease of use by parent to pass in arrow function
const LayoutProductsGrid = ({data, children}) => (
  <div role="list" className={styles.grid}>
    {data.map(children)}
  </div>
);

export default LayoutProductsGrid;