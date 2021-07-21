import React from 'react';
import ReactDOM from 'react-dom';
import LineRenderer from './LineRenderer';

const App = () => {
  return (
    <div className="app">
      <LineRenderer segments={[[{x:0, y:0},{x:1000,y:1250}]]} points={[]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

/*class Slider extends React.Component {
  
  state = {
    selected: false,
    offset: 0,
    width: 0,
  }
  
  static defaultProps = {
    min: 1,
    max: 10,
    step: 1
  }

  count(min,max){
    if ( !(min < max) )
      throw new Error("min must be less than max");
  
    let _count = 0;
    for (;min <= max;min++){
      _count += 1;
    }
    return _count;
  }

  constructor(props){
    super(props);
    this.state.min = props.min;
    this.state.max = props.max;
    this.state.steps = this.count(props.min,props.max) / props.step;
    this.state.thresholds = this.state.steps - 1;
    this.sliderRef = createRef();
  }

  componentDidMount() {
    // grab the width of the underlying DOM node
    // this serves as our basis to interpolate between
    // min and max (via step)
    this.state.width = this.sliderRef.current.clientWidth;
    this.state.stepX = this.state.width / this.state.steps;
  }

  select() {
    this.setState({selected:true});
  }

  deselect() {
    this.setState({selected:false});
  }

  move(e) {
    if ( this.state.selected && e.nativeEvent.target.className != "slider-handle" ){
      // moving left
      this.setState({offset: Math.floor(e.nativeEvent.layerX / this.state.stepX) * (this.state.width / this.state.thresholds)})
    }
  }

  render() {
    return (
      <div className="slider"
           ref={this.sliderRef}
           onMouseMove={e => this.move(e)}
           onMouseUp={() => this.deselect()}>
        <div className="slider-track"></div>
        <div className="slider-handle" onMouseDown={() => this.select()} style={{left:this.state.offset}}></div>
      </div>
    );
  }
}*/