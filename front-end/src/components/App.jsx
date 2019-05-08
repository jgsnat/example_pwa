import React from 'react'
import Header from './Header'
import NovoUsuario from './NovoUsuario'
import Toast from './Toast'

class App extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <NovoUsuario
                    erro={ msg => this.refs.toast.erro(msg) }
                    onSubmit={ usuario => {
                        
                        let genero = usuario.genero == 'm' ? 'o' : 'a'

                        this.refs.toast.sucesso(
                            `Seja bem-vind${genero} ${usuario.nome}`
                        )

                    }}
                />
                <Toast ref="toast" />
            </div>
        )

    }

}

export default App