import React, { useState } from 'react'
import '../styles/search.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { InputGroup, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { parseCookies } from "nookies";
import { AuthContext } from "../hooks/useAuth";

export default function Search(props: any){
    const cookies = parseCookies();

    return(
        <div className="box-search ">
            <InputGroup className="mb-1">
                <Form.Control className="input-search"
                    placeholder="Search..."
                    aria-describedby="basic-addon2"
                    onChange={props.change}
                />
                <InputGroup.Text id="basic-addon2" className="lupa"><BsSearch className="icon"/></InputGroup.Text>
            </InputGroup>

            {cookies["tecsus.token"] ? (
            <Button variant="primary" className="button-new" size="lg" ><Link to={props.link}><p>+ Novo</p></Link></Button>
            ) : null}

        </div>
    )
}