<template>
  <div class="row">
   <div style="margin-top: 5%">
    <h3>Reviews Information</h3>
    This section presents information about book reviews
    <ul>
      <li v-for='review in reviews'>
        <router-link :to="'/show/'+review.id">{{review.book_title}} — {{review.reviewer}}</router-link>
      </li>
    </ul>
   </div>
  </div>
</template>

<script>
import { reviewsApi } from './api.js'

export default {
  data() {
    return {
      reviews: []
    }
  },
  methods: {
    allReviews() {
      fetch(reviewsApi + '/api/reviews',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.reviews = result;
        })
    }
  },
  mounted() {
    this.allReviews()
  }
}
</script>
