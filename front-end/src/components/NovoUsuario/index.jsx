import React from 'react'
import Label from '../Label'
import Input from '../Input'

class NovoUsuario extends React.Component {

    constructor(props) {
        
        super(props)

        this.state = {
            usuario: {
                nome: ''
            },
            validacao: {
                nomeInvalido: false
            }
        }

        this.atualizarNome = this.atualizarNome.bind(this)

    }

    atualizarNome(e) {

        let usuario = this.state.usuario
        usuario.nome = e.target.value
        this.setState({
            usuario
        })

    }

    render() {

        const { nomeInvalido } = this.state.validacao
        const { nome } = this.state.usuario

        return (
            <div className="center">
                <form className="pure-form pure-form-stacked">
                    <Label 
                        htmlFor="nome" 
                        texto="Quem é você?"
                        valorInvalido={ nomeInvalido }
                    />
                    <Input 
                        id="nome"
                        placeholder="Digite seu nome"
                        maxLength="40"
                        readOnly={ false }
                        valorInvalido={ nomeInvalido }
                        defaultValue={ nome }
                        onChange={ this.atualizarNome }
                    />
                </form>
            </div>
        )

    }

}

export default NovoUsuario