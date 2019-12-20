import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 0,
    givenName: "",
    name: "", // nom complet
    surname: "",
    email: "abderrahmane.faiz.50@gmail.com", // can't be empty
    nickname: "",
    isSignedIn: false,
    connectionDate: Object,
    expirationDate: Object,
    expirationTimer: 0,
    googleUser: Object,
    profile: Object,
    flag: false, // to detect if googleUser is filled or not
    hasAccount: false
  },
  mutations: {
    setGoogleUser(state, googleUser) {
      state.flag = true;
      state.googleUser = googleUser;
      state.profile = googleUser.getBasicProfile();
      state.givenName = state.profile.getGivenName();
      state.name = state.profile.getName();
      state.surname = state.profile.getFamilyName();
      state.email = state.profile.getEmail();
      state.isSignedIn = state.googleUser.isSignedIn();
      state.expirationTimer = state.googleUser.getAuthResponse().expires_in;
      /*** Setting expiration timer ***/
      state.connectionDate = new Date();
      state.expirationDate = new Date();
      state.expirationDate.setSeconds(
        state.connectionDate.getSeconds() + state.expirationTimer
      );
    },
    isSignedIn(state) {
      if (state.flag && state.hasAccount) {
        var now = new Date();
        state.isSignedIn = now < state.expirationDate;
        if (!state.isSignedIn) {
          state.flag = false;
          state.googleUser.disconnect();
        }
      } else {
        state.isSignedIn = false;
      }
    },
    logout(state) {
      state.hasAccount = false;
      state.flag = false;
      state.isSignedIn = false;
      state.googleUser.disconnect();
    },
    hasAccount(state) {
      state.hasAccount = true;
    },
    setID(state) {
      console.log("YESS");
      const player = axios.get(
        "http://fama6831.odns.fr/dbcontrol/api/v1/players/ma" + state.email,
        { ResponseType: "json" }
      );
      state.id = player.data.id;
    }
  },
  actions: {
    setGoogleUser(commit, googleUser) {
      this.commit("setGoogleUser", googleUser);
    },
    isSignedIn(commit) {
      this.commit("isSignedIn");
    },
    hasAccount(commit) {
      this.commit("hasAccount");
    },
    logout(commit) {
      this.commit("logout");
    },
    setID(state) {
      this.commit("setID");
    }
  },
  getters: {
    givenName: function(state) {
      return state.givenName;
    },
    name: function(state) {
      return state.name;
    },
    surname: function(state) {
      return state.surname;
    },
    email: function(state) {
      return state.email;
    },
    isSignedIn: function(state) {
      return state.isSignedIn;
    },
    connectionDate: function(state) {
      return state.connectionDate;
    },
    expirationDate: function(state) {
      return state.expirationDate;
    },
    id: function(state) {
      return state.id;
    }
  }
});
