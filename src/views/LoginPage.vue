<template>
<div class="loginPage">
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">

      <div class="p-2 mb-5" v-if="errorMessage!=null">
        <div class="bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
          <span class="inline-flex bg-red-500 text-white rounded-full h-6 px-3 justify-center items-center">Error</span>
          <span class="inline-flex px-2">{{errorMessage.message}}</span>
        </div>
      </div>

      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
          <p v-if="!signup" class="inline-block mb-2 text-2xl font-bold">Login</p>
          <p v-else class="inline-block mb-3 text-2xl font-bold">Signup</p>

          <div v-if="signup">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
            <input v-model="name" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
          </div>

          <label class="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
          <input v-model="username" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
          <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
          <input v-model="password" type="password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

          <div v-if="signup">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input v-model="email" type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

          </div>

          <button type="button" @click="formSend" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span v-if="signup==false" class="inline-block mr-2">Login</span>
            <span v-else class="inline-block mr-2">Signup</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        <div class="py-5">
          <div class="grid grid-cols-1 gap-1">
            <div class="text-center whitespace-nowrap px-5">
              <button @click="toogleForm" class="transition w-full duration-200 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <span v-if="!signup" class="">Sign up</span>
                <span v-else class="">Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="py-5">
        <div class="grid grid-cols-2 gap-1">
          <div class="text-center sm:text-left whitespace-nowrap">
            <button to="/" class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span class="inline-block ml-1">Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
      email: "",
      name: "",
      signup: false
    }
  },
  computed: {
    errorMessage: function () {
      return this.$store.state.errorMessage;
    },
    userToken: function () {
      return this.$store.state.userToken;
    }
  },
  methods: {
    formSend() {
        if(this.signup) {
          this.signUp();
        } else {
          this.login();
        }
    },
    login() {
      this.$store.dispatch('loginUser',{
        username: this.username,
        password: this.password
      })
    },
    signUp() {
      this.$store.dispatch('createUser',{
        user_name: this.username,
        password: this.password,
        email: this.email,
        name: this.name,
      })
    },
    toogleForm() {
      this.signup = !this.signup;
    }
  },
  watch: {
    userToken: function (val) {
      if (val != null) {
        this.$router.push('/');
      }
    },
  }
}
</script>

<style scoped>

</style>