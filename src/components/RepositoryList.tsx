import {useState, useEffect} from 'react';
import { RepositoryItem } from "./RepositoryItem"

import '../styles/repositories.scss';

interface Repository {
    name: string,
    description: string,
    html_url: string
}

export function RepositoryList() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    
    /**
     * useEffect tem dois parâmetros:
     * 1 - função que será executada quando acontecer uma mudança
     * 2 - quando será executada a função (dependência). Pode ser uma variável, 
     *      então a função será executada a cada mudança dessa variável
     * Nota: se o parâmetro de dependência estiver vazio, então a função executará apenas UMA vez na renderização do componente
    */
    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
    }, [])

    return (
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>

            <ul>
                {repositories.map(repository => {
                    return <RepositoryItem key={repository.name} repository={repository}/>
                })}                
            </ul>
        </section>
    )
}