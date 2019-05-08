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
}

export default ImageScroller;