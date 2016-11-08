import React from 'react';

// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super()
    this.renderInventory = this.renderInventory.bind(this)
    this.handleChange    = this.handleChange.bind(this)
    this.removeItem      = this.removeItem.bind(this)
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key]
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }

    this.props.updateFish(key, updatedFish)
  }

  removeItem(key) {
    this.props.removeFish(key)
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]

    return (
      <div className='fish-edit' key={ key }>
        <input type='text' name='name' value={ fish.name } placeholder='Fish Name' onChange={ (e) => this.handleChange(e, key) } />
        <input type='text' name='price' value={ fish.price }  placeholder='Fish Price' onChange={ (e) => this.handleChange(e, key) } />

        <select type='text' value={ fish.status }  name='status' onChange={ (e) => this.handleChange(e, key) } >
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>

        <textarea type='text' name='desc' value={ fish.desc }  placeholder='Fish Desc' onChange={ (e) => this.handleChange(e, key) } ></textarea>
        <input type='text' name='image' value={ fish.image }  placeholder='Fish Image' onChange={ (e) => this.handleChange(e, key) } />
        <button onClick={ () => this.removeItem(key) }>- Remove Item -</button>
      </div>
    )
  }

  render() {
    const fishInventory =
      Object
      .keys(this.props.fishes)
      .map(this.renderInventory)

    return (
      <div>
        <h2>Inventory</h2>
        { fishInventory }
        <AddFishForm addFish={ this.props.addFish } />
        <button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
