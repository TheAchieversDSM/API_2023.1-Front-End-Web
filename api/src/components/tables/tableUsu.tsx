import Table from 'react-bootstrap/Table';
import "../../styles/table.css"
import Button from 'react-bootstrap/Button';
import { BsTrash3, BsEye, BsPencil, BsSearch } from 'react-icons/bs'
import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from '../modal';
import axios from 'axios';
import Search from '../search';
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

let modelo = [
    {
        'id': '',
        'nome': '',
        'email': ''
    }
]

export default function TableUsu() {
    const [users, setUsers] = useState(modelo)
    const [modalShow, setModalShow] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        function render(){
            axios.get("http://localhost:5000/user/pegarUsuarios").then((res)=>{
                setUsers(res.data)
            })
        }
        render()
    }, [])

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    function renderTableRows() {
        return users
          .filter((user) => {
            if (!searchTerm) {
              return true;
            }
    
            if (
              user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
    
            return false;
          })
          .map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>
                <Button className="bt bt-view">
                  <BsEye className="icon" onClick={() => setModalShow(true)} />
                </Button>
                <Button className="bt bt-edit">
                  <BsPencil className="icon" />
                </Button>
                <Button className="bt bt-delete">
                  <BsTrash3 className="icon" />
                </Button>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  titulo={user.nome}
                  coluna1="ID: "
                  resp1={user.id}
                  coluna2="Email: "
                  resp2={user.email}
                />
              </td>
            </tr>
          ));
      }


  return (
    <>
    <Search change={handleSearch} link="/criar-usuarios"/>
    <div className="box-list">
          <Table className="table" size="sm">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                {renderTableRows()}
              </tbody>
          </Table>
      </div></>
  )
}