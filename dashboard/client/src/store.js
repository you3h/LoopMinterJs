import create from 'zustand'

const useStore = create(set => ({
  user: null,
  setUser: data => set({ user: data }),
  mintSettings: null,
  setMintSettings: data => set({ mintSettings: data }),
  savedColor: {},
  setSavedColor: data => set({ savedColor: data }),
  filelist: {},
  setFilelist: data => set({ filelist: data }),
}))

export default useStore