// deklarasi variabel global
export const state = () => {
  return {
    idUser: '',
  }
}

// ambil data ke variabel
export const getters = {
  idUser(state) {
    return state.idUser
  },
}

// modifikasi data
export const mutations = {
  SET_ID_USER(state, newidUser) {
    state.idUser = newidUser
  },
}

// memberi aksi pada variabel fungsi, parameter "commit" untuk memanggil mutations & parameter "getters" demikian pula
export const actions = {
  setIdUser({ commit }, idUser) {
    commit('SET_ID_USER', idUser)
  },

  async login({ dispatch }, { username, password }) {
    try {
      const { data } = await this.$axios.post(
        'http://localhost:8000/users/login',
        {
          username,
          password,
        }
      )
      if (data.message !== 'SUCCESS') throw new Error(data.message)
      dispatch('setIdUser', data.user)
      return { message: 'SUCCESS' }
    } catch (e) {
      return { message: e.message }
    }
  },
}
