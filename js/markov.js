// The following class takes a predefined chain
// and generates outputs for it.

export default class Markov {
  constructor(chain, order){
    this.chain = chain
    this.order = order || chain.$ORDER || 1
    this.history = [Markov.choose('.?')]
  }

  static choose(xs){
    return xs[Math.random() * xs.length | 0]
  }

  choose(match){
    let next = Markov.choose(this.chain[match])
    this.history.push(next)
    return next
  }

  next(){
    if(this.history.length){
      if(this.history.length > this.order){
        this.history.shift()
      }

      // A more chaotic choosing metric
      // Instead of choosing the highest-order match,
      // I opted to have all matches be considered
      // for choice. Higher orders are more likely
      // to be chosen, but lower orders also have
      // a chance to be chosen.
      let choices = []
      for(let i of new Array(this.order).keys()){
        let match = this.history.slice(i).join` `
        if(this.chain[match]){
          choices.push(...new Array(this.order - i).fill(match))
        }
      }
      if(choices.length) return this.choose(Markov.choose(choices))
    }
  }
}
