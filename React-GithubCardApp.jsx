// gaearon, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Card extends React.Component{
    render(){
      const profile = this.props;
      return (
        <div style={{ margin:'10px'}}>
          <img src={profile.avatar_url} style={{width: '75px'}}/>
          <div style={{display:'inline-block', marginLeft:10}}>
            <div>{profile.name}</div>
            <div>{profile.company}</div>
          </div>
        </div>  
      );
    }
}

class Form extends React.Component{
 state = { userName : ''};

 handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName : ''});
  }  
  render(){
      return(
        <form onSubmit={this.handleSubmit}>
          <input 
            placeholder='Github UserName'
            value={this.state.userName}
            onChange={(event) => this.setState({userName : event.target.value})}/>
          <button>Add card</button>
        </form>
      );
    }
}

class App extends React.Component{
  state = {
      profiles : [],
    };
 addUserCard = (profileData) => {
    this.setState((prevState) => ({profiles : [...prevState.profiles, profileData]}))
  } 
  render(){
    return (
    <div>
      <div style={{textAlign:'center', fontSize:'150%'}}>{this.props.title}</div>
      <Form onSubmit={this.addUserCard}/>
      <CardList profiles = {this.state.profiles}/>
    </div>);
  }
}

ReactDOM.render(
  <App title='The Github Card App' />,
  mountNode
);