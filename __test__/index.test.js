/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { Home } from 'src/components/home'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to/i
    })

    expect(heading).toBeInTheDocument()
  })
})
