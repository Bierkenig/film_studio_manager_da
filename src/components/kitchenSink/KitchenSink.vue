<template>
  <div id="kitchenSinkMainDiv">
    <router-link :to="{ name: 'default'}">
      <button id="startMenuButton" class="buttonStyle">Menu</button>
    </router-link>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<page-heading heading="Home">Your manager dashboard.</page-heading>'/>
      <page-heading heading="Home">Your manager dashboard.</page-heading>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<header-info icon="studio">Example Studios</header-info>'/>
      <header-info icon="studio">Example Studios</header-info>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<background-tile title="Title" content-color="white">Test</background-tile> (DEFAULT)'/>
      <code-view code='<background-tile title="Title" content-color="grey" icon="movies">Test</background-tile>'/>
      <div class="kitchenSinkFlexRow">
        <background-tile title="Title" content-color="white">Test</background-tile>
        <div class="kitchenSinkSpacer"/>
        <background-tile title="Title" content-color="grey" icon="movies">Test</background-tile>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code="USAGE: fix size and apply class: verticalScroll"/>
      <div class="kitchenSinkScrollDiv verticalScroll">
        <custom-button :dark="true">Scroll Test</custom-button>
        <custom-button :dark="true">Scroll Test</custom-button>
        <custom-button :dark="true">Scroll Test</custom-button>
        <custom-button :dark="true">Scroll Test</custom-button>
        <custom-button :dark="true">Scroll Test</custom-button>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code="USAGE: fix size and apply class: horizontalScroll"/>
      <div class="kitchenSinkScrollDiv horizontalScroll kitchenSinkFlexRow">
        <custom-button :dark="true" style="flex-shrink: 0;">Scroll Test</custom-button>
        <custom-button :dark="true" style="flex-shrink: 0;">Scroll Test</custom-button>
        <custom-button :dark="true" style="flex-shrink: 0;">Scroll Test</custom-button>
        <custom-button :dark="true" style="flex-shrink: 0;">Scroll Test</custom-button>
        <custom-button :dark="true" style="flex-shrink: 0;">Scroll Test</custom-button>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<custom-button :dark="false" size="medium">Test</custom-button> (DEFAULT)'/>
      <code-view
          code='<custom-button :dark="true" size="medium" @clicked="yourFunction">Function Test</custom-button>'/>
      <div class="kitchenSinkFlexRow">
        <custom-button :dark="false" size="medium">Test</custom-button>
        <div class="kitchenSinkSpacer"/>
        <custom-button :dark="true" size="medium" @clicked="yourFunction">Function Test</custom-button>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<custom-button :dark="false" size="large">Test</custom-button>'/>
      <code-view code='<custom-button :dark="true" size="large">Test</custom-button>'/>
      <div class="kitchenSinkFlexRow">
        <custom-button :dark="false" size="large">Test</custom-button>
        <div class="kitchenSinkSpacer"/>
        <custom-button :dark="true" size="large">Test</custom-button>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<custom-icon icon="home" size="60px" theme="light" :gradient="false" :shadow="true"/>'/>
      <code-view
          code='<custom-icon icon="settings" size="60px" theme="light" :gradient="false" :shadow="false"/> (DEFAULT)'/>
      <code-view code='<custom-icon icon="suicide" size="60px" theme="light" :gradient="true" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="movies" size="60px" theme="dark" :gradient="false" :shadow="true"/>'/>
      <code-view code='<custom-icon icon="prison" size="60px" theme="dark" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="ninjas" size="60px" theme="dark" :gradient="true" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="simple-tick" size="60px" theme="red" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="rising-chart" size="60px" theme="green" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="rising-chart" size="60px" theme="blue" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="award" size="60px" theme="yellow" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="action" size="60px" theme="white" :gradient="false" :shadow="false"/>'/>
      <div class="kitchenSinkFlexRow">
        <custom-icon icon="home" size="60px" theme="light" :gradient="false" :shadow="true"/>
        <custom-icon icon="settings" size="60px" theme="light" :gradient="false" :shadow="false"/>
        <custom-icon icon="suicide" size="60px" theme="light" :gradient="true" :shadow="false"/>
        <custom-icon icon="movies" size="60px" theme="dark" :gradient="false" :shadow="true"/>
        <custom-icon icon="prison" size="60px" theme="dark" :gradient="false" :shadow="false"/>
        <custom-icon icon="ninjas" size="60px" theme="dark" :gradient="true" :shadow="false"/>
        <custom-icon icon="simple-tick" size="60px" theme="red" :gradient="false" :shadow="false"/>
        <custom-icon icon="rising-chart" size="60px" theme="green" :gradient="false" :shadow="false"/>
        <custom-icon icon="rising-chart" size="60px" theme="blue" :gradient="false" :shadow="false"/>
        <custom-icon icon="award" size="60px" theme="yellow" :gradient="false" :shadow="false"/>
        <custom-icon icon="action" size="60px" theme="white" :gradient="false" :shadow="false"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<icon-button icon="plus" size="extraSmall" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>'/>
      <code-view
          code='<icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>'/>
      <code-view
          code='<icon-button icon="settings" size="large" :dark="false" :bg-gradient="true" :icon-gradient="false" :shadow="false"/>'/>
      <code-view
          code='<icon-button icon="home" size="large" :dark="false" :bg-gradient="true" :icon-gradient="true" :shadow="true"/>'/>
      <code-view
          code='<icon-button icon="movies" size="medium" :dark="true" :bg-gradient="true" :icon-gradient="true" :shadow="false"/>'/>
      <div class="kitchenSinkFlexRow">
        <icon-button icon="plus" size="extraSmall" :dark="false" :bg-gradient="false" :icon-gradient="false"
                     :shadow="false"/>
        <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false"
                     :shadow="false"/>
        <icon-button icon="settings" size="large" :dark="false" :bg-gradient="true" :icon-gradient="false"
                     :shadow="false"/>
        <icon-button icon="home" size="large" :dark="false" :bg-gradient="true" :icon-gradient="true" :shadow="true"/>
        <icon-button icon="movies" size="medium" :dark="true" :bg-gradient="true" :icon-gradient="true"
                     :shadow="false"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view :code="'<tile-pages-nav :pages=' + singleQuote + JSON.stringify(navExample1) + singleQuote + '>'"/>
      <code-view code='░░<div>All</div>'/>
      <code-view code='░░<div>In Production</div>'/>
      <code-view code='░░<div>Released</div>'/>
      <code-view code='</tile-pages-nav>'/>
      <tile-pages-nav :pages='navExample1'>
        <div>All</div>
        <div>In Production</div>
        <div>Released</div>
      </tile-pages-nav>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          :code="'<tile-pages-nav :pages=' + singleQuote + JSON.stringify(navExample2) + singleQuote + ' :gradient=' + singleQuote + 'true' + singleQuote + '>'"/>
      <code-view code='░░<div>Movies</div>'/>
      <code-view code='░░<div>People</div>'/>
      <code-view code='░░<div>Others</div>'/>
      <code-view code='</tile-pages-nav>'/>
      <tile-pages-nav :pages='navExample2' :gradient='true'>
        <div>Movies</div>
        <div>People</div>
        <div>Others</div>
      </tile-pages-nav>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<event-element type="productionFinished" movieName="Movie Title Name One" hide-open-icon/>'/>
      <code-view code='<event-element type="featureFilm" movieName="Movie Title Name One" hide-open-icon/>'/>
      <code-view code='<event-element type="blockbuster" movieName="Movie Title Name One"/>'/>
      <code-view code='<event-element type="award" @open-clicked="elementOpened"/>'/>
      <div class="kitchenSinkFlexRow">
        <event-element type="productionFinished" movieTitle="Movie Title Name One" hide-open-icon/>
        <div class="kitchenSinkSpacer"/>
        <event-element type="featureFilm" movieTitle="Movie Title Name One" hide-open-icon/>
      </div>
      <div class="kitchenSinkSpacer"/>
      <div class="kitchenSinkFlexRow">
        <event-element type="blockbuster" movieTitle="Movie Title Name One"/>
        <div class="kitchenSinkSpacer"/>
        <event-element type="award" @open-clicked="elementOpened"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<production-element movie-title="Title" release-date="Date" status="Status" time-left="Time left" @open-clicked="elementOpened"/>'/>
      <production-element movie-title="Title" release-date="Date" status="Status" time-left="Time left"
                          @open-clicked="elementOpened"/>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<news-element svg-code="" heading-text="News Heading Text News Heading Text" info-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore magna aliqua."/>'/>
      <code-view
          code='<news-element :svg-code="examplePoster" heading-text="News Heading Text News Heading Text" info-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore magna aliqua."/>'/>
      <code-view
          code='<news-element :svg-code="exampleAvatar" heading-text="News Heading Text News Heading Text" info-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore magna aliqua."/>'/>
      <div class="kitchenSinkFlexRow">
        <news-element svg-code="" heading-text="News Heading Text News Heading Text"
                      info-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore magna aliqua."
        />
        <div class="kitchenSinkSpacer"/>
        <news-element :svg-code="examplePoster" heading-text="News Heading Text News Heading Text"
                      info-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore magna aliqua."
        />
        <div class="kitchenSinkSpacer"/>
        <news-element :svg-code="exampleAvatar" heading-text="News Heading Text News Heading Text"
                      info-text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore magna aliqua."
        />
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<earning-element movie-title="Movie Title" movie-earnings="$ 1,000,000" @open-clicked="elementOpened"/>'/>
      <div class="kitchenSinkFlexRow">
        <earning-element movie-title="Movie Title" movie-earnings="$ 1,000,000" @open-clicked="elementOpened"/>
        <div class="kitchenSinkSpacer"/>
        <earning-element movie-title="Movie Title" movie-earnings="$ 1,000,000" @open-clicked="elementOpened"/>
        <div class="kitchenSinkSpacer"/>
        <earning-element movie-title="Movie Title" movie-earnings="$ 1,000,000" @open-clicked="elementOpened"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<custom-select :options="exampleOptions" placeholder="Please Select" @select-change="showSelected"/>'/>
      <div class="kitchenSinkFlexRow">
        <custom-select :options="exampleOptions" placeholder="Please Select" @select-change="showSelected"/>
        <div class="kitchenSinkSpacer"/>
        <custom-select :options="exampleOptions" placeholder="Please Select" @select-change="showSelected"/>
        <div class="kitchenSinkSpacer"/>
        <custom-select :options="exampleOptions" placeholder="Please Select" @select-change="showSelected"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<custom-list-sort @sort-changed="showSort"/>'/>
      <div class="kitchenSinkFlexRow">
        <custom-list-sort @sort-changed="showSort"/>
        <div class="kitchenSinkSpacer"/>
        <custom-list-sort @sort-changed="showSort"/>
        <div class="kitchenSinkSpacer"/>
        <custom-list-sort @sort-changed="showSort"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<info-circle />'/>
      <code-view code='<info-circle text="13+"/>'/>
      <code-view code='<info-circle text="1" size="30px" alternative-style/>'/>
      <code-view code='<info-circle :dark="false"/>'/>
      <code-view code='<info-circle text="13+" :dark="false"/>'/>
      <div class="kitchenSinkFlexRow">
        <info-circle/>
        <div class="kitchenSinkSpacer"/>
        <info-circle text="13+"/>
        <div class="kitchenSinkSpacer"/>
        <info-circle text="1" size="30px" alternative-style/>
        <div class="kitchenSinkSpacer"/>
        <info-circle :dark="false"/>
        <div class="kitchenSinkSpacer"/>
        <info-circle text="13+" :dark="false"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<movie-element movie-title="Movie Title" :svg-code="examplePoster" viewers="99" critics="99" age="13+" genre="Western" genre-icon="western" budget="$ 9,999"  earnings="$ 999,999" @open-clicked="elementOpened"/>'/>
      <movie-element movie-title="Movie Title" :svg-code="examplePoster" viewers="99" critics="99" age="13+"
                     genre="Western" genre-icon="western" budget="$ 9,999" earnings="$ 999,999"
                     @open-clicked="elementOpened"/>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<screenplay-element screenplay-title="Screenplay Title" :svg-code="examplePoster" age="13+" genre="Action" genre-icon="action" :quality="1" writer="John Doe" @open-clicked="elementOpened"/>'/>
      <code-view
          code='<screenplay-element screenplay-title="Screenplay Title" :svg-code="examplePoster" age="6+" genre="Cars" genre-icon="cars" :quality="100" writer="Don Joe" @open-clicked="elementOpened"/>'/>
      <div class="kitchenSinkFlexRow">
        <screenplay-element screenplay-title="Screenplay Title" :svg-code="examplePoster" age="13+" genre="Action"
                            genre-icon="action" :quality="1" writer="John Doe" @open-clicked="elementOpened"/>
        <div class="kitchenSinkSpacer"/>
        <screenplay-element screenplay-title="Screenplay Title" :svg-code="examplePoster" age="6+" genre="Cars"
                            genre-icon="cars" :quality="100" writer="Don Joe" @open-clicked="elementOpened"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<info-line>Balalalalalalala</info-line>'/>
      <div class="kitchenSinkFlexRow">
        <info-line>Balalalalalalala</info-line>
        <div class="kitchenSinkSpacer"/>
        <info-line>Balalalalalalala</info-line>
        <div class="kitchenSinkSpacer"/>
        <info-line>Balalalalalalala</info-line>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<streaming-element movie-title="Movie Title" age="13+" owner="Example Studios" contract="Unlimited"/>'/>
      <code-view
          code='<streaming-element movie-title="Movie Title" age="13+" owner="Example Studios" contract="Limited" :contract-critical="true"/>'/>
      <div class="kitchenSinkFlexRow">
        <streaming-element movie-title="Movie Title" popularity="99" owner="Example Studios" contract="Unlimited"/>
        <div class="kitchenSinkSpacer"/>
        <streaming-element movie-title="Movie Title" popularity="99" owner="Example Studios" contract="Limited"
                           :contract-critical="true"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<streaming-competitor-element subscribers="9,999,999" owner="Example Studios" streaming-service="Example Studios+"/>'/>
      <div class="kitchenSinkFlexRow">
        <streaming-competitor-element subscribers="9,999,999" owner="Example Studios"
                                      streaming-service="Example Studios+"/>
        <div class="kitchenSinkSpacer"/>
        <streaming-competitor-element subscribers="9,999,999" owner="Example Studios"
                                      streaming-service="Example Studios+"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<finance-element area="Area" incoming="Incoming" outgoing="Outgoing" accumulated="Accumulated" :color-incoming="false" :color-outgoing="false" :color-accumulated="false"/>'/>
      <code-view
          code='<finance-element area="Area 51" incoming="$ 999,999,999" outgoing="- $ 999,999,999" accumulated="$ 999,999,999"/>'/>
      <code-view
          code='<finance-element area="Area 51" incoming="$ 999,999,999" outgoing="- $ 999,999,999" accumulated="- $ 999,999,999"/>'/>
      <finance-element area="Area" incoming="Incoming" outgoing="Outgoing" accumulated="Accumulated"
                       :color-incoming="false" :color-outgoing="false" :color-accumulated="false"/>
      <div class="kitchenSinkSpacer"/>
      <finance-element area="Area 51" incoming="$ 999,999,999" outgoing="- $ 999,999,999" accumulated="$ 999,999,999"/>
      <div class="kitchenSinkSpacer"/>
      <finance-element area="Area 51" incoming="$ 999,999,999" outgoing="- $ 999,999,999"
                       accumulated="- $ 999,999,999"/>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<market-share-element studio="Studio" sales="Sales" share="Share" change="Change" no-change-color/>'/>
      <code-view
          code='<market-share-element studio="Example Studios" icon="action" sales="$ 999,999,999" share="99%" change="+99%"/>'/>
      <code-view
          code='<market-share-element studio="Example Studios" icon="action" icon-theme="green" sales="$ 999,999,999" share="99%" change="-99%"/>'/>
      <market-share-element studio="Studio" sales="Sales" share="Share" change="Change" no-change-color/>
      <div class="kitchenSinkSpacer"/>
      <market-share-element studio="Example Studios" icon="action" sales="$ 999,999,999" share="99%" change="+99%"/>
      <div class="kitchenSinkSpacer"/>
      <market-share-element studio="Example Studios" icon="action" icon-theme="white" sales="$ 999,999,999" share="99%"
                            change="-99%"/>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view
          code='<earning-statistics-element list-number="1" movie-title="Movie Title" opening="$ 99,999,999" total="$ 999,999,999" studio="Example Studios"/>'/>
      <earning-statistics-element list-number="1" movie-title="Movie Title" opening="$ 99,999,999" total="$ 999,999,999"
                                  studio="Example Studios"/>
    </div>
  </div>
</template>

<script>
import PageHeading from "@/components/kitchenSink/PageHeading";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile";
import CustomButton from "@/components/kitchenSink/CustomButton";
import CodeView from "@/components/kitchenSink/CodeView";
import IconButton from "@/components/kitchenSink/IconButton";
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import CustomIcon from "@/components/kitchenSink/CustomIcon";
import HeaderInfo from "@/components/kitchenSink/HeaderInfo";
import EventElement from "@/components/kitchenSink/EventElement";
import ProductionElement from "@/components/kitchenSink/ProductionElement";
import NewsElement from "@/components/kitchenSink/NewsElement";
import EarningElement from "@/components/kitchenSink/EarningElement";
import CustomSelect from "@/components/kitchenSink/CustomSelect";
import CustomListSort from "@/components/kitchenSink/CustomListSort";
import MovieElement from "@/components/kitchenSink/MovieElement";
import InfoCircle from "@/components/kitchenSink/InfoCircle";
import ScreenplayElement from "@/components/kitchenSink/ScreenplayElement";
import InfoLine from "@/components/kitchenSink/InfoLine";
import StreamingElement from "@/components/kitchenSink/StreamingElement";
import StreamingCompetitorElement from "@/components/kitchenSink/StreamingCompetitorElement";
import FinanceElement from "@/components/kitchenSink/FinanceElement";
import MarketShareElement from "@/components/kitchenSink/MarketShareElement";
import EarningStatisticsElement from "@/components/kitchenSink/EarningStatisticsElement";

export default {
  name: "KitchenSink",
  components: {
    EarningStatisticsElement,
    MarketShareElement,
    FinanceElement,
    StreamingCompetitorElement,
    StreamingElement,
    InfoLine,
    ScreenplayElement,
    InfoCircle,
    MovieElement,
    CustomListSort,
    CustomSelect,
    EarningElement,
    NewsElement,
    ProductionElement,
    HeaderInfo,
    CustomIcon,
    TilePagesNav,
    IconButton,
    CodeView,
    CustomButton,
    BackgroundTile,
    PageHeading,
    EventElement
  },
  data() {
    return {
      navExample1: ['All', 'In Production', 'Released'],
      navExample2: ['Movies', 'People', 'Others'],
      exampleAvatar: '<svg width="80" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(40, 36)"><path d="M100 0C69.072 0 44 25.072 44 56v6.166c-5.675.952-10 5.888-10 11.834v14c0 6.052 4.48 11.058 10.305 11.881 2.067 19.806 14.458 36.541 31.695 44.73V163h-4c-39.764 0-72 32.236-72 72v9h200v-9c0-39.764-32.236-72-72-72h-4v-18.389c17.237-8.189 29.628-24.924 31.695-44.73C161.52 99.058 166 94.052 166 88V74c0-5.946-4.325-10.882-10-11.834V56c0-30.928-25.072-56-56-56z" fill="#FD9841"/><path d="M76 144.611v8A55.79 55.79 0 00100 158a55.789 55.789 0 0024-5.389v-8A55.789 55.789 0 01100 150a55.79 55.79 0 01-24-5.389z" fill="#000" fill-opacity=".1"/></g><g transform="translate(8, 170)"><path d="M132.5 65.828c27.338 0 49.5-13.199 49.5-29.48 0-1.363-.155-2.704-.456-4.017C210.784 41.487 232 68.791 232 101.052V110H32v-8.948c0-32.655 21.739-60.232 51.534-69.05A18.001 18.001 0 0083 36.348c0 16.281 22.162 29.48 49.5 29.48z" fill="#25557C"/></g><g transform="translate(86, 134)"><path fill-rule="evenodd" clip-rule="evenodd" d="M40 29c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#000" fill-opacity=".7"/></g><g transform="translate(112, 122)"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 8c0 4.418 5.373 8 12 8s12-3.582 12-8" fill="#000" fill-opacity=".16"/></g><g transform="translate(84, 90)"><path d="M26.998 16c-4.834 0-8.991 2.648-10.838 6.447-.54 1.111.387 1.853 1.277 1.125 2.437-1.993 5.82-3.228 9.56-3.228.082 0 .163 0 .244.002a6 6 0 1010.699 2.8 2 2 0 00-.125-.739 7.55 7.55 0 00-.144-.372 6.007 6.007 0 00-1.646-2.484C33.9 17.317 30.507 16 26.998 16zm58 0c-4.834 0-8.991 2.648-10.838 6.447-.54 1.111.387 1.853 1.278 1.125 2.436-1.993 5.82-3.228 9.56-3.228.08 0 .162 0 .243.002a6 6 0 1010.699 2.8 2 2 0 00-.125-.739 7.55 7.55 0 00-.144-.372 6.007 6.007 0 00-1.646-2.484C91.9 17.317 88.506 16 84.998 16z" fill="#000" fill-opacity=".6"/></g><g transform="translate(84, 82)"><path fill-rule="evenodd" clip-rule="evenodd" d="M26.547 6.148c-5.807.269-15.195 4.488-14.953 10.344.008.192.29.276.427.129 2.755-2.96 22.316-5.95 29.205-4.365.63.145 1.11-.477.71-.927-3.422-3.848-10.186-5.426-15.389-5.18zm59.906 0c5.807.269 15.195 4.488 14.953 10.344-.008.192-.29.276-.427.129-2.755-2.96-22.316-5.95-29.205-4.365-.63.145-1.11-.477-.71-.927 3.422-3.848 10.186-5.426 15.389-5.18z" fill="#000" fill-opacity=".6"/></g><g transform="translate(7, 0)"><path d="M44.826 105.591c-.382-1.606-.769-3.229-1.124-4.91-1.952-9.236-2.956-20.223 2.884-39.676-6.903 22.995-4.243 34.16-1.76 44.586 1.238 5.196 2.432 10.208 2.377 16.409.02 2.295-.38 4.285-1.104 6.057.723-1.772 1.124-3.762 1.104-6.057.055-6.201-1.14-11.213-2.377-16.409zm173.55 8.643c-.131.386-.156.805-.173 1.226.053-.412.111-.821.173-1.226zm-.33 2.579a47.23 47.23 0 00-.223 3.347c-29.04-10.756-54.946-29.617-70.328-51.548-12.093 15.618-31.955 23.04-51.622 30.391-17.386 6.498-34.619 12.939-46.2 24.933.388-.544.755-1.051 1.086-1.49 10.998-14.601 28.764-21.887 46.7-29.242 18.816-7.716 37.817-15.508 49.387-31.902 15.398 24.088 41.819 44.648 71.163 55.625.014-.038.026-.076.037-.114z" fill="#000" fill-opacity=".16"/><path d="M32.005 280H33v-9c0-39.764 32.236-72 72-72h4v-18.389c-17.53-8.328-30.048-25.496-31.791-45.744C71.43 134.002 67 129.019 67 123v-13c0-.794.077-1.569.224-2.32 9.114-5.815 19.645-10.133 30.235-14.476 18.815-7.716 37.817-15.508 49.386-31.902 11.958 18.706 30.562 35.283 52.021 46.898.088.587.134 1.188.134 1.8v13c0 6.019-4.431 11.002-10.209 11.867-1.743 20.248-14.26 37.416-31.791 45.744V199h4c39.764 0 72 32.236 72 72v9c24.414-13.94 15.859-33.211 6.284-48.463-1.368-2.179-2.756-4.276-4.073-6.264-3.479-5.255-6.453-9.746-7.201-12.97a6.578 6.578 0 01-.179-1.303c-.144-4.617 3.141-7.836 7.164-11.777 6.21-6.084 14.178-13.891 14.008-31.223-.514-15.834-9.801-22.253-18.109-27.995-6.924-4.785-13.168-9.101-13.091-18.005a46.419 46.419 0 01.244-5.189c.118-.4.135-.828.152-1.254l.004-.093c.444-3.443 1.202-6.622 1.976-9.873 2.555-10.725 5.295-22.232-2.376-46.591-2.91-9.115-6.971-16.5-12.101-22.461-14.127-16.419-36.354-22.041-64.906-23.289a297.772 297.772 0 00-7.793-.234V13l-.5.008-.5-.008c-43.086.768-73.163 9.54-84.8 46-7.672 24.36-4.931 35.866-2.377 46.591 1.238 5.196 2.432 10.208 2.377 16.409.032 3.753-1.059 6.691-2.85 9.193-2.459 3.433-6.237 6.044-10.242 8.812-8.308 5.742-17.595 12.161-18.108 27.995-.17 17.332 7.797 25.139 14.007 31.223 4.023 3.941 7.308 7.16 7.164 11.777-.087 3.259-3.403 8.267-7.38 14.273-10.53 15.901-25.69 38.795 2.211 54.727z" fill="#E8E1E1"/><path fill-rule="evenodd" clip-rule="evenodd" d="M50.58 122.446c22.536-29.919 73.489-29.122 96.087-61.144 15.398 24.088 41.819 44.648 71.164 55.625.301-.854.08-1.85.367-2.694 2.155-14.144 9.144-24.378-.574-55.233-11.637-36.46-41.714-45.232-84.8-45.984a465.51 465.51 0 00-1-.016c-43.086.768-73.163 9.54-84.8 46-11.388 36.16.17 43.999 0 63 .033 3.753-1.058 6.691-2.85 9.193.184.402 4.154-5.756 6.406-8.747z" fill="#fff" fill-opacity=".2"/></g><g transform="translate(56, 72)"><path d="M83.998 66.938c-2.5-3.336-12.267-4.749-19.277-3.474-9.653 1.757-13.744 12.303-12.506 14.215.772 1.191 2.482.793 4.26.379.814-.19 1.642-.383 2.401-.428 1.486-.089 3.34.218 5.446.567 4.981.824 11.37 1.88 17.628-1.508a6.041 6.041 0 002.048-1.85 6.041 6.041 0 002.048 1.85c6.257 3.389 12.647 2.332 17.628 1.508 2.106-.349 3.96-.656 5.446-.567.759.045 1.587.238 2.401.428 1.778.414 3.488.812 4.26-.379 1.238-1.912-2.853-12.458-12.507-14.215-7.009-1.275-16.775.138-19.276 3.474z" fill="#E8E1E1"/></g><g transform="translate(69, 85)"><path fill-rule="evenodd" clip-rule="evenodd" d="M38.5 9C17.21 9 9.646 14.096 8.955 14.772 7.324 14.772 6 16.062 6 17.657v2.886c0 1.596 1.324 2.886 2.955 2.886 0 0 5.909 0 5.909 2.886 0 .435.067.644.181.68A62.59 62.59 0 0015 29.5C15 42.336 23.315 50 37.242 50H40c14.721 0 25-8.431 25-20.5 0-1.502-.038-2.999-.17-4.46l1.583-.773a7.917 7.917 0 011.891-.633c1.855-.38 3.952-.227 5.992.276.732.18 1.26.354 1.504.45l1.381.547C77.041 26.41 77 27.953 77 29.5 77 42.336 85.315 50 99.242 50H102c14.721 0 25-8.431 25-20.5 0-1.536-.04-3.067-.178-4.56 1.739-1.511 6.223-1.511 6.223-1.511 1.634 0 2.955-1.29 2.955-2.886v-2.886c0-1.596-1.321-2.885-2.955-2.885C132.354 14.096 124.79 9 103.5 9h-2.97c-1.79 0-3.445.069-4.975.201-9.533.539-14.679 2.15-19.913 4.696a17.01 17.01 0 01-4.563.869c-2.379-.076-4.412-.767-4.81-.908l-.419-.206-.006-.003c-4.935-2.415-8.429-4.125-20.772-4.547A61.165 61.165 0 0041.47 9H38.5zM19 30.502C19 21.84 19 15 38.385 15h3.23C61 15 61 21.841 61 30.502 61 39.627 52.365 46 40 46h-3.03C22.117 46 19 37.572 19 30.502zm62 0C81 21.84 81 15 100.385 15h3.23C123 15 123 21.841 123 30.502 123 39.627 114.365 46 102 46h-3.03C84.12 46 81 37.572 81 30.502z" fill="#000" fill-opacity=".1"/><path fill-rule="evenodd" clip-rule="evenodd" d="M38.5 7C17.21 7 9.646 12.096 8.955 12.772 7.324 12.772 6 14.062 6 15.657v2.886c0 1.596 1.324 2.886 2.955 2.886 0 0 5.909 0 5.909 2.886 0 .435.067.644.181.68A62.59 62.59 0 0015 27.5C15 40.336 23.315 48 37.242 48H40c14.721 0 25-8.431 25-20.5 0-1.502-.038-2.999-.17-4.46l1.583-.773a7.917 7.917 0 011.891-.633c1.855-.38 3.952-.227 5.992.276.732.18 1.26.354 1.504.45l1.381.547C77.041 24.41 77 25.953 77 27.5 77 40.336 85.315 48 99.242 48H102c14.721 0 25-8.431 25-20.5 0-1.536-.04-3.067-.178-4.56 1.739-1.511 6.223-1.511 6.223-1.511 1.634 0 2.955-1.29 2.955-2.886v-2.886c0-1.595-1.321-2.885-2.955-2.885C132.354 12.096 124.79 7 103.5 7h-2.97c-1.79 0-3.445.069-4.975.2-9.533.54-14.679 2.152-19.913 4.697a17.01 17.01 0 01-4.563.869c-2.379-.076-4.412-.767-4.81-.908l-.419-.206-.006-.003c-4.935-2.415-8.429-4.125-20.772-4.547A61.165 61.165 0 0041.47 7H38.5zM19 28.502C19 19.84 19 13 38.385 13h3.23C61 13 61 19.841 61 28.502 61 37.627 52.365 44 40 44h-3.03C22.117 44 19 35.572 19 28.502zm62 0C81 19.84 81 13 100.385 13h3.23C123 13 123 19.841 123 28.502 123 37.627 114.365 44 102 44h-3.03C84.12 44 81 35.572 81 28.502z" fill="#FFAFB9"/></g></svg>',
      examplePoster: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="600" viewBox="0 0 400 600"><defs><clipPath id="clip-Poster_Streifen_6"><rect width="400" height="600"/></clipPath></defs><g id="Poster_Streifen_6" data-name="Poster Streifen 6" clip-path="url(#clip-Poster_Streifen_6)"><rect width="400" height="600"/><g id="Gruppe_25" data-name="Gruppe 25"><rect id="Rechteck_3572" data-name="Rechteck 3572" width="20" height="750" transform="translate(190 -75)" fill="#fff"/><rect id="Rechteck_3594" data-name="Rechteck 3594" width="20" height="750" transform="matrix(0.985, 0.174, -0.174, 0.985, 255.27, -71.039)" fill="#bbb"/><rect id="Rechteck_3595" data-name="Rechteck 3595" width="20" height="750" transform="translate(318.86 -55.805) rotate(20)" fill="#fff"/><rect id="Rechteck_3596" data-name="Rechteck 3596" width="20" height="750" transform="translate(378.84 -29.76) rotate(30)" fill="#bbb"/><rect id="Rechteck_3597" data-name="Rechteck 3597" width="20" height="750" transform="translate(433.385 6.305) rotate(40)" fill="#fff"/><rect id="Rechteck_3598" data-name="Rechteck 3598" width="20" height="750" transform="translate(480.839 51.294) rotate(50)" fill="#bbb"/><rect id="Rechteck_3599" data-name="Rechteck 3599" width="20" height="750" transform="translate(519.76 103.84) rotate(60)" fill="#fff"/><rect id="Rechteck_3600" data-name="Rechteck 3600" width="20" height="750" transform="translate(548.965 162.345) rotate(70)" fill="#bbb"/><rect id="Rechteck_3601" data-name="Rechteck 3601" width="20" height="750" transform="matrix(0.174, 0.985, -0.985, 0.174, 567.566, 225.034)" fill="#fff"/><rect id="Rechteck_3602" data-name="Rechteck 3602" width="20" height="750" transform="translate(575 290) rotate(90)" fill="#bbb"/><rect id="Rechteck_3572-2" data-name="Rechteck 3572" width="20" height="750" transform="matrix(-0.174, 0.985, -0.985, -0.174, 571.039, 355.27)" fill="#fff"/><rect id="Rechteck_3594-2" data-name="Rechteck 3594" width="20" height="750" transform="translate(555.805 418.86) rotate(110)" fill="#bbb"/><rect id="Rechteck_3595-2" data-name="Rechteck 3595" width="20" height="750" transform="matrix(-0.5, 0.866, -0.866, -0.5, 529.76, 478.839)" fill="#fff"/><rect id="Rechteck_3596-2" data-name="Rechteck 3596" width="20" height="750" transform="matrix(-0.643, 0.766, -0.766, -0.643, 493.694, 533.385)" fill="#bbb"/><rect id="Rechteck_3597-2" data-name="Rechteck 3597" width="20" height="750" transform="matrix(-0.766, 0.643, -0.643, -0.766, 448.706, 580.839)" fill="#fff"/><rect id="Rechteck_3598-2" data-name="Rechteck 3598" width="20" height="750" transform="translate(396.16 619.76) rotate(150)" fill="#bbb"/><rect id="Rechteck_3599-2" data-name="Rechteck 3599" width="20" height="750" transform="translate(337.654 648.965) rotate(160)" fill="#fff"/><rect id="Rechteck_3600-2" data-name="Rechteck 3600" width="20" height="750" transform="matrix(-0.985, 0.174, -0.174, -0.985, 274.966, 667.567)" fill="#bbb"/><rect id="Rechteck_3601-2" data-name="Rechteck 3601" width="20" height="750" transform="translate(210 675) rotate(180)" fill="#fff"/></g></g></svg>',
      exampleOptions: ['Option 1', 'Option 2', 'Option 3'],
      singleQuote: "'",
      doubleQuote: '"',
    }
  },
  methods: {
    yourFunction() {
      alert('yourFunction has been executed');
    },
    showSelected(value) {
      alert('showSelected: ' + value);
    },
    showSort(value) {
      alert('showSort: ' + value);
    },
    elementOpened() {
      alert('elementOpened has been executed');
    },
  },
}
</script>

<style scoped>
#kitchenSinkMainDiv {
  background-color: var(--fsm-dark-blue-2);
  padding-bottom: 1em;
}

.kitchenSinkComponentDiv {
  margin: 1em 1em 0 1em;
  padding: 0.5em;
  border: blue 1px solid;
}

.kitchenSinkFlexRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.kitchenSinkSpacer {
  width: 10px;
  height: 10px;
}

.kitchenSinkScrollDiv {
  width: 100%;
  height: 150px;
}
</style>