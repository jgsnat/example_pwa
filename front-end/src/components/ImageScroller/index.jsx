import React from 'react'
import Image from '../Image'
import ButtonImage from '../ButtonImage'
import ManipularEvento from './ManipularEvento'

class ImageScroller extends React.Component {

    constructor(props) {
        
        super(props)

        this.state = {
            manipularEvento: new ManipularEvento(
                this.props.elementos.length,
                this.props.selecionado.index
            )
        }

        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
    }

    obterSelecionado() {
        return this.props.elementos[
            this.state.manipularEvento.index
        ]
    }

    renderizarImagem(entry, index) {

        let eixoY = this.props.eixoY ? this.props.eixoY : 0;

        return (
            <li style={{
                paddingTop: '8px',
                position: 'absolute',
                zIndex: '-1',
                marginLeft: `${index * 140}px`
            }} key={index + entry.toString()}>
                <Image 
                    eixoX={ entry.index }
                    eixoY={ eixoY }
                    width={ 140 }
                    height={ 140 }
                    backgroundHeight={ 280 }
                    arquivo={ this.props.arquivo }
                />
            </li>
        )

    }

    renderizarImagens() {

        const ms = this.state.manipularEvento.toqueEmExecucao ?
            '100ms' : '800ms'

        const estilo = {

            WebkitTransitionDuration: ms, /* Safari e Chrome */
            MsTransitionDuration: ms, /* IE */
            MozTransitionDuration: ms, /* Firefox */
            OTransitionDuration: ms, /* Opera */
            transitionDuration: ms, /* Nativa do W3C */

            listStyleType: 'none',
            margin: '0',
            padding: '0',
            position: 'relative',
            width: `${ this.props.elementos.length * 140 }px`,
            left: `${ this.state.manipularEvento.left }px`

        }

        const list = this.props.elementos.map(
            (entry, index) => this.renderizarImagem(entry, index)
        )

        return (
            <ul style={ estilo }>
                { lista }
            </ul>
        )

    }

    renderizarSelecionado() {
        return (
            <span
                style={{
                    float: 'left',
                    width: '140px',
                    height: '160px',
                    marginLeft: '42px',
                    backgroundColor: '#00C853',
                    position: 'relative',
                    zIndex: -2
                }}
            ></span>
        )
    }

    renderizarButtonImage(posicao) {
        return (
            <ButtonImage
                posicao= { posicao }

                onTouchStart={ e => e.stopPropagation() }
                onTouchMove={ e => e.stopPropagation() }
                onTouchEnd={ e => e.stopPropagation() }

                onClick={ e => {
                    
                    e.preventDefault();
                    let manipularEvento = this.state.manipularEvento;
                    let index = manipularEvento.index;

                    if (posicao == 'esquerda')
                        index += -1;
                    else
                        index += 1;

                    manipularEvento.definirIndex(index);
                    manipularEvento.atualizarClique();

                    this.setState({ manipularEvento }, () => {
                        this.props.onChange(this.obterSelecionado());
                    });

                }}
            />
        )
    }

    renderizarImageScroller() {

        const estilo = {
            boxSizing: 'border-box',
            borderWidth: '1px',
            borderBottomWidth: '0',
            borderStyle: 'solid',
            borderColor: '#CCC',
            borderRadius: '5px',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
            width: '310px',
            height: '160px',
            overflow: 'hidden'
        };

        return (
            <div
                style= { estilo }
                onTouchStart={ this.onTouchStart }
                onTouchMove={ this.onTouchMove }
                onTouchEnd={ this.onTouchEnd }
            >
                { this.renderizarButtonImage('esquerda') }
                { this.renderizarSelecionado() }
                { this.renderizarImagens() }
                { this.renderizarButtonImage('direita') }
            </div>
        )

    }

    onTouchStart(e) {

        let { clientX } = e.targetTouches[0];
        let { manipularEvento } = this.state;
        manipularEvento.iniciar(clientX);
        this.setState({
            manipularEvento
        })

    }

    onTouchMove(e) {

        let { clientX } = e.targetTouches[0];
        let { manipularEvento } = this.state;
        manipularEvento.mover(clientX);
        this.setState({
            manipularEvento
        })

    }

    onTouchEnd(e) {
        
        let { manipularEvento } = this.state;
        manipularEvento.atualizarToque();
        this.setState({ manipularEvento }, () => {
            this.props.onChange(this.obterSelecionado());
        });

    }

    renderizarLabel() {

        const estilo = {
            boxSizing: 'border-box',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderTopWidth: '0',
            borderColor: '#CCC',
            borderRadius: '5px',
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            backgroundColor: '#CCC',
            color: '#444',
            fontSize: '20px',
            textAlign: 'center',
            padding: '5px',
            width: '380px'
        };

        return (
            <div style={ estilo }>
                { this.obterSelecionado().toString() }
            </div>
        )

    }

    render() {
        return (
            <div>
                { this.renderizarImageScroller() }
                { this.renderizarLabel() }
            </div>
        )
    }
}

export default ImageScroller;