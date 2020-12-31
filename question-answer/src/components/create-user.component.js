import React,{Component} from "react";
import axios from "axios"

export default class EditUsers extends Component{
    constructor(props) { //
        super(props);

        // now we should mention that ""this"" used down her eis refering to the state(username,desciption,duration, changeDate and submit)
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = { // state is just the variable used in react
            username: '', // 1.setState username(value)
         
        }
        // we are not gonna do something like let name= "beau",we are gonna put everthing into the state
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value // 1. here the target the text-box &&&& this is value of the text-box
        })
    }
    onSubmit(e) {
        e.preventDefault();//this will prevent the default html forms submit behaviour from taking place
        const user = {
            username: this.state.username,
      
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add',user)
        .then(res=>console.log(res.data))
        

        this.setState({
            username:""
        })
    }

    render() {
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}