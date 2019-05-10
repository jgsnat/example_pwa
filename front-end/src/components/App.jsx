import React from 'react'
import Header from './Header'
import NovoUsuario from './NovoUsuario'
import Toast from './Toast'
import Usuario from '../models/Usuario'

class App extends React.Component {

    constructor() {

        super();

        Usuario.obter(usuario => {
            this.state = {
                usuario
            };
        }, () => {
            this.state = {
                usuario: undefined
            }
        });

    }

    msgNovoUsuario(usuario) {
        
        let genero = usuario.genero == 'm' ? 'o' : 'a';

        this.refs.toast.sucesso(
            `Seja bem-vind${genero} ${usuario.nome}!`
        );

    }

    renderizarNovoUsuario() {

        let { usuario } = this.state;

        if (usuario) {
            return (
                <div style={
                    {
                        marginTop: '140px',
                        textAlign: 'center'
                    }
                }>
                    <b>Usuário obtido do <i>localStorage</i></b><br/>

                    { usuario.nome } - { usuario.genero }
                </div>
            )
        } else {
            return (
                <NovoUsuario
                    erro={ msg => this.refs.toast.erro(msg) }
                    onSubmit={ usuario => {
                        usuario.salvar(() => {
                            this.setState({
                                usuario
                            }, () => {
                                this.msgNovoUsuario(usuario)
                            })
                        })
                    }}
                />
            )
        }
    }

    render() {

        return (
            <div>
                <Header />
                { this.renderizarNovoUsuario() }
                <Toast ref="toast" />
            </div>
        )

    }

}

export default App