import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import PersonalInfo from './containers/infos/personalInfo/personalInfo';
import Preview from './components/preview/preview';
import Skills from './containers/infos/skills/skills';
import Educations from './containers/infos/educations/educations';
import Projects from './containers/infos/projects/projects';
import Extras from './containers/infos/extras/extras';
import Auth from './containers/Auth/auth';
import axios from 'axios';
import Print from './components/print/print';
import Error from './UI/error/error';
var url ="https://resumemaker2.herokuapp.com";
class App extends Component {

  state={
    controls: {
      email: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Email'
          },
          value: '',
          validation: {
              isRequired: true
          },
          valid: false,
          touched: false
      },
      password: {
          elementType: 'input',
          elementConfig: {
              type: 'password',
              placeholder: 'password'
          },
          value: '',
          validation: {
              isRequired: true,
              minLength: 6
          },
          valid: false,
          touched: false
      }
  },
  controlSignUp: {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Email'
        },
        value: '',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'password'
        },
        value: '',
        validation: {
            isRequired: true,
            minLength: 6
        },
        valid: false,
        touched: false
    }
},
    personalInfo: {
      name:{
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
    },
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your email'
        },
        value: '',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
    },
      phone: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'phone'
        },
        value: '',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
    }
  },
  skills: [{
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: 'Your skills'
    },
    value: '',
    id: '0',
    validation: {
        isRequired: true
    },
    valid: false,
    touched: false
  }],
    educations: [{
      education: {
        elementType: 'text',
        elementConfig: {
            type: 'text',
            placeholder: 'education',
        },
        value: '',
        std: '',
        details: '',
        id: '0',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
      }
    }],
    projects: [{
      project: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'projects',
        },
        value: '',
        desc: '',
        id: '0',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
      },
    }],
    extras: [{
      extra: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'extra details',
        },
        value: '',
        id: '0',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
      },
    }],
    flash: "",
    token: null
  }

  onChangeHandler=(event, id)=>{
    const info = {...this.state.personalInfo};
    const data = {...info[id]};
    data.value = event.target.value;
    info[id] = data;
    this.setState({ personalInfo: info });
  }

  onChangeSkillHandler(detailsInfo ,event, id){
    const info = [...this.state[detailsInfo]];
    // console.log(info);

    let changedInfo = info.map((s)=>{
      if(s.id===id){
        s.value = event.target.value;
      }
      return s;
    })

    this.setState({skills: changedInfo});
  }

  addHandler=(numSkills)=>{
    const info = [...this.state.skills];
    console.log(numSkills);
    info.push(
      {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your skills'
        },
        value: '',
        id: numSkills+'',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
      }
    )
    this.setState({skills: info});
  }

  deleteHandler=(index, property)=>{
    const info = [...this.state[property]];
    info.splice(index, 1);

    this.setState({ [property]: info });
  }

  onChangeEduHandler=(e, id, property)=>{
    const info = [...this.state.educations];

    let changedInfo = info.map((edu)=>{
      if(edu.education.id===id){
        edu.education[property] = e.target.value;
      }
      return edu;
    })


    this.setState({educations: changedInfo});
  }

  onChangeProjectHandler=(e, id, property)=>{
    const info = [...this.state.projects];

    let changedInfo = info.map((p)=>{
      
      if(p.project.id===id){
        p.project[property] = e.target.value;
      }
      return p;
    })

    this.setState({projects: changedInfo});
  }

  addEduHandler=(num)=>{
    const info = [...this.state.educations];
    info.push({
      education: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'education'
        },
        value: '',
        id: num+'',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
      }
    });
    this.setState({educations: info});
  }

  addProjectHandler=(num)=>{
    const info = [...this.state.projects];
    info.push({
      project: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Projects',
          },
          value: '',
          desc: '',
          id: num+'',
          validation: {
            isRequired: true
          },
          valid: false,
          touched: false
        },
      }
    )
      
      console.log(info);
    this.setState({projects: info});
  }

  addExtrasHandler=(num)=>{
    const info = [...this.state.extras];
    info.push({
      extra: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Add Extra Info'
        },
        value: '',
        id: (num-1)+'',
        validation: {
            isRequired: true
        },
        valid: false,
        touched: false
      }
    });
    this.setState({extras: info});

  }

  onChangeExtrasHandler=(e, id)=>{
    const info = [...this.state.extras];
    
    let changedInfo = info.map((p)=>{
      
      if(p.extra.id===id){
        p.extra.value = e.target.value;
      }
      return p;
    })

    this.setState({extras: changedInfo}); }


    checkValidity=(value ,rules)=>{
      let isValid = true;
      if(rules&&rules.isRequired){
          isValid = value.trim()!==''&&isValid;
      }

      if(rules&&rules.minLength){
          isValid = value.length>=rules.minLength&&isValid;
      }

      if(rules&&rules.maxLength){
          isValid = value.length<=rules.maxLength&&isValid;
      }

      return isValid;
  }


    onChangeAuthHandler=(event, controlName)=>{
      const updatedControls={
        ...this.state.controls,
      [controlName]: {
          ...this.state.controls[controlName],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true
      }
    }
      this.setState({controls: updatedControls});
    }

    onChangeSignupHandler=(event, controlName)=>{
      const updatedControls={
        ...this.state.controlSignUp,
      [controlName]: {
          ...this.state.controlSignUp[controlName],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, this.state.controlSignUp[controlName].validation),
          touched: true
      }
    }
      this.setState({controlSignUp: updatedControls});
    }

    authHandler=(event)=>{
      event.preventDefault();
      let email = this.state.controls.email.value;
      let password = this.state.controls.password.value;

      axios.post(url+"/api/signin", {
        username: email,
        password: password
      })
        .then(res=>{
          if(res.data.token){
            this.setState({ token: res.data.token });
            this.props.history.push({
              pathname: '/personalInfo',
              search: '?token='+res.data.token
            });
          }
        })
        .catch(err=>{
          this.props.history.push('/err');
        });
    }

    authSignupHandler=(event)=>{
      event.preventDefault();
      let email = this.state.controlSignUp.email.value;
      let password = this.state.controlSignUp.password.value;


      axios.post(url+"/api/signup", {
        username: email,
        password: password
      })
        .then(res=>{
          this.setState({flash: "User Created Please Sign In"});
          this.props.history.push({
            pathname: '/',
          })
        })
        .catch(err=>{
          this.props.history.push('/err');
        });
    }

  render() {
    const personalData = [];
    for(let key in this.state.personalInfo){
      
      if(key==='name'){
        personalData.push({
          id: key,
          config: this.state.personalInfo[key],
          value: this.state.personalInfo[key].value
        })
      }else if(key==='email'){
        personalData.push({
          id: key,
          config: this.state.personalInfo[key],
          value: this.state.personalInfo[key].value
        })
      }else if(key==='phone'){
        personalData.push({
          id: key,
          config: this.state.personalInfo[key],
          value: this.state.personalInfo[key].value
        })
      }
    }


    return (
      <div className="App">

          <Route path="/:id" render={()=>{
            return <Preview
            name={this.state.personalInfo.name.value}
            email={this.state.personalInfo.email.value}
            phone={this.state.personalInfo.phone.value}
            skills={this.state.skills}
            delete={(index, property)=>this.deleteHandler(index, property)}
            educations={this.state.educations}
            projects={this.state.projects}
            extras={this.state.extras}
            />
          }} 
          />

        <Switch>

        <Route path="/" exact render={()=>{
            return <Auth
            controls={this.state.controls}
            controlSignUp = {this.state.controlSignUp}
            changed = {(event, controlName)=>this.onChangeAuthHandler(event, controlName)}
            changedSign =  {(event, controlName)=>this.onChangeSignupHandler(event, controlName)}
            auth = {(event)=>this.authHandler(event)}
            authSign = {(event)=>this.authSignupHandler(event)}
            flash={this.state.flash}
            />
          }} />

        <Route path="/err" exact render={()=>{
            return <Error />
          }} />

          <Route path="/personalInfo" exact render={()=>{
            return <PersonalInfo
            personalData={personalData}
            changed = {(event, id)=>this.onChangeHandler(event, id)}
            token={this.state.token}/>
          }} />
          <Route path="/skills" exact render={()=>{
            return <Skills
            skills={this.state.skills}
            changed = {(detailsInfo ,event, id)=>this.onChangeSkillHandler(detailsInfo ,event, id)}
            add={(num)=>this.addHandler(num)}/>
          }} />

          <Route path="/education" exact render={()=>{
            return <Educations
            educations={this.state.educations}
            addEdu = {(num)=>this.addEduHandler(num)}
            changed = {(e, id, property)=>this.onChangeEduHandler(e, id, property)}
            />
          }} />

          <Route path="/projects" exact render={()=>{
            return <Projects
            projects={this.state.projects}
            add={(num)=>this.addProjectHandler(num)}
            changed = {(e, id, property)=>this.onChangeProjectHandler(e, id, property)}
            />
          }} />
          
          <Route path="/extras" exact render={()=>{
            return <Extras
            extras={this.state.extras}
            add={(num)=>this.addExtrasHandler(num)}
            changed = {(e, id)=>this.onChangeExtrasHandler(e, id)}
            />
          }} />

          <Route path="/print" exact render={()=>{
            return <Print
            name={this.state.personalInfo.name.value}
            email={this.state.personalInfo.email.value}
            phone={this.state.personalInfo.phone.value}
            skills={this.state.skills}
            delete={(index, property)=>this.deleteHandler(index, property)}
            educations={this.state.educations}
            projects={this.state.projects}
            extras={this.state.extras}/>
          }} />

        </Switch>

      </div>
    );
  }
}

export default withRouter(App);