import './index.css'
import {Component} from 'react'

class App extends Component {
  state = {city: '', temperature: ''}

  changeHandler = e => {
    this.setState({city: e.target.value})
  }

  onSubmitHandler = e => {
    const {city} = this.state
    e.preventDefault()
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`,
    )
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp
        const celcius = kelvin - 273.15
        const result = Math.round(celcius)
        this.setState({temperature: result})
      })
      .catch(error => console.log(error))
  }
  final = () => {
    const {city, temperature} = this.state
    return (
      <h1>
        Temperature in {city} is {temperature}
      </h1>
    )
  }

  render() {
    const {city, temperature} = this.state
    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="title">Weather Application</h1>
          <form className="form" onSubmit={this.onSubmitHandler}>
            <div className="inputs">
              <input
                type="text"
                name="city"
                onChange={this.changeHandler}
                value={city}
              />
              <input type="submit" value="Get Temperature" className="button" />
            </div>
          </form>
          {this.final()}
        </div>
      </div>
    )
  }
}

export default App
