<template>
  <v-row class="pb-1" :class="$vuetify.breakpoint.smAndDown ? 'px-4' : 'px-12'">
    <v-col class="pa-0">
        <v-row>
            <v-col cols="12">
                <h1 class="text-center primary--text">Suggestions from users</h1>
            </v-col>
        </v-row>
        <v-row>
          <v-col :class="$vuetify.breakpoint.smAndDown ? 'px-4' : 'px-12'">
            <v-card elevation="4">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                ref="datatable"
                :items-per-page="5"
                multi-sort
                :items="comments"
                :headers="headers"
                :search="search"
                :loading="loading"
                loading-text="Loading... Please wait"
                no-data-text="We didn't find comments... Sorry"
                :footer-props="{
                  showFirstLastPage: true,
                  prevIcon: 'mdi-chevron-left',
                  nextIcon: 'mdi-chevron-right'
                }"
              >
              <template v-slot:item.reviewed="{ item }">
                <label class="check-container">
                  <input 
                  type="checkbox"
                  v-model="item.reviewed" 
                  @click="updateStatus(item)">
                  <span class="checkmark"></span>
                </label>
              </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
    </v-col>
    <v-snackbar
      v-model="errorAlert"
      type="error"
      top
      top:timeout="timeout"
      color="error"
      class="white--text"
    >
      <strong class="body-1 registry-snackbar font-weight-bold">
        Error reviewing comment
      </strong>
      <v-btn dark text @click="errorAlert = false" class="white--text">
        X
      </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import Repository from "../../services/repositories/repositoryFactory";
const commentsRepository = Repository.get("comments");
export default {
  name: "Comments",
  data: () => ({
    selectedComments: [],
    search: "",
    test: false,
    loading: true,
    errorAlert: false,
    headers: [
      {
        text: "Date",
        align: "center",
        value: "time_mark",
        class: "primary--text"
      },
     {
        text: "Language",
        align: "center",
        value: "language",
        class: "primary--text"
      },
      {
        text: "Message",
        align: "center",
        value: "comment_message",
        class: "primary--text"
      },
      {
        text: "Reviewed",
        align: "center",
        value: "reviewed",
        class: "primary--text"
      },    
    ],
    comments: [],
  }),
  async mounted() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      let response;
      response = await commentsRepository.getComments();
      this.comments = response;
      this.loading = false;
    },
    async updateStatus(comment){
      const commentData = {
        comment_id: comment.comment_id,
        reviewed: !(comment.reviewed)
      };
      try {
        await commentsRepository.updateComment(commentData);
      } catch {
        this.errorAlert = true
        comment.reviewed = !comment.reviewed
      }
    }
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
@import "../../styles/abstracts/variables.scss";
.check-container {
  display: block;
  position: relative;
  margin-left: 60px;
  margin-bottom: 22px;
  cursor: pointer;
  font-size: 12px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 3px;
}

/* Hide the browser's default checkbox */
.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 5px;
}

/* On mouse-over, add a grey background color */
.check-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked ~ .checkmark {
  background-color: $primary-color;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.check-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.check-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
@media only screen and (max-width: 1300px){
  .check-container {
    margin-left: 38px;
  }
}
@media only screen and (max-width: 1000px){
  .check-container {
    margin-left: 25px;
  }
}
@media only screen and (max-width: 900px){
  .check-container {
    margin-left: 18px;
  }
}
@media only screen and (max-width: 690px){
  .check-container {
    margin-left: 12px;
  }
}
@media only screen and (max-width: 600px){
  .check-container {
    margin-left: -25px;
  }
}
</style>
