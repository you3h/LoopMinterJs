import create from 'zustand'

const useStore = create(set => ({
  user: null,
  setUser: data => set({ user: data }),
  mintSettings: null,
  setMintSettings: data => set({ mintSettings: data }),
}))

export default useStore