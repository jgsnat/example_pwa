import React from 'react'
import Label from '../Label'
import Input from '../Input'
import GenderSelector from '../GenderSelector'
import Usuario from '../../models/Usuario'

class NovoUsuario extends React.Component {

    constructor(props) {
        
        super(props)

        this.state = {
            usuario: new Usuario(),
            validacao: {
                nomeInvalido: false,
                generoInvalido: false
            }
        }

        this.atualizarNome = this.atualizarNome.bind(this)
        this.atualizarGenero = this.atualizarGenero.bind(this)

    }

    atualizarNome(e) {

        let usuario = this.state.usuario
        usuario.nome = e.target.value
        this.setState({
            usuario
        })

    }

    atualizarGenero(e, genero) {

        e.preventDefault()
        let usuario = this.state.usuario
        usuario.genero = genero
        this.setState({
            usuario
        })

    }

    render() {

        const { nomeInvalido, generoInvalido } = this.state.validacao
        const { nome, genero } = this.state.usuario

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

                    <Label 
                        texto="Seu gênero:"
                        valorInvalido={ generoInvalido }
                    />

                    <GenderSelector 
                        valorInvalido={ generoInvalido }
                        genero={ genero }
                        atualizarGenero={ this.atualizarGenero }
                    />
                    
                </form>

            </div>
        )

    }

}

export default NovoUsuario