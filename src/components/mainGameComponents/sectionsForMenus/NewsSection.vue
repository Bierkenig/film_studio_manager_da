<template>
  <div id="newsSection">
    <h1 id="newsHeading">{{ $t('news2') }}</h1>

    <!--    <div>-->
    <!--      <select-->
    <!--        v-model="selectedSortType">-->
    <!--        <option value="People">{{ $t('people') }}</option>-->
    <!--        <option value="Movies">{{ $t('movies') }}</option>-->
    <!--        <option value="Studios">Studios</option>-->
    <!--      </select>-->
    <!--    </div>-->
    <div>

    <tile-pages-nav class="newsNavigation" :pages='["People","Movie", "Studios"]' :gradient='true'>

        <div class="newsTextSection scroll verticalScroll">
          <div v-for="(it, index) in this.peopleNews" :key="index">
            <news-element svg-code="" :heading-text="it._title"
                          :info-text="it._description" class="newsElement"/>
          </div>
        </div>

        <div class="newsTextSection scroll verticalScroll">
          <div v-for="(it, index) in this.movieNews" :key="index">
            <news-element svg-code="" :heading-text="it._title"
                          :info-text="it._description" class="newsElement"/>
          </div>
        </div>

        <div class="newsTextSection scroll verticalScroll">
          <div v-for="(it, index) in this.studioNews" :key="index">
            <news-element svg-code="" :heading-text="it._title"
                          :info-text="it._description" class="newsElement"/>
          </div>
        </div>

    </tile-pages-nav>
    </div>
  </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import NewsElement from "@/components/kitchenSink/NewsElement";

export default {
  name: "NewsSection",
  components: {NewsElement, TilePagesNav},
  data() {
    return {
      peopleNews: [],
      movieNews: [],
      studioNews: [],
    }
  },

  methods: {
    loadData() {
      let sourceData = this.$store.getters.getCurrentNews;
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
      }
    }
  },

  mounted() {
    this.loadData();
  },

  watch: {
    selectedSortType() {
      this.data = []
      this.loadData();
    }
  }
}
</script>

<style scoped>
#newsSection {
  display: flex;
  flex-direction: column;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
}

#newsHeading {
  font-size: 28px;
  color: var(--fsm-pink-1);
  margin-top: 0.7em;
  margin-left: 0.7em;
  margin-bottom: 0
}

.newsTextSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.newsElement{
  margin-bottom: 10px;
}
.scroll{
  height:250px;
}

.newsNavigation {
  margin: 15px
}
</style>