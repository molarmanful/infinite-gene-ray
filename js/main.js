import chain from './chain_data.js'
import Markov from './markov.js'

const App = {
  data(){
    return {
      mounted: false,
      text: '',
      sect: 0,
      under: 0,
      size: 0,
      color: 0,
      style: 0
    }
  },
  mounted(){
    this.mounted = true
    const markov = new Markov(chain)

    setInterval(_=>{
      if(!this.sect){
        this.sect = this.randInt(5, 11)
        this.text += `<p class='size${this.randBias('size', 0, 3, .25)} color${this.randBias('color', 0, 9)} style${this.randBias('style', 0, 2, .25)}'>`
      }

      let next = markov.next()
      let last = markov.history[markov.history.length - 2]
      if(!next.match(/^([.?!,@:;"%)]|'s|n't|'re|'ve)$/) && (last && !last.match(/[`(@$]/))){
        this.text += ' '
      }

      if(this.under){
        this.under--
        this.text += next
        if(!this.under || next.match(/^[.?!,@:;"%)]$/)){
          this.under = 0
          this.text += '</u>'
        }
      }
      else if(!this.under && Math.random() > .9 && next.match(/^\w+$/)){
        this.under = this.randInt(1, 5)
        this.text += '<u>' + next
      }
      else this.text += next

      if(next.match(/^[.?]$/)){
        this.sect--
        if(!this.sect){
          this.text += '</p>'
        }
      }
    })
  },

  methods: {
    randInt(a, b){
      return Math.random() * (b - a + 1) | 0 + a
    },

    randBias(p, a, b, x = .5){
      return Math.random() > x ? this.randInt(a, b) : 0
    }
  }
}

Vue.createApp(App).mount('#app')
