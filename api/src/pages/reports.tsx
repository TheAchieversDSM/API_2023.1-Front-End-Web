import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Search from '../components/search';
import TableAlert from '../components/tables/tableAlert';
import TableReport from '../components/tables/tableReports';
import axios from 'axios';
import { useParams } from 'react-router-dom';

let modelo = {
        'estacao_id': '',
        'nome':''
}


export default function Reports() {
    const [estacao, setEstacao] = useState(modelo)
    const { id } = useParams();

    useEffect(() =>{
        function render(){
            axios.get(`http://localhost:5000/estacao/pegarEstacoesPorId/${id}`).then((res) =>{
                setEstacao(res.data)
            })
        }
        render()
    },[])

    return (
        <>
            <Sidebar />
            <h1 className="TitImp">Reports da {estacao.nome} ({estacao.estacao_id})</h1>
            <TableReport/>
        </>
    )
}