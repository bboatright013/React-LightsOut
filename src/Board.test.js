import React from 'react';
import {render, fireEvent } from '@testing-library/react';
import Board from './Board';

//Smoke Test
it("SMOKE: renders without crashing", () => {
    render(<Board />);
  });
  
  //Snapshot test
  it("SNAP: matches snapshot", () => {
    const {asFragment} = render(<Board/>);
    expect(asFragment).toMatchSnapshot();
  });

  it("handles cell clicks", function() {
    const { container } = render(<Board />);
    const td = container.querySelector("td.Cell-lit");
  
    // click on the button
    fireEvent.click(td);
  
    // is the count different?
    expect(td).not.toHaveClass("Cell-lit");
  });