import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {profile: []};
    }
    componentDidMount(){
      axios.get('http://localhost:8080/profile')
        .then(response => {
          this.setState({ profile: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.profile.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Liste visiteur</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Mot de passe</th>
                {/*<th colSpan="2">Action</th>*/}
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }