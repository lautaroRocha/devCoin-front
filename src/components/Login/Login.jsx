import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'


//asociar despues a la DB de usuarios esto es prueba

const baseUrl = 'https://localhost:3000/usuarios';
const cookies = new Cookies();



class Login extends Component {

    state = {
        form:{
            username: '',
            password: '',
        }
    }

    //creo metodo para que el usaurio escribe en los inputs
    //con este meodo guardo en el esdaro del input de acuerdo al nombre asi los estados tienen que coincidir
    handleChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
        console.log(this.state.form);
    }

    iniciarSesion= async () => {
        await axios.get(baseUrl, {params: {username:this.state.form.username, password: this.state.form.password}})
        .then(response =>{
            return response.data;
        })
        .then(response =>{
            if(response.length > 0){
                var respuesta =response[0];
                cookies.set('id', respuesta.id, {path: '/'});
                cookies.set('apellidos', respuesta.apellidos, {path: '/'});
                cookies.set('nombre', respuesta.nombre, {path: '/'});
                cookies.set('username', respuesta.username, {path: '/'});
                cookies.set('password', respuesta.password, {path: '/'});

            }else{
                alert('el usuario o la contraseña son incorrectos');
            }
        })
        .catch(error =>{
            console.log(error);    
        })

    }



    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>User: </label>
                        <br />
                        <input 
                            type="text" 
                            className="form-control" 
                            name= "username"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>Password: </label>
                        <br />
                        <input 
                            type="password" 
                            className="form-control" 
                            name= "password"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesion</button>
                </div>
                </div>
            </div>
        );

    }
}

export default Login;