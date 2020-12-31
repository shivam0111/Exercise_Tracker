import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercise extends Component {
    constructor(props) { //
        super(props);

        // now we should mention that ""this"" used down her eis refering to the state(username,desciption,duration, changeDate and submit)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = { // state is just the variable used in react
            username: '', // 1.setState username(value)
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
        // we are not gonna do something like let name= "beau",we are gonna put everthing into the state
    }

    // although the data of the users will come from database itself but for now we will add the first user hardcoded
    componentDidMount() {
       axios.get('http://localhost:5000/users/')
       .then(response=>{
           if(response.data.length>0){
               this.setState({
                   users:response.data.map(user=>user.username),
                   username:response.data[0].username
               })
           }
       })
    }
    /*********************************************************** */
    //we are going to create a web form and we enter the username it is going to call the function e
    onChangeUsername(e) {
        this.setState({
            username: e.target.value // 1. here the target the text-box &&&& this is value of the text-box
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value // 1. here the target the text-box &&&& this is value of the text-box
        })
    }


    onChangeDuration(e) {
        this.setState({
            duration: e.target.value // 1. here the target the text-box &&&& this is value of the text-box
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date // 1. here the target the text-box &&&& this is value of the text-box
        })
    }

    onSubmit(e) {
        e.preventDefault();//this will prevent the default html forms submit behaviour from taking place
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add',exercise  )
        .then(res=>console.log(res.data))

        window.location = "/";// after you submit it, it will redirect you to the home page
    }


    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label >Username:</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes):</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date:</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />

                        </div>

                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />

                    </div>


                 </form>
            </div>
        )
    }
}