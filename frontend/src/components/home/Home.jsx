import React from 'react'
import Main from '../template/Main'
import './Home.css'

export default props => 
  <Main icon="home" title="Início" subtitle="Um simples projeto de CRUD">
    <div className="display-4">
      <h3>Bem Vindo - Brooklyn Nine-Nine!</h3>
    </div>
    <hr/>
    <p className="mb-0">Sistema de cadastro desenvolvido com a tec React JS.</p>
  </Main>