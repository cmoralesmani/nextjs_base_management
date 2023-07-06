import { createContext, useContext } from 'react'

const CheckboxContext = createContext(null)
export const CheckboxProvider = CheckboxContext.Provider

export function useCheckboxContext () {
  const context = useContext(CheckboxContext)
  if (!context) {
    throw new Error('Must be used in scope of a CheckboxProvider')
  }
  return context
}
