import React, { useState, useMemo, useContext } from 'react'
import {
  PageLoader
} from '../components'

const LoaderContext = React.createContext()

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const loader = useMemo(() => ({
    show: () => setIsLoading(true),
    hide: () => setIsLoading(false)
  }), [])

  return (
    <>
      {isLoading ? <PageLoader /> : null}
      <LoaderContext.Provider
        value={{
          loader
        }}
      >
        {children}
      </LoaderContext.Provider>
    </>
  )
}

export const useLoader = () => {
  const contextValue = useContext(LoaderContext)
  return contextValue
}
