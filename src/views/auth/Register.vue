<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3 form-group">
        <label for="first_name" class="form-label">First Name</label>
        <input
          @input="$v.userData.first_name.$touch"
          @blur="$v.userData.first_name.$reset" 
          v-model="userData.first_name"
          type="text"
          required
          class="form-control"
          id="first_name"
          aria-describedby="first_name"
        />
      </div>
        <div v-if="$v.userData.first_name.$error">
          <span v-if="!$v.userData.first_name.alpha" class="text-danger">
            Field must contain  alphabet characters only
          </span>
        </div>

      <div class="mb-3 form-group">
        <label for="last_name" class="form-label">Last Name</label>
        <input
          @input="$v.userData.last_name.$touch"
          @blur="$v.userData.last_name.$reset"
          v-model="userData.last_name"
          type="text"
          required
          class="form-control"
          id="last_name"
          aria-describedby="last_name"
        />
        <div v-if="$v.userData.last_name.$error">
          <span v-if="!$v.userData.last_name.alpha" class="text-danger">
            Field must contain alphabet characters only
          </span>
        </div>
      </div>

      <div class="mb-3 form-group">
        <label for="email" class="form-label">Email</label>
        <input
          @blur="$v.userData.email.$touch"
          v-model="userData.email"
          type="email"
          required
          class="form-control"
          id="email"
          aria-describedby="email"
        />
        <div v-if="$v.userData.email.$error">
          <span v-if="!$v.userData.email.email" class="text-danger">
            Field must be an email
          </span>
          <span class="text-danger" v-if="!$v.userData.email.uniqueEmail">This email is already registered.</span>
          <span v-else> </span>
        </div>
      </div>

      <div class="mb-3 form-group">
        <label for="password" class="form-label" >Password</label>
        <input 
          @input="$v.userData.password.$touch"
          @blur="$v.userData.password.$reset" 
          v-model="userData.password"
          type="password"
          required
          class="form-control"
          id="password"
          aria-describedby="password"
        />
        <div v-if="$v.userData.password.$error">
          <span  v-if="!$v.userData.password.minLength" class="text-danger">
            Password needs to be at least {{ $v.userData.password.$params.minLength.min }} characters long
          </span> <br/>
          <span v-if="!$v.userData.password.containsNumber" class="text-danger">
            Password must contain at least one digit
          </span>
        </div>
      </div>

      <div class="mb-3 form-group">
        <label for="password_confirmation" class="form-label">Confirm password</label>
        <input
          @input="$v.userData.password_confirmation.$touch"
          @blur="$v.userData.password_confirmation.$reset" 
          v-model="userData.password_confirmation"
          type="password"
          required
          class="form-control"
          id="password_confirmation"
          aria-describedby="password_confirmation"
        />
        <div v-if="$v.userData.password_confirmation.$error">
          <span  v-if="!$v.userData.password_confirmation.sameAs" class="text-danger">
            Passwords do not match
          </span>
        </div>
      </div>

      <div class="mb-3 form-group">
        <input v-model="userData.terms" type="checkbox" id="terms" name="terms" value="true">
        <label for="terms"> I agree to terms and conditions</label>
      </div>
      <span v-if="registerFailed" class="text-danger">
        Something went wrong :S
      </span>
      <button type="submit" class="btn btn-primary" :disabled="this.$v.$invalid">Register</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import authService from '../../services/AuthService'
import { required, minLength, email, sameAs, alpha } from 'vuelidate/lib/validators'

const uniqueEmail = async (value) => {
   const res = await authService.emailCheck(value)
    return res.message
}

export default {
  name: 'register',
  data() {
    return {
      registerFailed: false,
      userData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: null
      },
    };
  },

   validations: {

     userData: {

       first_name:
       {
         required,
         alpha
       },

       last_name:
       {
         required,
         alpha 
       },

       email:{
         required,
         email,
         uniqueEmail 
       },

       password:
       {
         required,
         minLength: minLength(8),
         containsNumber : value => /[0-9]/.test(value)
       },
       
       password_confirmation:
       {
         sameAs: sameAs(function () { return this.userData.password })
       },
       terms:{
         checked: value => value === true
       }
     }
   },

  methods: {

    ...mapActions('auth', ['register']),

    async handleSubmit() {
      this.registerFailed = true
      this.$v.$touch()
      if(!this.$v.invalid){
      try {
        await this.register(this.userData);
        this.$router.push('/');
        } catch {
        this.registerFailed = false;
        }
      }
    },
  }
};
</script>
<style scoped>
.error-message {
  color: red;
}
</style>
