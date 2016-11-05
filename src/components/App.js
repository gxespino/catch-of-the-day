import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

// Misc
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super()

    // functions
    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)

    // state
    this.state = {
      fishes: {},
      order: {},
    }
  }

  addFish(fish) {
    const fishes = { ...this.state.fishes }
    const timestamp = Date.now()

    fishes[`fish-${ timestamp }`] = fish

    this.setState({
      fishes: fishes
    })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  render() {
    const fishList = Object
                       .keys(this.state.fishes)
                       .map(key => <Fish key={ key } details={ this.state.fishes[key] } />)

    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
          <ul className='list-of-fishes'>
            { fishList }
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={ this.addFish }
          loadSamples={ this.loadSamples }
        />
      </div>
    )
  }
}

export default App;
