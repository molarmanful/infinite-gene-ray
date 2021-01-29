import chain from './chain_data.js'
import Markov from './markov.js'

const markov = new Markov(chain)

const App = {
  data(){
    return {
      text: ''
    }
  },
  mounted(){
    let iterate = setInterval(_=>{
      let next = markov.next()
      if(!next) return clearInterval(iterate)
      let last = this.text[this.text.length - 1]
      if(!next.match(/['.?!,@:)]/) && (last && !last.match(/[`(]/))){
        this.text += ' '
      }
      this.text += next
    })
  },

  methods: {
    
  }
}

Vue.createApp(App).mount('#app')
