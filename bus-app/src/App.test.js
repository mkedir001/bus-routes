import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';


const mockRoutesImplementation = Promise.resolve({
  json: () => Promise.resolve([
    { route_id: "901", agency_id: 0, route_label: "METRO Blue Line" },
    { route_id: "902", agency_id: 0, route_label: "METRO Green Line" },
    { route_id: "906", agency_id: 10, route_label: "Airport Shuttle" }
  ])
})

global.fetch = jest.fn()

beforeEach(() => {
  fetch.mockClear();
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    mockRoutesImplementation
  })
})

global.alert = jest.fn()

describe("App", () => {
  it("fires fetch call on mount", async () => {
    //use mockedRoutesImplementation to test if drop down contains child elements matching mockedRoutesImplementation[0].route_label
  })
})

describe("rendering components to page", () => {
  beforeEach(() => {
    fetch.mockClear();
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      mockRoutesImplementation
    })
  })
  it("renders App component without crashing", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();

    expect(result.type).toContain('div');
  });
  it("renders App component header without crashing", () => {
    render(<App />);
    expect(screen.getByText("Welcome to Next Transit")).toBeInTheDocument();
  });
  it("renders dropdown component", async () => {
    render(<App />);
    expect(screen.getByText("Select Route")).toBeInTheDocument();
  });
  it("renders find stops button", async () => {
    render(<App />);
    expect(screen.getByText("Find Stops")).toBeInTheDocument();
  })
})
