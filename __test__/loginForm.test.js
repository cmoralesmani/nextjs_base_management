import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Login } from 'src/components/login'

/* eslint-disable no-undef */
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
describe('LoginForm', () => {
  describe('validation', () => {
    describe('username field', () => {
      it('correctly validates the username', async () => {
        render(<Login />)
        const usernameField = screen.getByLabelText('Nombre de usuario')
        const passwordField = screen.getByLabelText('Contraseña')
        const keepSessionActiveField = screen.getByLabelText('Mantener la sesión activada')
        expect(usernameField).toBeInTheDocument()
        expect(passwordField).toBeInTheDocument()
        expect(keepSessionActiveField).toBeInTheDocument()
      })
    })
  })
})
