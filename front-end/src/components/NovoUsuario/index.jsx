import React from 'react'
import Label from '../Label'
import Input from '../Input'
import GenderSelector from '../GenderSelector'
import Usuario from '../../models/Usuario'
import Avatar from '../../models/Avatar'
import Button from '../Button'
import ImageScroller from '../ImageScroller'

class NovoUsuario extends React.Component {

    constructor(props) {
        
        super(props)

        this.state = {
            usuario: new Usuario(),
            validacao: {
                nomeInvalido: false,
                generoInvalido: false
            },
            primeiraVisaoCompleta: false
        }

        this.atualizarNome = this.atualizarNome.bind(this)
        this.atualizarGenero = this.atualizarGenero.bind(this)
        this.validar = this.validar.bind(this)

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
        usuario.genero = genero;
        usuario.avatar = Avatar.obterTodos[0];
        this.setState({
            usuario
        })

    }

    validar(e) {

        e.preventDefault();
        let { usuario, validacao } = this.state;
        validacao.nomeInvalido = ! usuario.validarNome();
        validacao.generoInvalido = ! usuario.validarGenero();

        let mensagem = '';
        let primeiraVisaoCompleta = false;

        if (validacao.nomeInvalido && validacao.generoInvalido)
            mensagem = 'Os campos nome e gênero estão inválidos!'
        else if (validacao.nomeInvalido)
            mensagem = 'Seu nome está inválido!'
        else if (validacao.generoInvalido)
            mensagem = 'Selecione seu gênero!'
        else
            primeiraVisaoCompleta = true
        
        if (!primeiraVisaoCompleta)
            this.props.erro(mensagem);

        this.setState({
            validacao,
            primeiraVisaoCompleta
        })

    }

    renderizarNome() {

        const { nomeInvalido } = this.state.validacao
        const { primeiraVisaoCompleta } = this.state
        const { nome } = this.state.usuario

        return (
            <section>
                
                <Label 
                    htmlFor="nome" 
                    texto="Quem é você?"
                    valorInvalido={ nomeInvalido }
                />

                <Input 
                    id="nome"
                    placeholder="Digite seu nome"
                    maxLength="40"
                    readOnly={ primeiraVisaoCompleta }
                    valorInvalido={ nomeInvalido }
                    defaultValue={ nome }
                    onChange={ this.atualizarNome }
                />

            </section>
        )
    }

    renderizarGenero() {

        const { generoInvalido } = this.state.validacao
        const { primeiraVisaoCompleta } = this.state
        const { genero } = this.state.usuario


        if (primeiraVisaoCompleta)
            return null
        else {
            return (
                <section>
                    
                    <Label
                        texto="Seu gênero:"
                        valorInvalido={ generoInvalido }
                    />

                    <GenderSelector
                        valorInvalido={ generoInvalido }
                        genero={ genero }
                        atualizarGenero={ this.atualizarGenero }
                    />

                </section>
            )
        }

    }

    renderizarBotoes() {

        const { primeiraVisaoCompleta } = this.state;

        if (primeiraVisaoCompleta) {
            return (
                <section>
                    <Button
                        texto="Voltar"
                        onClick={ e => {

                            e.preventDefault();
                            let { usuario } = this.state;
                            usuario.avatar = Avatar.obterTodos[0];
                            this.setState({
                                usuario,
                                primeiraVisaoCompleta: false
                            });

                        }}
                    />
                    <Button 
                        principal
                        texto="Salvar"
                        onClick={ e => {
                            e.preventDefault();
                            this.props.onSubmit(this.state.usuario)
                        }}
                    />
                </section>
            )
        } else {
            return (
                <section>
                    <Button
                        principal
                        texto="Próximo"
                        onClick={ this.validar }
                    />
                </section>
            )
        }

    }

    render() {

        return (
            <div className="center">

                <form className="pure-form pure-form-stacked">

                    { this.renderizarNome() }
                    { this.renderizarGenero() }
                    { this.renderizarBotoes() }
                    
                </form>

            </div>
        )

    }

}

export default NovoUsuario