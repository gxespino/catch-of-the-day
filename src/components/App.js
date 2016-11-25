import React from 'react';

// Components
import Header    from './Header';
import Order     from './Order';
import Inventory from './Inventory';
import Fish      from './Fish';

// Seeds
import sampleFishes from '../sample-fishes';

// Firebase
import base from '../base';

class App extends React.Component {
  constructor() {
    super()

    // functions
    this.loadSamples      = this.loadSamples.bind(this)
    this.addToOrder       = this.addToOrder.bind(this)
    this.removeFromOrder  = this.removeFromOrder.bind(this)
    this.addFish          = this.addFish.bind(this)
    this.updateFish       = this.updateFish.bind(this)
    this.removeFish       = this.removeFish.bind(this)

    // state
    this.state = {
      fishes: {},
      order: {},
    }
  }

  componentWillMount() {
    // This runs right before the app is rendered
    const baseStore = `${this.props.params.storeId}/fishes`
    this.ref = base.syncState(baseStore, { context: this, state: 'fishes' })

    // Check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Something Changed')
    console.log({ nextProps, nextState })
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish(fish) {
    const fishes = { ...this.state.fishes }
    const timestamp = Date.now()

    fishes[`fish-${ timestamp }`] = fish

    this.setState({
      fishes: fishes
    })
  }

  updateFish(key, updatedFish) {
    const fishes = { ...this.state.fishes }

    fishes[key] = updatedFish

    this.setState({
      fishes: fishes
    })
  }

  removeFish(key) {
    const fishes = { ...this.state.fishes }
    const order  = { ...this.state.order }

    fishes[key] = null
    order[key] = null

    this.setState({ fishes })
    this.setState({ order })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    const order = { ...this.state.order }

    order[key] = order[key] + 1 || 1

    this.setState({
      order: order
    })
  }

  removeFromOrder(key) {
    const order = { ...this.state.order }

    delete order[key]

    this.setState({ order })
  }

  render() {
    const fishList =
      Object
      .keys(this.state.fishes)
      .map(
        key => <Fish
          key={ key }
          index={ key }
          details={ this.state.fishes[key] }
          addToOrder={ this.addToOrder }
        />
      )

    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market'/>
          <ul className='list-of-fishes'>
            { fishList }
          </ul>
        </div>
        <Order
          fishes={ this.state.fishes }
          order={ this.state.order }
          params={ this.props.params }
          removeFromOrder={ this.removeFromOrder }
        />
        <Inventory
          fishes={ this.state.fishes }
          addFish={ this.addFish }
          updateFish={ this.updateFish }
          removeFish={ this.removeFish }
          loadSamples={ this.loadSamples }
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
