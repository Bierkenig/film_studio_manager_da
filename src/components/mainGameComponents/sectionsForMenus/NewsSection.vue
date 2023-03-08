<template>
  <div id="newsSection">
    <background-tile id="newsSectionBgTile" :title="$t('news2')">
      <tile-pages-nav class="newsNavigation" :pages='[people,movies, "Studios"]' :gradient='true'>
        <div class="newsTextSection verticalScroll">
          <div v-for="(it, index) in this.peopleNews" :key="index">
            <news-element :svg-code="it._person._avatar" :heading-text="it._title"
                          :info-text="it._description" type="People" class="newsElement"/>
          </div>
        </div>

        <div class="newsTextSection verticalScroll">
          <div v-for="(it, index) in this.movieNews" :key="index">
            <news-element svg-code="" :heading-text="it._title"
                          :info-text="it._description" :genre="it._movie._preProduction.screenplay.genre.genreName.toLowerCase()"
                          type="Movie" class="newsElement"/>
          </div>
        </div>

        <div class="newsTextSection verticalScroll">
          <div v-for="(it, index) in this.studioNews" :key="index">
            <news-element svg-code="" :heading-text="it._title"
                          :info-text="it._description"
                          type="Studio" class="newsElement"/>
          </div>
        </div>

      </tile-pages-nav>
    </background-tile>
  </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import NewsElement from "@/components/kitchenSink/NewsElement";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import {i18next} from "@/translation/i18n";

export default {
  name: "NewsSection",
  components: {BackgroundTile, NewsElement, TilePagesNav},
  data() {
    return {
      peopleNews: [],
      movieNews: [],
      studioNews: [],
      people: i18next.t('people'),
      movies: i18next.t('movies'),
    }
  },

  methods: {
    loadData() {
      let sourceData = this.$store.getters.getCurrentNews;
      sourceData.sort((a, b) => b._date - a._date)
      for (let i = 0; i < sourceData.length; i++) {
        if (sourceData[i]._type === 'People') {
          this.peopleNews.push(sourceData[i])
        }
        if (sourceData[i]._type === 'Movies') {
          this.movieNews.push(sourceData[i])
        }
        if (sourceData[i]._type === 'Studios') {
          this.studioNews.push(sourceData[i])
        }
        if (i === 9) {
          break;
        }
      }
    },
  },

  mounted() {
    this.loadData();
  },
}
</script>

<style scoped>
#newsSection {
  display: flex;
  flex-direction: column;
}

.newsTextSection {
  width: 100%;
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
}

.newsElement {
  margin-bottom: 10px;
}

.newsNavigation {
  flex-grow: 1;
  flex-basis: 0;
  margin-top: 10px;
}

#newsSectionBgTile {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>