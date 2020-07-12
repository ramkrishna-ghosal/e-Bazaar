import React, { Component } from 'react';

import axios from '../config/axios-secured';
import { decryptData } from "../util/encryption";

class Dashboard extends Component {
  state = {
    stats: {}
  }
  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">

              <div className="row">
                {/* <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card card-stats">
                    <div className="card-header card-header-info card-header-icon">
                      <div className="card-icon">
                        <i className="fa fa-twitter"></i>
                      </div>
                      <p className="card-category">Followers</p>
                      <h3 className="card-title">+245</h3>
                    </div>
                    <div className="card-footer">
                      <div className="stats">
                        <i className="material-icons">update</i> Just Updated
                  </div>
                    </div>
                  </div>
                </div>
              */}
                {this.state.Stats ? this.state.Stats.map(data => 
                   <div className="col-lg-3 col-md-6 col-sm-6" key={data.key}>
                   <div className="card card-stats">
                     <div className="card-header card-header-info card-header-icon">
                       <div className="card-icon">
                         <i className="fa fa-twitter"></i>
                       </div>
                       <p className="card-category">{data.key.replace('_',' ').toUpperCase()}</p>
                       <h3 className="card-title">{data.data}</h3>
                     </div>
                     <div className="card-footer">
                       <div className="stats">
                         <i className="material-icons">update</i> Just Updated
                   </div>
                     </div>
                   </div>
                 </div>
              ) : null}
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios.get('admin/dashboard/').then(response => {
      
      let res = decryptData(response.data);
      let stats = res.data;
      let datas = Object.keys(stats).map(key =>
        ({
          key: key, data: stats[key]
        }));
      this.setState({
        Stats: datas
      })
      // console.log(datas)
    }, err=>{
      console.log(err)
    })
  }
}

export default Dashboard;
