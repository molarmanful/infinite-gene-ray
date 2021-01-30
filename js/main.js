import chain from './chain_data.js'
import Markov from './markov.js'

const markov = new Markov(chain)

const App = {
  data(){
    return {
      mounted: false,
      text: ''
    }
  },
  mounted(){
    this.mounted = true
    let iterate = setInterval(_=>{
      let next = markov.next()
      if(!next) return clearInterval(iterate)
      let last = markov.history[markov.history.length - 2]
      if(!next.match(/^([.?!,@:;")]|'s|n't|'re)$/) && (last && !last.match(/[`(@$]/))){
        this.text += ' '
      }
      this.text += next
    })
  },

  methods: {
    
  }
}

Vue.createApp(App).mount('#app')
