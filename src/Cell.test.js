import React from 'react';
import {render, fireEvent } from '@testing-library/react';
import Cell from './Cell';

//Smoke Test
it("SMOKE: renders without crashing", () => {
    render(<table><tbody><tr><Cell/></tr></tbody></table>);
  });
  
  //Snapshot test
  it("SNAP: matches snapshot", () => {
    const {asFragment} = render(<table><tbody><tr><Cell/></tr></tbody></table>);
    expect(asFragment).toMatchSnapshot();
  });