<template>
  <a
    :class="buttonSocialDesignObject"
    :page-url="page_url"
    :page-title="page_title"
    :page-description="page_description"
    :button-design="button_design"
    :title-social="title_social"
    :has-icon="has_icon"
    :has-square-edges="has_square_edges"
    :has-counter="has_counter"
    class="button-social"
    @click.prevent="showShareWindow">
    <fa
      v-if="this.$props.has_icon"
      :icon="['fab', 'linkedin']"
      size="2x"/>
    <span 
      v-if="this.$props.title_social"
      class="title-social">{{ title_social }}</span>
    <span
      v-if="this.$props.has_counter"
      class="counter-linkedin"
    >{{ counter_linkedin }}</span>
  </a>
</template>

<script>
  // Variables
  //const description = document.querySelector('meta[name="description"]')
  
  export default {
    name: 'VueGoodshareLinkedIn',
    props: {
      page_url: {
        type: String,
        default: ''
      },
      page_title: {
        type: String,
        default: ''
      },
      page_description: {
        type: String,
        default: ''
      },
      button_design: {
        type: String,
        default: 'flat'
      },
      title_social: {
        type: String,
        default: ''
      },
      has_icon: {
        type: Boolean,
        default: true
      },
      has_square_edges: {
        type: Boolean,
        default: false
      },
      has_counter: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        buttonSocialDesignObject: {
          'button-social__square_edges': this.$props.has_square_edges,
          'linkedin__design__flat': this.$props.button_design === 'flat',
          'linkedin__design__gradient': this.$props.button_design === 'gradient',
          'linkedin__design__outline': this.$props.button_design === 'outline'
        },
        counter_linkedin: 0
      }
    },
    mounted () {
      // Show share counter when page loaded
      if (this.$props.has_counter) this.getShareCounter()
    },
    methods: {
      /**
       * Get a random integer between `min` and `max`.
       *
       * @param {number} min - min number
       * @param {number} max - max number
       * @return {number} a random integer
       */
      getRandomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
      },
      
      /**
       * Slice thousand integer and add `k` letter.
       *
       * @param {number} number - thousand integer
       * @return {string} a integer with letter
       */
      sliceThousandInt: (number) => {
        return (number / 1000).toFixed(1) + 'k'
      },
      
      /**
       * Show share window.
       *
       * @return {object} a pop-up window
       */
      showShareWindow: function () {
        // Variables
        const width = 640
        const height = 640
        let left = (screen.width / 2) - (width / 2)
        let top = (screen.height / 2) - (height / 2)
        const window_config = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ','
        const share_url = 'https://www.linkedin.com/shareArticle?'
          + 'url=' + encodeURIComponent(this.$props.page_url)
          + '&text=' + encodeURIComponent(this.$props.page_title)
          + '&summary=' + encodeURIComponent(this.$props.page_description)
          + '&mini=true'
        
        return window.open(share_url, 'Share this', window_config + 'toolbar=no,menubar=no,scrollbars=no')
      },
      
      /**
       * Get share counter.
       *
       * @return {object} a share counter
       */
      getShareCounter: function () {
        // Variables
        const script = document.createElement('script')
        const callback = 'vue_goodshare_' + this.getRandomInt(1, 2345)
        
        // Create `script` tag with share count URL
        script.src = 'https://www.linkedin.com/countserv/count/share?'
          + 'url=' + encodeURIComponent(this.$props.page_url)
          + '&callback=' + callback
        
        // Add `script` tag with share count URL
        // to end of `body` tag
        document.body.appendChild(script)
        
        // Set share count to `counter_linkedin` v-model
        window[callback] = (count) => {
          if (count) {
            this.counter_linkedin = (count.count >= 1000)
              ? this.sliceThousandInt(count.count)
              : count.count
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .icon-linkedin:before {
    content: '\e808';
  }
  
  // Colors
  $linkedin_main_color: rgb(0, 119, 181);
  $linkedin_main_color_opacity: rgba(0, 119, 181, .5);
  $gradient_color: rgb(30, 149, 211);
  $background_white_color: rgb(254, 254, 254);
  $text_white_color: rgb(254, 254, 254);
  $text_white_color_opacity: rgba(254, 254, 254, .5);
  
  // Reset
  .button-social * {
    box-sizing: border-box;
  }
  
  // Button Social link style
  .button-social {
    display: inline-flex;
    cursor: pointer;
    padding: 7px 10px;
    margin: 3px 1.5px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
  }
  
  // Button Social link style on hover
  .button-social:hover {
    opacity: .9;
  }
  
  // Button Social round edges
  .button-social__square_edges {
    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
  }
  
  // Button linkedin style `flat`
  .linkedin__design__flat {
    background-color: $linkedin_main_color;
    color: $text_white_color;
  }
  
  // Button linkedin style `gradient`
  .linkedin__design__gradient {
    background-image: linear-gradient(to bottom, $linkedin_main_color, $gradient_color);
    background-image: -moz-linear-gradient(to bottom, $linkedin_main_color, $gradient_color);
    background-image: -o-linear-gradient(to bottom, $linkedin_main_color, $gradient_color);
    background-image: -webkit-linear-gradient(to bottom, $linkedin_main_color, $gradient_color);
    background-image: -ms-linear-gradient(to bottom, $linkedin_main_color, $gradient_color);
    color: $text_white_color;
  }
  
  // Button linkedin style `outline`
  .linkedin__design__outline {
    background-color: $background_white_color;
    border: 1px solid $linkedin_main_color;
    color: $linkedin_main_color;
  }
  
  // Title
  .title-social {
    margin-left: 3px;
    margin-top: auto;
    margin-bottom: auto;
  }
  
  // Counter
  .counter-linkedin {
    margin-left: 6px;
    padding-left: 6px;
    margin-top: auto;
    margin-bottom: auto;
  }
  
  .linkedin__design__flat .counter-linkedin,
  .linkedin__design__gradient .counter-linkedin {
    border-left: 1px solid $text_white_color_opacity;
  }
  
  .linkedin__design__outline .counter-linkedin {
    border-left: 1px solid $linkedin_main_color_opacity;
  }
</style>
