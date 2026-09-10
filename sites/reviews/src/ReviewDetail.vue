<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h4>{{review.book_title}}</h4>
    <h5>Review's details</h5>
    <form>
     <div class="row">
      <div class="six columns">
       <label for="idInput">ID</label>
       <input class="u-full-width" type="text" v-model="review.id" readonly>
      </div>
      <div class="six columns">
       <label for="reviewerInput">Reviewer</label>
       <input class="u-full-width" type="text" v-model="review.reviewer" readonly>
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="ratingInput">Rating</label>
       <input class="u-full-width" type="text" v-model="review.rating" readonly>
      </div>
      <div class="six columns">
       <label for="dateInput">Review Date</label>
       <input class="u-full-width" type="text" v-model="review.review_date" readonly>
      </div>
     </div>
     <div class="row">
      <div class="twelve columns">
       <label for="commentInput">Comment</label>
       <textarea class="u-full-width" v-model="review.comment" readonly></textarea>
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="bookInput">Book</label>
       <a :href="booksMinisite+'/#/show/'+review.book_id">
         <input class="u-full-width" type="button" :value="review.book_title" readonly>
       </a>
      </div>
      <router-link class="button button-primary" style="margin-top: 20px"
        to="/">Back</router-link>
     </div>
    </form>
   </div>
  </div>
</template>

<script>
import { reviewsApi, booksMinisite } from './api.js'

export default {
  props: ['id'],
  data() {
    return {
      review: {'id':'','book_id':'','book_title':'','reviewer':'','rating':'','comment':'','review_date':''},
      booksMinisite
    }
  },
  created() {
    this.findReview(this.id);
  },
  methods: {
    findReview(id) {
      fetch(reviewsApi + '/api/reviews/' + id,
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.review = result;
        })
    }
  }
}
</script>
