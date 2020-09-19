import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

it('renders the Welcome text', () => {
  const { getByText } = render(<App />)

  expect(getByText(/Welcome to the Food finder/i)).toBeInTheDocument()
})
