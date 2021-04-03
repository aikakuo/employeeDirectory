import React from "react";
import API from "../utils/API"
import Search from "../components/Search"
import DateFormat from 'dateformat';

class Table extends React.Component {

  state = {
    sortOrder: "",
    results: [],
    search: ""
  }

  componentDidMount() {
    API.GetEmployees()
      .then(res => {
        this.setState({ results: res.data.results })
        console.log(this.state.results)
      }).catch(err => console.log(err))
  }

  handleInputChange = event => {

    if (event.target.name === "search") {
      const showEmployee = event.target.value.toLowerCase()
      this.setState({
        search: showEmployee
      })
    }
  }
  
  render() {
    return (
      <div>
        <Search handleInputChange={this.handleInputChange}
          search={this.state.search} />

        <div className="table-responsive">
        <table className="table table-striped table-resposive text-center table-hover">
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name </th>
                <th>Last Name </th>
                <th>Phone</th>
                <th>Email</th>
                <th>DOB </th>
              </tr>
            </thead>

            { //First Name sort
              this.state.results && this.state.results.map(item =>
                item.name.first.toLowerCase().includes(this.state.search) ?
                  <tbody key={item.login.uuid}>
                    <tr>
                      <td ><img src={item.picture.thumbnail} className="rounded-circle" alt="thumbnail" /></td>
                      <td >{item.name.first}</td>
                      <td >{item.name.last}</td>
                      <td >{item.phone}</td>
                      <td >{item.email}</td>
                      <td>{DateFormat(item.dob.date, "mediumDate")}</td>  
                    </tr>
                  </tbody>

                  :
                  //Last Name sort
                  item.name.last.toLowerCase().includes(this.state.search) ?
                    <tbody key={item.login.uuid}>
                      <tr>
                      <td ><img src={item.picture.thumbnail} className="rounded-circle" alt="thumbnail" /></td>
                        <td >{item.name.first}</td>
                        <td >{item.name.last}</td>
                        <td >{item.phone} </td>
                        <td >{item.email}</td>
                        <td>{DateFormat(item.dob.date, "mediumDate")}</td>  
                      </tr>
                    </tbody>
                    :
                    null
              )}
          </table>
        </div>
      </div>
    )
  }
}

export default Table;
