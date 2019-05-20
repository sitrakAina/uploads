import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nom: '',
      email: '',
      password:'',
      image: ''
    }
  }
  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })  
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();
    const obj = {
      nom: this.state.nom,
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:8080/profile/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      nom: '',
      email: '',
      password: ''
    })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Inscription</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Nom:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.nom}
                      onChange={this.onChangeNom}
                      />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <div className="form-group">
                    <label>mot de passe: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="enregistre" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}