<template>
  <article 
    v-show="loaded"
    class="media">
    <a
      class="twitter-timeline"
      data-tweet-limit="1"
      data-height="200"
      data-chrome="noheader nofooter noborders"
      href="https://twitter.com/SamuelMcoe?ref_src=twsrc%5Etfw"/>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"/>
  </article>
</template>

<script>
export default {
  data: () => ({
    interval: null,
    loaded: false
  }),
  mounted() {
    this.interval = setInterval(this.hideTwitterMedia, 1000);
  },
  methods: {
    hideTwitterMedia() {
      var ifrm = null;
      // Look for widget
      try {
        ifrm = document.querySelector('[id^="twitter-widget-"]')
      } catch(e) {
        console.info(e);
      }

      // If widget did generate to iframe
      if (ifrm !== null){
        clearInterval(this.interval);
        var media = ifrm.contentWindow.document.getElementsByClassName('timeline-Tweet-media')[0];
        // then if widget has content with class="timeline-Widget"
        if (media !== undefined){
          // then change background color css for this class
          ifrm.style.height="200px";
          media.style.display="none";
        }
      }
      this.loaded = true;
    }
  }
}
</script>

<style>

</style>
