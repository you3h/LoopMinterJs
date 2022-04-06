import create from 'zustand'

const useStore = create(set => ({
  user: null,
  setUser: data => set({ user: data }),
}))

export default useStore