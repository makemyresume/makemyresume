import React, { Component } from 'react';
import Input from '../../../UI/input/input';
import { Link, withRouter } from 'react-router-dom';
import './personalInfo.css';

class personalInfo extends Component {
    

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        let token=params.get('token');
        // console.log(this.props);
        if(token==null||(this.props.token!==token)){
            this.props.history.push('/');
        }
    }

    render(){
        const params = new URLSearchParams(this.props.location.search);
        let token=params.get('token');
        let data = [...this.props.personalData];
        let inputs="Login first";
        if(token){
            inputs = data.map((d)=>{
                return <Input
                key={d.id}
                elementType={d.config.elementType}
                elementConfig={d.config.elementConfig}
                value={d.config.value}
                invalid={!d.config.valid}
                touched={d.config.touched}
                shouldValidate={d.config.validation}
                changed={(event)=>this.props.changed(event, d.id)}/>
            });
        }
        return (
            <div className="box">
                {inputs}
                <Link to="/skills" style={
                    {
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '1em 1.5em',
                        textDecoration: 'none',
                        textTransform: 'uppercase'
                    }
                }>Next</Link>
            </div>
        );
    }
}

export default withRouter(personalInfo);