<template>
  <div class="row">
   <div style="margin-top: 5%">
    <h3>Books Information</h3>
    This section presents information about books
    <ul>
      <li v-for='book in books'>
        <router-link :to="'/show/'+book.id">{{book.title}}</router-link>
      </li>
    </ul>
   </div>
  </div>
</template>

<script>
import { booksApi } from './api.js'

export default {
  data() {
    return {
      books: []
    }
  },
  methods: {
    allBooks() {
      fetch(booksApi + '/api/books',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((result) => {
          this.books = result;
        })
    }
  },
  mounted() {
    this.allBooks()
  }
}
</script>
