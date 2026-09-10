<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h4>{{book.title}}</h4>
    <h5>Book's details</h5>
    <form>
     <div class="row">
      <div class="six columns">
       <label for="idInput">ID</label>
       <input class="u-full-width" type="text" v-model="book.id" readonly>
      </div>
      <div class="six columns">
       <label for="copyrightInput">Copyright</label>
       <input class="u-full-width" type="text" v-model="book.copyright" readonly>
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="editionInput">Edition</label>
       <input class="u-full-width" type="text" v-model="book.edition" readonly>
      </div>
      <div class="six columns">
       <label for="languageInput">Language</label>
       <input class="u-full-width" type="text" v-model="book.language" readonly>
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="authorInput">Author</label>
       <a :href="authorsMinisite+'/#/show/'+book.author_id">
         <input class="u-full-width" type="button" :value="book.author" readonly>
       </a>
      </div>
      <div class="six columns">
       <label for="publisherInput">Publisher</label>
       <a :href="publishersMinisite+'/#/show/'+book.publisher_id">
         <input class="u-full-width" type="button" :value="book.publisher" readonly>
       </a>
      </div>
      <a class="button button-primary" style="margin-top: 20px"
        :href="reviewsMinisite">Reviews</a>
      <router-link class="button button-primary" style="margin-top: 20px"
        to="/">Back</router-link>
     </div>
    </form>
   </div>
  </div>
</template>

<script>
import { booksApi, authorsMinisite, publishersMinisite, reviewsMinisite } from './api.js'

export default {
  props: ['id'],
  data() {
    return {
      book: {'id':'','title':'','edition':'','copyright':'','language':'','author':'','author_id':'','publisher':'','publisher_id':''},
      authorsMinisite,
      publishersMinisite,
      reviewsMinisite
    }
  },
  created() {
    this.findBook(this.id);
  },
  methods: {
    findBook(id) {
      fetch(booksApi + '/api/books/' + id,
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.book = result;
        })
    }
  }
}
</script>
