import React,{Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import AppIcon  from "../images/mytutor.png";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Navigate, useNavigate } from "react-router-dom";

const styles = {
    form:{
        textAlign:'center'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '10px auto 20px auto'
    },
    textField:{
        margin:'10px auto 20px auto'
    },
    button:{
        margin:20,
        position: 'relative'
    },
    customError:{
        color:'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress:{
        position: 'absolute'
    }

};


class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: {}
        };
    };
    handleSubmit = (event) => {
        event.preventDefault();
        //console.log("hi");
        this.setState({
            loading:true
        });
       
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        // const userData = {
        //     email:'divyangi@gmail.com',
        //     password:'qwerty'
        // }
        console.log(userData);
        // axios.post('http://localhost:8000/api/signin',userData)
        // .then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         loading: false
        //     });
        //     useNavigate("/");
        // })
        // .catch(err =>{
        //     this.setState({
        //         errors:err.response.data,
        //         loading:false
        //     })
        // })
         //-----------------------
         if(this.state.password==''){
            console.log("empty...");
            this.setState({
                errors:{password:'required',email:''}
            })
        }
        
        //-----------------------
    };
    hangleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    render(){
        const { classes } = this.props;
        const { errors } = this.state.error;
        //const { loading } = this.state.loading;
        //const { errors, loading} = this.state;

        return(
           
                <Grid container className={classes.form}>
                    <Grid item sm/>
                    <Grid item sm>
                        <img src={AppIcon} alt="my tutor" className={classes.image}/>
                        <Typography variant="h2" className={classes.pageTitle}>
                            Login
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit.bind(this)}>

                            <TextField 
                            id="email" 
                            name="email" 
                            type="email"
                            label="Email" 
                            className={classes.TextField} 
                            helperText={this.state.error.email}
                            error={this.state.error.email ? true : false}
                            value={this.state.email} 
                            onChange={this.hangleChange}
                            fullWidth
                             />

                            <TextField 
                            id="password" 
                            name="password" 
                            label="password" 
                            className={classes.TextField} 
                            helperText={this.state.error.password}
                            error={this.state.error.password ? true : false}
                            value={this.state.password} 
                            onChange={this.hangleChange} 
                            fullWidth
                            />

                            <Button 
                            type='submit' 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}>
                                Login
                            </Button>

                        </form>
                    </Grid>
                    <Grid item sm/>
                </Grid>
           
        )
    };
} 

Login.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
