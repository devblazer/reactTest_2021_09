import { render, screen, within } from '@testing-library/react';
import React from 'react';

const mockUseFetch = jest.fn();

jest.mock('../../hooks/hookFetch', () => mockUseFetch);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(({children}) => children),
}));

jest.mock('../../components/page/page', () => ({children}) => children);

jest.mock('shards-react', () => ({
  Row: jest.fn(({children}) => children),
  Col: jest.fn(({children}) => children),
  CardTitle: jest.fn(({children}) => (<div>{children}</div>)),
  CardBody: jest.fn(({children}) => (<div>{children}</div>)),
  Button: jest.fn(({children}) => children),
  Alert: jest.fn(({children}) => children),
  Card: jest.fn(({children}) => (<div role="listitem">{children}</div>)),
  CardHeader: jest.fn(({children}) => (<div>{children}</div>)),
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

const commonResponse = {data: [
  {id: 'testId1', name: 'testName1', tagline: 'testTagline1', description:'test description 1'},
  {id: 'testId2', name: 'testName2', tagline: 'testTagline2', description:'test description 2'},
  {id: 'testId3', name: 'testName3', tagline: 'testTagline3', description:'test description 3'},
], isLoading: false};

describe('api tests', () => {
  it('on load, should make a call to fetch beers', () => {
    const PageHome = require('./pageHome').default;
    mockUseFetch.mockReturnValueOnce({});

    render(<PageHome />);

    expect(mockUseFetch).toHaveBeenCalledTimes(1);
    expect(mockUseFetch).toHaveBeenCalledWith('https://api.punkapi.com/v2/beers');
  });

  it('api data should show up on page', () => {
    const PageHome = require('./pageHome').default;
    const { Card, CardHeader } = require('shards-react');
    const { Link } = require('react-router-dom');

    mockUseFetch.mockImplementation(() => {
      return commonResponse;
    });

    render(<PageHome />);

    expect(screen.queryAllByRole('listitem')).toHaveLength(3);

    const secondProduct = within(screen.queryAllByRole('listitem')[1]);
    expect(secondProduct.queryByText('testName2')).toBeTruthy();
    expect(secondProduct.queryByText('testTagline2')).toBeTruthy();
    expect(secondProduct.queryByText('test description 2')).toBeTruthy();

    expect(Card).toHaveBeenCalledWith(expect.objectContaining({"data-key": 'testId2'}),{});
    expect(CardHeader).toHaveBeenCalledWith(expect.objectContaining({children: 'testName2'}),{});
    expect(Link).toHaveBeenCalledWith(expect.objectContaining({to: '/beer/testId2'}), {});
  });
});

describe('transitioning tests', () => {
  // todo: Incomplete.  Still need to test loading state and error state, along with error dismissal interactions.
});