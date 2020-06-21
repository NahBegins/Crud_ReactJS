import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
  user: { name: '', email: ''},
  list: []
}

export default class UserCrud extends Component{
  //estado iniciando
  state = {...initialState}

  //quando o componente for exibido em tela
  componentWillMount(){
    axios(baseUrl).then(resp => {
      //recebo a resposta da requisição e salvo na lista
      this.setState({list:resp.data})
    })
  }

  clear(){
    //cancelar cadastro de user
    this.setState({user: initialState.user})
  }

  save(){
    //salvar/alterar cadastro de user
    const user = this.state.user
    // put (alterar) passo o ID do user, post (incluir)
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

    axios[method](url, user).then(resp => {
        //faço a requisição de um user no backend - json server
        //ocorre o retorno pelo json (db.sever) do objeto(dados) 
        const list = this.getUpdatedList(resp.data)
        //atualizando o estado e a lista
        this.setState({user: initialState.user, list})
    })
  }

  getUpdatedList(user, add = true){
    //uso FILTER para gerar uma nova lista
    //removo o user (da lista) com ID diferente do que estou recebendo aqui nesta função
    const list = this.state.list.filter(u => u.id !== user.id)
    //adiciono o user (removido acima) na 1ª posição do array
    if(add) list.unshift(user)
    //retornando a lista atualizada
    return list
  }

  updateField(event){
    //atualizar campos (name,email)
    //criando uma cópia do objeto, para alterar conteudo do user
    const user = {...this.state.user}
    user[event.target.name] = event.target.value
    this.setState({user})
  }

  renderForm(){
    return(
      <div className="form">
        <div className="row">

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                value={this.state.user.name }
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail</label>
              <input type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={e => this.updateField(e)}
                placeholder="Informe o e-mail..."
              />
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              salvar
            </button>

            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
              cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  load(user){
    this.setState({user})
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.getUpdatedList(user, false)
      this.setState({ list })
    })
  }

  renderTable(){
    return(
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows(){
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn-warning"
              onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>

            <button className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  render(){

    return(
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}